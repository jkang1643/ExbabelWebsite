import React, { useMemo, useState, useEffect, useRef } from "react";
import { useImageVectorizer } from "@/hooks/useImageVectorizer";
import { useScroll } from "framer-motion";
import {
  generateCalabiYauSurface,
  calabiYauToSVGPaths,
  type CalabiYauParams,
} from "@/lib/calabiYau";
import {
  generateCoxeterVertices,
  generateCoxeterEdges,
  coxeterToSVGPaths,
  generateRingCircles,
  type CoxeterParams,
} from "@/lib/coxeterProjection";

type GeneratorProps = {
  seed: string;
  imageUrl?: string | null;
  isAnimated?: boolean;
};

// ─── Seed → Physics Parameter Extraction ─────────────────────────────
// Instead of feeding the seed into a PRNG and rolling dice, we decompose
// the seed string into deterministic physical parameters that drive
// the Calabi-Yau and Coxeter mathematical structures.

function seedToSemanticMean(seed: string) {
  // Map characters to the 22 foundational Gematria values
  const gematriaValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400];
  const coefficients: number[] = [];
  let sum1 = 0, sum2 = 0, sum3 = 0, sum4 = 0;

  if (!seed || seed.length === 0) seed = " ";

  for (let i = 0; i < seed.length; i++) {
    const charCode = seed.charCodeAt(i);
    const value = gematriaValues[charCode % 22];
    
    // Normalize coefficients to prevent numeric overflow in polynomial eval
    const normalizedValue = value / 100;
    coefficients.push(normalizedValue);

    if (i % 4 === 0) sum1 += value * (i + 1);
    if (i % 4 === 1) sum2 += value * (i + 1);
    if (i % 4 === 2) sum3 += value * (i + 1);
    if (i % 4 === 3) sum4 += value * (i + 1);
  }

  // Calculate the characteristic polynomial root (Newton-Raphson method)
  // Polynomial: x^k - c_0*x^(k-1) - c_1*x^(k-2) - ... - c_{k-1} = 0
  const k = coefficients.length;
  const f = (x: number) => {
    let result = Math.pow(x, k);
    for (let i = 0; i < k; i++) {
      result -= coefficients[i] * Math.pow(x, k - 1 - i);
    }
    return result;
  };
  const df = (x: number) => {
    let result = k * Math.pow(x, k - 1);
    for (let i = 0; i < k - 1; i++) {
      result -= coefficients[i] * (k - 1 - i) * Math.pow(x, k - 2 - i);
    }
    return result;
  };

  let x = 1.618; // Start initial guess at the Golden Ratio
  for (let iter = 0; iter < 20; iter++) {
    const y = f(x);
    const yprime = df(x);
    if (Math.abs(yprime) < Number.EPSILON) break;
    x = x - y / yprime;
  }

  // Ensure the root is positive and within a visually pleasing bounds [1.1, 2.5]
  let semanticMean = Math.abs(x);
  if (semanticMean < 1.1) semanticMean = 1.1 + (semanticMean % 0.5);
  if (semanticMean > 2.5 || isNaN(semanticMean)) semanticMean = 2.5 - (semanticMean % 1.0 || 0);

  return {
    semanticMean,
    hash: [sum1 || 1779033703, sum2 || 3144134277, sum3 || 1013904242, sum4 || 2773480762]
  };
}

function extractPhysicsParams(seed: string) {
  const { hash, semanticMean } = seedToSemanticMean(seed);

  // Extract deterministic parameters from the hash bits
  const n = 3 + (hash[0] % 6);                          // Calabi-Yau degree: 3–8
  const psi = ((hash[0] >>> 8) % 200) / 100;             // Deformation: 0.0–2.0
  const phi1 = ((hash[1] % 628) / 100);                  // Phase 1: 0–2π
  const phi2 = ((hash[1] >>> 16) % 628) / 100;           // Phase 2: 0–2π
  const symmetryOrder = 4 + (hash[2] % 13) * 2;          // Dihedral N: 4–30 (even)
  const ringCount = 3 + (hash[2] >>> 8) % 6;             // Coxeter rings: 3–8
  const edgeDensity = 0.2 + ((hash[3] % 80) / 100);      // Edge density: 0.2–1.0
  const globalRotation = (hash[0] >>> 16) % 360;          // Global rotation: 0–360°
  const globalScale = 0.8 + ((hash[1] >>> 8) % 40) / 100; // Global scale: 0.8–1.2
  const phaseOffset = ((hash[3] >>> 16) % 628) / 100;     // Ring phase: 0–2π

  return {
    calabiYau: { n, phi1, phi2, resolution: 30, scale: 120 } as CalabiYauParams,
    coxeter: {
      ringCount,
      verticesPerRing: symmetryOrder,
      innerRadius: 180,
      edgeDensity,
      phaseOffset,
      semanticMean,
    } as CoxeterParams,
    symmetryOrder,
    globalRotation,
    globalScale,
  };
}

// ─── Component ───────────────────────────────────────────────────────

export default function EsotericGeneratorImage({ seed, imageUrl, isAnimated = false }: GeneratorProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);

  const { paths: vectorizedPaths, loading } = useImageVectorizer(imageUrl || null);
  const { scrollY } = useScroll();

  // Load central singularity image if provided
  useEffect(() => {
    if (!imageUrl) {
      setImgElement(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => setImgElement(img);
  }, [imageUrl]);

  // --- Physics-Grounded Geometry Compilation ---
  const {
    symmetryOrder,
    globalRotation,
    globalScale,
    calabiYauPaths,
    coxeterPaths,
    ringCircles,
    coxeterVertices,
  } = useMemo(() => {
    const params = extractPhysicsParams(seed);

    // Generate Calabi-Yau manifold surface curves
    const cyRawCurves = generateCalabiYauSurface(params.calabiYau);
    const calabiYauPaths = calabiYauToSVGPaths(cyRawCurves);

    // Generate raw Coxeter lattice vertices and edges
    const vertices = generateCoxeterVertices(params.coxeter);
    const edges = generateCoxeterEdges(vertices, params.coxeter);
    const coxeterPaths = coxeterToSVGPaths(edges, params.coxeter.ringCount);

    // Generate concentric ring circles
    const ringCircles = generateRingCircles(params.coxeter);

    return {
      symmetryOrder: params.symmetryOrder,
      globalRotation: params.globalRotation,
      globalScale: params.globalScale,
      calabiYauPaths,
      coxeterPaths,
      ringCircles,
      coxeterVertices: vertices,
    };
  }, [seed]);

  // --- Offscreen Caching for Static Background layers (Calabi-Yau & Rings) ---
  useEffect(() => {
    if (!isMounted) return;
    
    const canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 2000;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and draw background paths
    ctx.clearRect(0, 0, 2000, 2000);
    ctx.save();
    ctx.translate(1000, 1000);
    ctx.scale(globalScale, globalScale);
    ctx.rotate((globalRotation * Math.PI) / 180);

    // Set gold gradient for background
    const gradient = ctx.createLinearGradient(-1000, -1000, 1000, 1000);
    gradient.addColorStop(0, "#FEF08A");
    gradient.addColorStop(0.5, "#F59E0B");
    gradient.addColorStop(1, "#FEF08A");
    ctx.strokeStyle = gradient;

    // 1. Draw Calabi-Yau manifold curves
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    calabiYauPaths.forEach(curve => {
      ctx.globalAlpha = curve.opacity * 0.6;
      ctx.stroke(new Path2D(curve.d));
    });

    // 2. Draw Golden Ratio framing rings
    ctx.globalAlpha = 0.3;
    ringCircles.forEach(ring => {
      ctx.beginPath();
      ctx.arc(0, 0, ring.r, 0, Math.PI * 2);
      ctx.lineWidth = ring.isDashed ? 1 : 1.5;
      if (ring.isDashed) {
        ctx.setLineDash([4, 8]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.stroke();
    });

    ctx.restore();
    offscreenCanvasRef.current = canvas;
  }, [isMounted, calabiYauPaths, ringCircles, globalScale, globalRotation]);

  // --- Dynamic Render Loop (lerp physics & requestAnimationFrame) ---
  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let currentM = 0; // Smooth scroll damping angle
    let autoRotation = 0; // Dynamic central rotation

    // --- Performance Optimization: Pre-compile and batch Path2D geometries ---
    const layerPaths = [1, 2, 3].map(layerNum => {
      const solid = new Path2D();
      const dashed = new Path2D();
      coxeterPaths
        .filter(p => p.layer === layerNum)
        .forEach(p => {
          if (p.isDashed) dashed.addPath(new Path2D(p.d));
          else solid.addPath(new Path2D(p.d));
        });
      return { solid, dashed };
    });

    const vectorizedPath2Ds = vectorizedPaths.map(p => new Path2D(p.d));

    // Pre-compile Jerusalem Rose petals
    const rosePetalTop = new Path2D("M 0,-120 Q 30,-60 15,-25 A 15,15 0 0,1 -15,-25 Q -30,-60 0,-120 Z");
    const rosePetalBottom = new Path2D("M 0,120 Q -30,60 -15,25 A 15,15 0 0,1 15,25 Q 30,60 0,120 Z");
    const rosePetalRight = new Path2D("M 120,0 Q 60,30 25,15 A 15,15 0 0,1 25,-15 Q 60,-30 120,0 Z");
    const rosePetalLeft = new Path2D("M -120,0 Q -60,-30 -25,-15 A 15,15 0 0,1 -25,15 Q -60,30 -120,0 Z");

    // Segment Coxeter vertices by layer for batched rendering
    const layerNodes = [
      coxeterVertices.filter(v => v.ring < ringCircles.length / 3),
      coxeterVertices.filter(v => v.ring >= ringCircles.length / 3 && v.ring < (ringCircles.length / 3) * 2),
      coxeterVertices.filter(v => v.ring >= (ringCircles.length / 3) * 2),
    ];

    const render = () => {
      // 1. Damped spring inertia scroll interpolation
      const targetM = (scrollY.get() / 800) * Math.PI * 2;
      currentM += (targetM - currentM) * 0.08; // smooth lerp multiplier

      // 2. Clear canvas
      ctx.clearRect(0, 0, 2000, 2000);

      // 3. Render offscreen-cached Calabi-Yau background (Fast GPU texture stamp)
      if (offscreenCanvasRef.current) {
        ctx.drawImage(offscreenCanvasRef.current, 0, 0);
      }

      ctx.save();
      ctx.translate(1000, 1000);
      ctx.scale(globalScale, globalScale);
      ctx.rotate((globalRotation * Math.PI) / 180);

      // Global Gold Gradient for vector strokes
      const gradient = ctx.createLinearGradient(-300, -300, 300, 300);
      gradient.addColorStop(0, "#FEF08A");
      gradient.addColorStop(0.5, "#F59E0B");
      gradient.addColorStop(1, "#FEF08A");
      ctx.strokeStyle = gradient;
      ctx.fillStyle = gradient;

      // 4. Render Central Singularity
      ctx.save();
      if (isAnimated) {
        autoRotation += 0.003;
        ctx.rotate(autoRotation + currentM);
      } else {
        ctx.rotate(currentM);
      }

      if (imageUrl && loading) {
        ctx.font = "24px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("[ DECONSTRUCTING IMAGE... ]", 0, 0);
      } else if (imageUrl && imgElement && vectorizedPath2Ds.length > 0) {
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        vectorizedPath2Ds.forEach(p => ctx.stroke(p));

        // Framing singularity rings
        ctx.beginPath();
        ctx.arc(0, 0, 160, 0, Math.PI * 2);
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 150, 0, Math.PI * 2);
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        // Draw native Jerusalem Rose
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(0, 0, 140, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, 130, 0, Math.PI * 2); ctx.lineWidth = 1.5; ctx.setLineDash([4, 8]); ctx.stroke(); ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.lineWidth = 3; ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill();

        ctx.stroke(rosePetalTop);
        ctx.stroke(rosePetalBottom);
        ctx.stroke(rosePetalRight);
        ctx.stroke(rosePetalLeft);

        ctx.beginPath(); ctx.arc(70, 70, 5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(-70, -70, 5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(70, -70, 5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(-70, 70, 5, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();

      // 5. Render Coxeter Lattice Wedges (Dihedral Kaleidoscope loop)
      const l1y = Math.sin(currentM * 3) * 20;
      const l1r = -currentM * 1.5;
      const l2y = Math.cos(currentM * 2) * 50;
      const l2r = currentM * 0.8;
      const l3s = 1 + Math.sin(currentM) * 0.2;
      const l3r = -currentM * 0.3;

      ctx.save();
      if (isAnimated) {
        ctx.rotate(-autoRotation * 0.5);
      }

      // Draw batched geometries inside a single layer context
      const drawLayer = (layerNum: 1 | 2 | 3) => {
        const paths = layerPaths[layerNum - 1];
        const nodes = layerNodes[layerNum - 1];
        const strokeW = layerNum === 1 ? 1.5 : 2;
        const opacity = layerNum === 3 ? 0.5 : 0.8;
        const nodeRadius = layerNum === 1 ? 3 : 2;

        ctx.globalAlpha = opacity;

        // Draw solid connections
        ctx.lineWidth = strokeW;
        ctx.setLineDash([]);
        ctx.stroke(paths.solid);

        // Draw dashed cross-ring connections
        ctx.setLineDash([6, 12]);
        ctx.stroke(paths.dashed);
        ctx.setLineDash([]);

        // Batch render circular vertex nodes
        ctx.beginPath();
        nodes.forEach(v => {
          ctx.moveTo(v.x + nodeRadius, v.y);
          ctx.arc(v.x, v.y, nodeRadius, 0, Math.PI * 2);
        });
        ctx.fill();
      };

      const segmentsCount = symmetryOrder;
      for (let s = 0; s < segmentsCount; s++) {
        const segmentAngle = (s * 360) / segmentsCount;
        const rad = (segmentAngle * Math.PI) / 180;

        // A. Wedge Normal
        ctx.save();
        ctx.rotate(rad);
        
        ctx.save(); ctx.translate(0, l1y); ctx.rotate(l1r); drawLayer(1); ctx.restore();
        ctx.save(); ctx.translate(0, l2y); ctx.rotate(l2r); drawLayer(2); ctx.restore();
        ctx.save(); ctx.scale(l3s, l3s); ctx.rotate(l3r); drawLayer(3); ctx.restore();

        ctx.restore();

        // B. Wedge Mirrored (Dihedral reflection)
        ctx.save();
        ctx.rotate(rad);
        ctx.scale(1, -1);
        
        ctx.save(); ctx.translate(0, l1y); ctx.rotate(l1r); drawLayer(1); ctx.restore();
        ctx.save(); ctx.translate(0, l2y); ctx.rotate(l2r); drawLayer(2); ctx.restore();
        ctx.save(); ctx.scale(l3s, l3s); ctx.rotate(l3r); drawLayer(3); ctx.restore();

        ctx.restore();
      }

      ctx.restore(); // End Coxeter
      ctx.restore(); // End global coordinates

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isMounted, coxeterPaths, coxeterVertices, ringCircles, globalScale, globalRotation, isAnimated, imageUrl, loading, imgElement, vectorizedPaths, scrollY]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center opacity-90 mix-blend-screen pointer-events-none relative">
      {isMounted && (
        <>
          <canvas
            ref={canvasRef}
            width={2000}
            height={2000}
            className="w-full h-full max-w-[2000px] aspect-square object-cover"
          />
          <div className="absolute bottom-6 right-6 font-mono text-[10px] text-yellow-300/30 tracking-[0.2em] select-none pointer-events-auto">
            [ PROJECT 212 // ROOM 212 ]
          </div>
        </>
      )}
    </div>
  );
}
