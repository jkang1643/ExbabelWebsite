{/*
  WorkflowDiagramSvg — Interactive Flow Graphic
  Full horizontal pipeline: Speaker → Audio → AI → Translation → Voice → Captions → Audience → Dashboard
  Beautiful glowing gradient connection paths
*/}
import SvgDefs from "./SvgDefs";

export default function WorkflowDiagramSvg({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 20, y: 70, label: "Speaker", color: "#FFD6E5", id: "node-speaker" },
    { x: 140, y: 70, label: "Audio", color: "#EAD6FF", id: "node-audio" },
    { x: 260, y: 70, label: "AI", color: "#394DFE", id: "node-ai" },
    { x: 380, y: 70, label: "Translate", color: "#D6F5FF", id: "node-translate" },
    { x: 500, y: 70, label: "Voice", color: "#EAD6FF", id: "node-voice" },
    { x: 620, y: 70, label: "Captions", color: "#FFD6E5", id: "node-captions" },
    { x: 740, y: 70, label: "Audience", color: "#D6F5FF", id: "node-audience" },
    { x: 860, y: 70, label: "Dashboard", color: "#EAD6FF", id: "node-dashboard" },
  ];

  return (
    <svg viewBox="0 0 980 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Complete product workflow: Speaker to Audio to AI to Translation to Voice to Captions to Audience to Dashboard">
      <SvgDefs />

      {/* Background */}
      <g id="background">
        <rect width="980" height="200" rx="16" fill="#0B1220" />
        {/* Ambient aurora blobs */}
        <ellipse cx="260" cy="100" rx="180" ry="80" fill="url(#grad-glow-brand)" opacity="0.15" />
        <ellipse cx="620" cy="100" rx="180" ry="80" fill="url(#grad-glow-purple)" opacity="0.12" />
      </g>

      {/* Connection lines between nodes */}
      <g id="connections">
        {nodes.slice(0, -1).map((node, i) => {
          const next = nodes[i + 1];
          const isAI = node.color === "#394DFE" || next.color === "#394DFE";
          return (
            <g key={node.id}>
              <line
                x1={node.x + 80}
                y1={node.y + 30}
                x2={next.x + 20}
                y2={next.y + 30}
                stroke={isAI ? "#394DFE" : node.color}
                strokeWidth="2"
                strokeDasharray="4 3"
                opacity="0.3"
              />
              {/* Glow dot at midpoint */}
              <circle
                cx={(node.x + 80 + next.x + 20) / 2}
                cy={node.y + 30}
                r="3"
                fill={isAI ? "#394DFE" : node.color}
                opacity="0.5"
              />
            </g>
          );
        })}
      </g>

      {/* Nodes */}
      <g id="nodes">
        {nodes.map((node) => {
          const isAI = node.color === "#394DFE";
          return (
            <g key={node.id} id={node.id}>
              {/* Glow behind */}
              {isAI && (
                <circle cx={node.x + 50} cy={node.y + 30} r="35" fill="url(#grad-glow-brand)" opacity="0.3" />
              )}
              {/* Card */}
              <rect
                x={node.x}
                y={node.y}
                width="100"
                height="60"
                rx="14"
                fill={isAI ? "rgba(57, 77, 254, 0.12)" : "rgba(255, 255, 255, 0.08)"}
                stroke={node.color}
                strokeWidth="1"
                strokeOpacity={isAI ? 0.4 : 0.2}
              />
              {/* Icon circle */}
              <circle
                cx={node.x + 50}
                cy={node.y + 24}
                r="10"
                fill={node.color}
                opacity={isAI ? 0.3 : 0.2}
              />
              <circle
                cx={node.x + 50}
                cy={node.y + 24}
                r="4"
                fill="#FFFFFF"
                opacity="0.5"
              />
              {/* Label bar */}
              <rect
                x={node.x + 25}
                y={node.y + 42}
                width="50"
                height="5"
                rx="2.5"
                fill={node.color}
                opacity={isAI ? 0.35 : 0.2}
              />
            </g>
          );
        })}
      </g>

      {/* Bottom labels (abstract) */}
      <g id="stage-labels" opacity="0.15">
        {nodes.map((node) => (
          <rect key={node.id} x={node.x + 20} y={145} width="60" height="4" rx="2" fill="#FFFFFF" />
        ))}
      </g>
    </svg>
  );
}
