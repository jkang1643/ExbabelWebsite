/**
 * Perceptual Image Fingerprinting Engine
 * 
 * Implements real computer vision algorithms to convert an image's
 * physical visual properties into a fixed-length seed descriptor.
 * 
 * Pipeline:
 *   1. Canvas downsampling to 32×32 grayscale grid
 *   2. Discrete Cosine Transform (DCT-II) — the same frequency decomposition
 *      used in JPEG compression — extracts spatial frequency coefficients
 *   3. Hu Invariant Moments — 7 shape descriptors invariant to translation,
 *      scale, and rotation (derived from image central moments treating
 *      pixel intensities as a 2D mass distribution)
 *   4. Dominant color extraction in HSL perceptual color space
 *   5. All physical measurements are encoded into a 64-character
 *      hexadecimal fingerprint that uniquely represents the image's
 *      visual essence
 */

const SAMPLE_SIZE = 32;

// ─── DCT-II (Discrete Cosine Transform, Type II) ─────────────────────
// This is the exact mathematical transform used in JPEG, MPEG, and
// every modern image/video codec. It decomposes a spatial signal into
// a sum of cosine functions at different frequencies.
// Reference: Ahmed, Natarajan & Rao (1974), "Discrete Cosine Transform"

function dct2d(matrix: number[][]): number[][] {
  const N = matrix.length;
  const result: number[][] = Array.from({ length: N }, () => new Array(N).fill(0));

  for (let u = 0; u < N; u++) {
    for (let v = 0; v < N; v++) {
      let sum = 0;
      for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
          sum += matrix[x][y] *
            Math.cos(((2 * x + 1) * u * Math.PI) / (2 * N)) *
            Math.cos(((2 * y + 1) * v * Math.PI) / (2 * N));
        }
      }
      const alphaU = u === 0 ? 1 / Math.sqrt(N) : Math.sqrt(2 / N);
      const alphaV = v === 0 ? 1 / Math.sqrt(N) : Math.sqrt(2 / N);
      result[u][v] = alphaU * alphaV * sum;
    }
  }
  return result;
}

// ─── Hu Invariant Moments ─────────────────────────────────────────────
// 7 shape descriptors derived from image central moments.
// Invariant to translation, scale, and rotation.
// Reference: Ming-Kuei Hu (1962), "Visual Pattern Recognition by Moment Invariants"

function computeRawMoment(pixels: number[][], p: number, q: number, N: number): number {
  let m = 0;
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      m += Math.pow(x, p) * Math.pow(y, q) * pixels[x][y];
    }
  }
  return m;
}

function computeCentralMoment(
  pixels: number[][], p: number, q: number,
  cx: number, cy: number, N: number
): number {
  let mu = 0;
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      mu += Math.pow(x - cx, p) * Math.pow(y - cy, q) * pixels[x][y];
    }
  }
  return mu;
}

function huMoments(pixels: number[][]): number[] {
  const N = pixels.length;
  const m00 = computeRawMoment(pixels, 0, 0, N);
  if (m00 === 0) return [0, 0, 0, 0, 0, 0, 0];

  const cx = computeRawMoment(pixels, 1, 0, N) / m00;
  const cy = computeRawMoment(pixels, 0, 1, N) / m00;

  // Normalized central moments η_pq = μ_pq / m00^((p+q)/2 + 1)
  const eta = (p: number, q: number) => {
    const mu = computeCentralMoment(pixels, p, q, cx, cy, N);
    const gamma = (p + q) / 2 + 1;
    return mu / Math.pow(m00, gamma);
  };

  const n20 = eta(2, 0), n02 = eta(0, 2), n11 = eta(1, 1);
  const n30 = eta(3, 0), n03 = eta(0, 3), n21 = eta(2, 1), n12 = eta(1, 2);

  // The 7 Hu Invariant Moments
  const h1 = n20 + n02;
  const h2 = (n20 - n02) ** 2 + 4 * n11 ** 2;
  const h3 = (n30 - 3 * n12) ** 2 + (3 * n21 - n03) ** 2;
  const h4 = (n30 + n12) ** 2 + (n21 + n03) ** 2;
  const h5 = (n30 - 3 * n12) * (n30 + n12) * ((n30 + n12) ** 2 - 3 * (n21 + n03) ** 2) +
    (3 * n21 - n03) * (n21 + n03) * (3 * (n30 + n12) ** 2 - (n21 + n03) ** 2);
  const h6 = (n20 - n02) * ((n30 + n12) ** 2 - (n21 + n03) ** 2) +
    4 * n11 * (n30 + n12) * (n21 + n03);
  const h7 = (3 * n21 - n03) * (n30 + n12) * ((n30 + n12) ** 2 - 3 * (n21 + n03) ** 2) -
    (n30 - 3 * n12) * (n21 + n03) * (3 * (n30 + n12) ** 2 - (n21 + n03) ** 2);

  return [h1, h2, h3, h4, h5, h6, h7];
}

// ─── Dominant Color Extraction (HSL Perceptual Space) ─────────────────
function extractDominantHSL(imageData: ImageData): { h: number; s: number; l: number } {
  const d = imageData.data;
  let totalH = 0, totalS = 0, totalL = 0;
  const pixelCount = d.length / 4;

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;

    if (max !== min) {
      const delta = max - min;
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
      if (max === r) h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / delta + 2) / 6;
      else h = ((r - g) / delta + 4) / 6;
    }
    totalH += h;
    totalS += s;
    totalL += l;
  }

  return {
    h: totalH / pixelCount,
    s: totalS / pixelCount,
    l: totalL / pixelCount,
  };
}

// ─── Master Fingerprint Function ──────────────────────────────────────
export async function computeImageFingerprint(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = SAMPLE_SIZE;
      canvas.height = SAMPLE_SIZE;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
      const imageData = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

      // ── Step 1: Build grayscale matrix (luminance) ──
      const gray: number[][] = [];
      for (let x = 0; x < SAMPLE_SIZE; x++) {
        gray[x] = [];
        for (let y = 0; y < SAMPLE_SIZE; y++) {
          const idx = (x * SAMPLE_SIZE + y) * 4;
          // ITU-R BT.601 luminance weighting
          gray[x][y] = 0.299 * imageData.data[idx] +
            0.587 * imageData.data[idx + 1] +
            0.114 * imageData.data[idx + 2];
        }
      }

      // ── Step 2: DCT-II frequency decomposition ──
      const dctMatrix = dct2d(gray);

      // Extract top-left 8×8 low-frequency coefficients (skip DC at [0][0])
      // These encode the fundamental spatial structure of the image
      const dctCoeffs: number[] = [];
      for (let u = 0; u < 8; u++) {
        for (let v = 0; v < 8; v++) {
          if (u === 0 && v === 0) continue; // skip DC component (mean brightness)
          dctCoeffs.push(dctMatrix[u][v]);
        }
      }

      // Binarize: compare each coefficient to the median
      const sorted = [...dctCoeffs].sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      const pHashBits = dctCoeffs.map(c => (c > median ? 1 : 0));

      // ── Step 3: Hu Moments (shape physics) ──
      const hu = huMoments(gray);
      // Log-transform Hu moments (they span many orders of magnitude)
      const huBits = hu.map(h => {
        const sign = h >= 0 ? 1 : 0;
        const logVal = h === 0 ? 0 : Math.abs(Math.log10(Math.abs(h)));
        // Quantize to 4 bits (0-15)
        return Math.min(15, Math.floor(logVal * 2));
      });

      // ── Step 4: Dominant color (perceptual) ──
      const hsl = extractDominantHSL(imageData);
      const hueNibble = Math.floor(hsl.h * 15);
      const satNibble = Math.floor(hsl.s * 15);
      const lumNibble = Math.floor(hsl.l * 15);

      // ── Step 5: Assemble 64-character hex fingerprint ──
      // Bits 0-62:  pHash (DCT perceptual structure)       → 16 hex chars
      // Bits 63-90: Hu moments (7 × 4-bit quantized)       → 7 hex chars
      // Bits 91-102: HSL color (3 nibbles)                  → 3 hex chars
      // Remaining: edge density + contrast                  → pad to 64

      let fingerprint = "";

      // pHash → pack 63 bits into hex (4 bits per char = 16 chars)
      for (let i = 0; i < 63; i += 4) {
        let nibble = 0;
        for (let b = 0; b < 4 && (i + b) < 63; b++) {
          nibble |= (pHashBits[i + b] << (3 - b));
        }
        fingerprint += nibble.toString(16);
      }

      // Hu moments → 7 hex chars
      for (const hb of huBits) {
        fingerprint += hb.toString(16);
      }

      // HSL → 3 hex chars
      fingerprint += hueNibble.toString(16);
      fingerprint += satNibble.toString(16);
      fingerprint += lumNibble.toString(16);

      // Edge density: ratio of high-gradient pixels
      let edgeCount = 0;
      for (let x = 1; x < SAMPLE_SIZE - 1; x++) {
        for (let y = 1; y < SAMPLE_SIZE - 1; y++) {
          const gx = gray[x + 1][y] - gray[x - 1][y];
          const gy = gray[x][y + 1] - gray[x][y - 1];
          if (Math.sqrt(gx * gx + gy * gy) > 30) edgeCount++;
        }
      }
      const edgeDensity = Math.min(255, Math.floor((edgeCount / (SAMPLE_SIZE * SAMPLE_SIZE)) * 255));
      fingerprint += edgeDensity.toString(16).padStart(2, "0");

      // Contrast: standard deviation of luminance
      let mean = 0;
      for (let x = 0; x < SAMPLE_SIZE; x++)
        for (let y = 0; y < SAMPLE_SIZE; y++)
          mean += gray[x][y];
      mean /= (SAMPLE_SIZE * SAMPLE_SIZE);
      let variance = 0;
      for (let x = 0; x < SAMPLE_SIZE; x++)
        for (let y = 0; y < SAMPLE_SIZE; y++)
          variance += (gray[x][y] - mean) ** 2;
      const stddev = Math.sqrt(variance / (SAMPLE_SIZE * SAMPLE_SIZE));
      const contrastNibble = Math.min(255, Math.floor(stddev));
      fingerprint += contrastNibble.toString(16).padStart(2, "0");

      // Pad or trim to exactly 64 characters
      fingerprint = fingerprint.padEnd(64, "0").slice(0, 64);

      resolve(fingerprint.toUpperCase());
    };
    img.src = imageUrl;
  });
}
