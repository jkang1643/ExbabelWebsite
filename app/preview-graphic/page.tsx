import LiveTranslationGraphic from '@/components/LiveTranslationGraphic';

export default function PreviewPage() {
  return (
    <div className="bg-[#0B1220] min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Graphic Preview</h1>
        <p className="text-gray-400">Previewing the animated LiveTranslationGraphic component.</p>
      </div>
      <LiveTranslationGraphic />
    </div>
  );
}
