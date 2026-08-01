/**
 * Coxeter Plane Projection & Golden-Ratio Ring Geometry
 * 
 * Implements E8-inspired vertex placement and edge routing using:
 * 1. Concentric rings scaled by the Golden Ratio (φ = 1.618...)
 * 2. Evenly-spaced vertices per ring (Coxeter symmetry)
 * 3. Nearest-neighbor edge connections across rings
 * 
 * In the E8 root system, 240 vertices project onto 8 concentric rings
 * of 30 vertices each when viewed down the Coxeter plane. We generalize
 * this structure to allow variable ring counts and vertex densities,
 * parameterized by the seed.
 * 
 * Reference:
 *   Coxeter, H. S. M. (1973). "Regular Polytopes." Dover Publications.
 *   Lisi, A. G. (2007). "An Exceptionally Simple Theory of Everything." arXiv:0711.0770
 */



// ─── Types ───────────────────────────────────────────────────────────

export type CoxeterVertex = {
  x: number;
  y: number;
  ring: number;    // which concentric ring (0 = innermost)
  index: number;   // position within the ring
};

export type CoxeterEdge = {
  x1: number; y1: number;
  x2: number; y2: number;
  crossRing: boolean; // true if edge connects different rings
};

export type CoxeterParams = {
  ringCount: number;       // Number of concentric rings (3–8)
  verticesPerRing: number; // Vertices per ring (driven by symmetry order N)
  innerRadius: number;     // Radius of the innermost ring (SVG units)
  edgeDensity: number;     // 0.0–1.0: fraction of possible edges to draw
  phaseOffset: number;     // Global angular offset (radians)
  semanticMean: number;    // The characteristic polynomial root of the seed
};

// ─── Vertex Generator ────────────────────────────────────────────────

/**
 * Generate vertices arranged on concentric rings.
 * 
 * Ring k has radius: r_k = innerRadius * φ^(k * goldenScale)
 * 
 * Each ring has `verticesPerRing` points evenly spaced at
 * angular intervals of 2π/verticesPerRing, with alternating
 * rings offset by half an angular step (like the E8 projection).
 */
export function generateCoxeterVertices(params: CoxeterParams): CoxeterVertex[] {
  const { ringCount, verticesPerRing, innerRadius, phaseOffset, semanticMean } = params;
  const vertices: CoxeterVertex[] = [];

  for (let r = 0; r < ringCount; r++) {
    // The Semantic Mean: Exponential continuous progression similar to the Golden Ratio, 
    // but mathematically derived from the specific Gematria of the seed.
    const radius = innerRadius * Math.pow(semanticMean, r * 0.7);
    
    // Alternating rings are offset by half an angular step
    // This creates the interlocking pattern seen in E8 projections
    const angularOffset = (r % 2 === 0) ? 0 : (Math.PI / verticesPerRing);

    for (let i = 0; i < verticesPerRing; i++) {
      const angle = phaseOffset + angularOffset + (i / verticesPerRing) * Math.PI * 2;
      vertices.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        ring: r,
        index: i,
      });
    }
  }

  return vertices;
}

// ─── Edge Generator ──────────────────────────────────────────────────

/**
 * Connect vertices using nearest-neighbor logic across rings.
 * 
 * For each vertex on ring k, we connect it to:
 * 1. Its immediate neighbors on the same ring (intra-ring edges)
 * 2. The closest vertex(es) on ring k+1 (cross-ring edges)
 * 
 * Edge density controls what fraction of possible edges are drawn.
 * At density=1.0, all connections are drawn (similar to E8's 6,720 edges).
 * At density=0.3, only ~30% are drawn (sparser, more elegant).
 */
export function generateCoxeterEdges(
  vertices: CoxeterVertex[],
  params: CoxeterParams
): CoxeterEdge[] {
  const { ringCount, verticesPerRing, edgeDensity } = params;
  const edges: CoxeterEdge[] = [];

  // Helper: get vertex by ring and index
  const getVertex = (ring: number, index: number): CoxeterVertex | undefined => {
    const normalizedIndex = ((index % verticesPerRing) + verticesPerRing) % verticesPerRing;
    return vertices.find(v => v.ring === ring && v.index === normalizedIndex);
  };

  // Deterministic edge selection based on position (not random!)
  // We use modular arithmetic so the pattern is seed-independent
  // but the density parameter controls sparsity
  const shouldDraw = (ring: number, index: number, edgeType: number): boolean => {
    const hash = (ring * 31 + index * 17 + edgeType * 7) % 100;
    return hash < edgeDensity * 100;
  };

  for (let r = 0; r < ringCount; r++) {
    for (let i = 0; i < verticesPerRing; i++) {
      const v = getVertex(r, i);
      if (!v) continue;

      // Intra-ring: connect to next neighbor on same ring
      if (shouldDraw(r, i, 0)) {
        const neighbor = getVertex(r, i + 1);
        if (neighbor) {
          edges.push({
            x1: v.x, y1: v.y,
            x2: neighbor.x, y2: neighbor.y,
            crossRing: false,
          });
        }
      }

      // Cross-ring: connect to nearest vertex on the next ring
      if (r < ringCount - 1) {
        const nextRingVertices = vertices.filter(nv => nv.ring === r + 1);
        if (nextRingVertices.length > 0) {
          // Find the closest vertex on the next ring
          let closest = nextRingVertices[0];
          let closestDist = Infinity;
          for (const nv of nextRingVertices) {
            const dx = nv.x - v.x;
            const dy = nv.y - v.y;
            const dist = dx * dx + dy * dy;
            if (dist < closestDist) {
              closestDist = dist;
              closest = nv;
            }
          }

          if (shouldDraw(r, i, 1)) {
            edges.push({
              x1: v.x, y1: v.y,
              x2: closest.x, y2: closest.y,
              crossRing: true,
            });
          }

          // Also connect to the second-closest for richer lattice patterns
          if (nextRingVertices.length > 1 && shouldDraw(r, i, 2)) {
            let secondClosest = nextRingVertices[0];
            let secondDist = Infinity;
            for (const nv of nextRingVertices) {
              const dx = nv.x - v.x;
              const dy = nv.y - v.y;
              const dist = dx * dx + dy * dy;
              if (dist < secondDist && nv !== closest) {
                secondDist = dist;
                secondClosest = nv;
              }
            }
            edges.push({
              x1: v.x, y1: v.y,
              x2: secondClosest.x, y2: secondClosest.y,
              crossRing: true,
            });
          }
        }
      }
    }
  }

  return edges;
}

/**
 * Convert Coxeter edges to SVG path data strings,
 * categorized by layer for the scroll physics motor.
 */
export function coxeterToSVGPaths(
  edges: CoxeterEdge[],
  ringCount: number
): { d: string; layer: 1 | 2 | 3; isDashed: boolean }[] {
  return edges.map(edge => {
    // Determine layer from the ring positions of the edge endpoints
    // We approximate by looking at the average distance from center
    const avgDist = Math.sqrt(
      ((edge.x1 + edge.x2) / 2) ** 2 + ((edge.y1 + edge.y2) / 2) ** 2
    );
    
    // Estimate max radius (rough)
    const maxRadius = 150 * Math.pow(1.6, (ringCount - 1) * 0.7);
    const normalizedDist = avgDist / maxRadius;

    let layer: 1 | 2 | 3 = 3;
    if (normalizedDist < 0.33) layer = 1;
    else if (normalizedDist < 0.66) layer = 2;

    return {
      d: `M ${edge.x1.toFixed(2)},${edge.y1.toFixed(2)} L ${edge.x2.toFixed(2)},${edge.y2.toFixed(2)}`,
      layer,
      isDashed: edge.crossRing, // Cross-ring edges are dashed for visual distinction
    };
  });
}

/**
 * Generate concentric ring circles for visual framing.
 */
export function generateRingCircles(params: CoxeterParams): { r: number; isDashed: boolean }[] {
  const { ringCount, innerRadius, semanticMean } = params;
  const circles: { r: number; isDashed: boolean }[] = [];

  for (let k = 0; k < ringCount; k++) {
    const radius = innerRadius * Math.pow(semanticMean, k * 0.7);
    circles.push({
      r: radius,
      isDashed: k % 2 === 1,
    });
  }

  return circles;
}
