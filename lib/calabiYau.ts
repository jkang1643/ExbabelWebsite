/**
 * Calabi-Yau Parametric Surface Generator
 * 
 * Implements the parametric equations for visualizing Calabi-Yau manifolds
 * as 2D projections of complex algebraic surfaces.
 * 
 * The Fermat surface z1^n + z2^n = 1 is parameterized as:
 *   z1 = e^(iφ1) * [cos(α + iβ)]^(2/n)
 *   z2 = e^(iφ2) * [sin(α + iβ)]^(2/n)
 * 
 * The real and imaginary parts of z1 and z2 are then projected into
 * 2D SVG coordinates to produce the organic, petal-like curves
 * characteristic of higher-dimensional geometry.
 * 
 * Reference: 
 *   Hanson, A. J. (1994). "A Construction for Computer Visualization 
 *   of Certain Complex Curves." Notices of the AMS, 41(9), 1156–1163.
 */

// ─── Complex Number Arithmetic (Zero Dependencies) ───────────────────

type Complex = { re: number; im: number };

function cxAdd(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}

function cxMul(a: Complex, b: Complex): Complex {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
}

function cxExp(z: Complex): Complex {
  // e^(a+bi) = e^a * (cos(b) + i*sin(b))
  const ea = Math.exp(z.re);
  return { re: ea * Math.cos(z.im), im: ea * Math.sin(z.im) };
}

function cxLog(z: Complex): Complex {
  // log(z) = log|z| + i*arg(z)
  const r = Math.sqrt(z.re * z.re + z.im * z.im);
  const theta = Math.atan2(z.im, z.re);
  return { re: Math.log(r + 1e-20), im: theta };
}

function cxPow(z: Complex, w: Complex): Complex {
  // z^w = e^(w * log(z))
  if (z.re === 0 && z.im === 0) return { re: 0, im: 0 };
  return cxExp(cxMul(w, cxLog(z)));
}

function cxCos(z: Complex): Complex {
  // cos(a+bi) = cos(a)*cosh(b) - i*sin(a)*sinh(b)
  return {
    re: Math.cos(z.re) * Math.cosh(z.im),
    im: -Math.sin(z.re) * Math.sinh(z.im),
  };
}

function cxSin(z: Complex): Complex {
  // sin(a+bi) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
  return {
    re: Math.sin(z.re) * Math.cosh(z.im),
    im: Math.cos(z.re) * Math.sinh(z.im),
  };
}

// ─── Surface Point ───────────────────────────────────────────────────

export type CalabiYauPoint = {
  x: number;   // Re(z1) — mapped to SVG x
  y: number;   // Im(z1) — mapped to SVG y
  z: number;   // Re(z2) — mapped to stroke-opacity or radius
};

// ─── Parametric Surface Generator ────────────────────────────────────

export type CalabiYauParams = {
  n: number;        // Polynomial degree (3–8). Higher = sharper geometry
  phi1: number;     // Phase rotation for z1 (0 to 2π)
  phi2: number;     // Phase rotation for z2 (0 to 2π)
  resolution: number; // Grid density (e.g., 40 = 40×40 sample grid)
  scale: number;    // Output coordinate scaling
};

/**
 * Generate a grid of points on the Calabi-Yau surface z1^n + z2^n = 1.
 * 
 * We parameterize the surface using angles (α, β) where:
 *   α ∈ [0, π/2]  — "latitude" on the complex sphere
 *   β ∈ [-1, 1]   — "depth" into the imaginary axis
 * 
 * For each (α, β):
 *   z1 = e^(iφ1) * [cos(α + iβ)]^(2/n)
 *   z2 = e^(iφ2) * [sin(α + iβ)]^(2/n)
 */
export function generateCalabiYauSurface(params: CalabiYauParams): CalabiYauPoint[][] {
  const { n, phi1, phi2, resolution, scale } = params;
  const exponent: Complex = { re: 2 / n, im: 0 };
  const phase1: Complex = cxExp({ re: 0, im: phi1 });
  const phase2: Complex = cxExp({ re: 0, im: phi2 });

  const curves: CalabiYauPoint[][] = [];

  // Generate curves along constant-α slices (meridians)
  const alphaSteps = Math.floor(resolution / 2);
  const betaSteps = resolution;

  for (let ai = 0; ai <= alphaSteps; ai++) {
    const alpha = (ai / alphaSteps) * (Math.PI / 2);
    const curve: CalabiYauPoint[] = [];

    for (let bi = 0; bi <= betaSteps; bi++) {
      const beta = -1 + (bi / betaSteps) * 2; // β ∈ [-1, 1]

      const complexAngle: Complex = { re: alpha, im: beta };

      // z1 = e^(iφ1) * cos(α + iβ)^(2/n)
      const cosZ = cxCos(complexAngle);
      const z1Base = cxPow(cosZ, exponent);
      const z1 = cxMul(phase1, z1Base);

      // z2 = e^(iφ2) * sin(α + iβ)^(2/n)
      const sinZ = cxSin(complexAngle);
      const z2Base = cxPow(sinZ, exponent);
      const z2 = cxMul(phase2, z2Base);

      // Reject NaN/Infinity from branch cuts
      if (!isFinite(z1.re) || !isFinite(z1.im) || !isFinite(z2.re)) continue;

      curve.push({
        x: z1.re * scale,
        y: z1.im * scale,
        z: z2.re,  // used for opacity/depth
      });
    }

    if (curve.length > 1) {
      curves.push(curve);
    }
  }

  // Generate curves along constant-β slices (parallels)
  for (let bi = 0; bi <= betaSteps; bi++) {
    const beta = -1 + (bi / betaSteps) * 2;
    const curve: CalabiYauPoint[] = [];

    for (let ai = 0; ai <= alphaSteps; ai++) {
      const alpha = (ai / alphaSteps) * (Math.PI / 2);
      const complexAngle: Complex = { re: alpha, im: beta };

      const cosZ = cxCos(complexAngle);
      const z1Base = cxPow(cosZ, exponent);
      const z1 = cxMul(phase1, z1Base);

      const sinZ = cxSin(complexAngle);
      const z2Base = cxPow(sinZ, exponent);
      const z2 = cxMul(phase2, z2Base);

      if (!isFinite(z1.re) || !isFinite(z1.im) || !isFinite(z2.re)) continue;

      curve.push({
        x: z1.re * scale,
        y: z1.im * scale,
        z: z2.re,
      });
    }

    if (curve.length > 1) {
      curves.push(curve);
    }
  }

  return curves;
}

/**
 * Convert Calabi-Yau curves into SVG path data strings.
 * Each curve becomes one continuous <path d="..."> element.
 */
export function calabiYauToSVGPaths(
  curves: CalabiYauPoint[][],
  opacityFromZ: boolean = true
): { d: string; opacity: number }[] {
  return curves.map(curve => {
    const segments = curve.map((pt, i) => {
      const cmd = i === 0 ? "M" : "L";
      return `${cmd} ${pt.x.toFixed(2)},${pt.y.toFixed(2)}`;
    });

    // Average z-depth determines opacity
    const avgZ = curve.reduce((sum, pt) => sum + pt.z, 0) / curve.length;
    const opacity = opacityFromZ
      ? Math.max(0.15, Math.min(0.95, 0.5 + avgZ * 0.5))
      : 0.7;

    return {
      d: segments.join(" "),
      opacity,
    };
  });
}
