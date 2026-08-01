import EsotericWallpaperKaleidoscope from "@/components/EsotericWallpaperKaleidoscope";

export default function KaleidoscopeSandbox() {
  return (
    <main className="bg-[#0B1220] min-h-[300vh] relative">
      <div className="fixed inset-0 pointer-events-none">
        <EsotericWallpaperKaleidoscope />
      </div>
      
      <div className="relative z-10 pt-32 px-12 text-white">
        <h1 className="text-4xl font-bold mb-4">Kaleidoscope Sandbox</h1>
        <p className="text-slate-400 max-w-xl">
          This is a blank environment with a fixed background and a very tall scrollable area (300vh). 
          Scroll down the page to manually drive the kaleidoscope's continuous motor. The deeper you scroll, the more it unfolds.
        </p>
      </div>
    </main>
  );
}
