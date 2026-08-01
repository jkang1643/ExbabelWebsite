import React, { useMemo } from "react";
import { getRNG, randomFloat, randomInt, randomChoice, randomChance, PRNG } from "@/lib/rng";

type GeneratorProps = {
  seed: string;
};

type Node = {
  x: number;
  y: number;
  type: "star" | "circle" | "diamond" | "moon" | "none";
  radius: number;
};

type Path = {
  d: string;
  isDashed: boolean;
};

export default function EsotericGenerator({ seed }: GeneratorProps) {
  // --- Level 9: Design DNA (Seed Engine) ---
  // Memoize generation so it only changes when the seed changes
  const { N, nodes, paths, globalScale, globalRotation, lineOpacity } = useMemo(() => {
    const rng = getRNG(seed);
    
    // --- Level 5 & 6: Grid & Symmetry ---
    const symmetryOptions = [6, 8, 12, 16]; // N-fold Dihedral Symmetry
    const N = randomChoice(symmetryOptions, rng);
    
    // The wedge angle bounds
    const maxAngle = (Math.PI * 2) / N;

    // --- Level 1 & 2: Anchor Grid & Modules ---
    // Generate valid orbits and angle increments
    const numOrbits = randomInt(4, 8, rng);
    const orbits = Array.from({ length: numOrbits }).map((_, i) => 150 + i * randomFloat(100, 150, rng));
    
    const nodes: Node[] = [];
    const paths: Path[] = [];

    // Procedural Circuit Routing logic
    for (let i = 0; i < numOrbits; i++) {
      const orbit = orbits[i];
      // Generate 1 to 3 anchor points on this orbit within the wedge
      const numAnchors = randomInt(1, 3, rng);
      for (let j = 0; j < numAnchors; j++) {
        const angle = randomFloat(0, maxAngle, rng);
        const x = Math.cos(angle) * orbit;
        const y = Math.sin(angle) * orbit;
        
        // --- Level 3: Ornament Grammar ---
        let type: Node["type"] = "none";
        const roll = rng();
        if (roll < 0.2) type = "star";
        else if (roll < 0.6) type = "circle";
        else if (roll < 0.7) type = "moon";
        else if (roll < 0.8) type = "diamond";

        nodes.push({
          x,
          y,
          type,
          // --- Level 7: Mutation Engine (Radius variance) ---
          radius: type === "circle" ? randomFloat(4, 12, rng) : randomFloat(10, 30, rng)
        });
      }
    }

    // --- Level 4: Circuit Grammar (PCB Traces) ---
    // Connect some nodes procedurally
    for (let i = 0; i < nodes.length - 1; i++) {
      if (randomChance(0.6, rng)) {
        const n1 = nodes[i];
        // Connect to a node in the next orbit
        const n2 = nodes.find((n, idx) => idx > i && n.x * n.x + n.y * n.y > n1.x * n1.x + n1.y * n1.y);
        
        if (n2) {
          // PCB Routing rules: Strict angles and arcs instead of arbitrary straight lines
          // We will draw a straight line for now, but use Bezier curves for luxury flow
          let d = "";
          const routingStyle = randomChoice(["straight", "curved", "corner"], rng);
          
          if (routingStyle === "straight") {
            d = `M ${n1.x},${n1.y} L ${n2.x},${n2.y}`;
          } else if (routingStyle === "curved") {
            const midX = (n1.x + n2.x) / 2;
            const midY = (n1.y + n2.y) / 2;
            const cX = midX + randomFloat(-50, 50, rng);
            const cY = midY + randomFloat(-50, 50, rng);
            d = `M ${n1.x},${n1.y} Q ${cX},${cY} ${n2.x},${n2.y}`;
          } else {
            // "Corner" PCB route (manhattan distance)
            d = `M ${n1.x},${n1.y} L ${n2.x},${n1.y} L ${n2.x},${n2.y}`;
          }

          paths.push({
            d,
            isDashed: randomChance(0.3, rng)
          });
        }
      }
    }

    // Add a structural frame to ground the geometry
    const maxOrbit = Math.max(...orbits);
    paths.push({
      d: `M ${Math.cos(0) * maxOrbit},${Math.sin(0) * maxOrbit} A ${maxOrbit} ${maxOrbit} 0 0 1 ${Math.cos(maxAngle) * maxOrbit},${Math.sin(maxAngle) * maxOrbit}`,
      isDashed: randomChance(0.5, rng)
    });

    // Global mutation
    const globalScale = randomFloat(0.8, 1.2, rng);
    const globalRotation = randomFloat(0, 360, rng);
    const lineOpacity = randomFloat(0.4, 0.9, rng);

    return { N, nodes, paths, globalScale, globalRotation, lineOpacity };
  }, [seed]);

  // Generate the rotational slices array
  const segments = Array.from({ length: N }).map((_, i) => i * (360 / N));

  // --- Level 0: Primitive Definitions (Render Helpers) ---
  const renderNode = (node: Node, i: number) => {
    switch (node.type) {
      case "circle":
        return <circle key={i} cx={node.x} cy={node.y} r={node.radius} fill="none" />;
      case "star":
        return (
          <g key={i} transform={`translate(${node.x}, ${node.y}) scale(${node.radius / 30})`}>
            <use href="#gen-star" />
          </g>
        );
      case "diamond":
        return (
          <g key={i} transform={`translate(${node.x}, ${node.y}) scale(${node.radius / 15})`}>
            <polygon points="0,-15 15,0 0,15 -15,0" fill="none" />
          </g>
        );
      case "moon":
        return (
          <g key={i} transform={`translate(${node.x}, ${node.y}) scale(${node.radius / 30})`}>
            <use href="#gen-moon" />
          </g>
        );
      default:
        // A tiny joint node for blank intersections
        return <circle key={i} cx={node.x} cy={node.y} r={3} fill="url(#gen-gold)" stroke="none" />;
    }
  };

  // The base structural wedge containing generated geometry
  const BaseWedge = () => (
    <>
      {paths.map((p, i) => (
        <path 
          key={`path-${i}`} 
          d={p.d} 
          stroke="url(#gen-gold)" 
          strokeWidth="2" 
          strokeDasharray={p.isDashed ? "8 16" : "none"} 
          fill="none" 
          strokeLinecap="round"
          style={{ opacity: lineOpacity }}
        />
      ))}
      {nodes.map((node, i) => renderNode(node, i))}
    </>
  );

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center opacity-90 mix-blend-screen pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" className="w-full h-full max-w-[2000px] object-cover drop-shadow-[0_0_20px_rgba(253,224,71,0.5)]">
        <defs>
          <linearGradient id="gen-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>

          {/* Reusable Primitives */}
          <g id="gen-star" fill="none" stroke="url(#gen-gold)" strokeWidth="2">
            <path d="M 0,-30 L 5,-10 L 30,0 L 5,10 L 0,30 L -5,10 L -30,0 L -5,-10 Z" />
            <circle cx="0" cy="0" r="4" fill="url(#gen-gold)" />
          </g>
          
          <g id="gen-moon" fill="none" stroke="url(#gen-gold)" strokeWidth="2">
            <path d="M 0,-20 A 20 20 0 1 0 0,20 A 15 15 0 1 1 0,-20 Z" />
          </g>

          <g id="gen-core" fill="none" stroke="url(#gen-gold)" strokeWidth="2.5">
            <circle cx="0" cy="0" r="40" />
            <circle cx="0" cy="0" r="30" strokeDasharray="4 8" />
            <circle cx="0" cy="0" r="10" fill="url(#gen-gold)" />
            <path d="M 0,-40 L 0,40 M -40,0 L 40,0 M -28,-28 L 28,28 M -28,28 L 28,-28" strokeWidth="1" strokeDasharray="3 6" />
          </g>
        </defs>

        {/* --- Level 8: Luxury Rules & Geometry Output --- */}
        <g transform={`translate(1000, 1000) scale(${globalScale}) rotate(${globalRotation})`}>
          
          {/* Central Singularity Origin */}
          <use href="#gen-core" />
          
          {/* Dihedral Symmetry Multiplier (D_n) */}
          {segments.map((angle) => (
            <g key={`seg-${angle}`} transform={`rotate(${angle})`} stroke="url(#gen-gold)" strokeWidth="2">
              <g>
                <BaseWedge />
              </g>
              <g transform="scale(1, -1)">
                <BaseWedge />
              </g>
            </g>
          ))}
          
        </g>
      </svg>
    </div>
  );
}
