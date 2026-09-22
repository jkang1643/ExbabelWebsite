type IconName = "share" | "chevron" | "globe" | "microphone" | "stop" | "headphones" | "play" | "camera" | "captions" | "home" | "users" | "user" | "trend" | "arrow";
const paths: Record<IconName, string> = {
  share: "M12 16V3m-5 5 5-5 5 5M5 13v7h14v-7",
  chevron: "m6 9 6 6 6-6",
  globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z",
  microphone: "M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0V5Zm-3 6v1a6 6 0 0 0 12 0v-1M12 18v4m-4 0h8",
  stop: "M6 6h12v12H6Z",
  headphones: "M4 14v-3a8 8 0 0 1 16 0v3M4 12h3v8H4Zm13 0h3v8h-3Z",
  play: "m8 5 11 7-11 7Z",
  camera: "M3 6h12v12H3Zm12 4 6-3v10l-6-3",
  captions: "M3 4h18v14H8l-5 3V4Zm4 5h10M7 13h7",
  home: "m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7",
  users: "M9 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM2 21v-3a7 7 0 0 1 14 0v3M17 3a3 3 0 0 1 0 6m1 4a5 5 0 0 1 4 5v3",
  user: "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 21a8 8 0 0 1 16 0",
  trend: "m4 17 7-7 4 4 6-9m-6 0h6v6",
  arrow: "M3 12h18m-6-6 6 6-6 6",
};
export default function ProductGraphicIcon({ name, x, y, size = 14, color = "currentColor" }: {
  name: IconName; x: number; y: number; size?: number; color?: string;
}) {
  return <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d={paths[name]} />
  </svg>;
}
