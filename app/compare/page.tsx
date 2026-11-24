import Link from 'next/link';
import ComparisonDirectory from '@/components/compare/ComparisonDirectory';

export const metadata = {
  title: 'Compare live translation platforms',
  description: 'Explore 14 comparisons of Exbabel and other translation platforms, with pricing models, language coverage and observed timing where available.',
  alternates: { canonical: '/compare/' },
};

export default function CompareIndex() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-10">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-600"><Link href="/" className="hover:underline">Home</Link> / Comparisons</nav>
      <div className="grid items-end gap-8 border-b border-slate-200 pb-10 lg:grid-cols-[1fr_320px]">
        <div>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-[#394dfe] sm:text-6xl">Compare live translation platforms</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Find a platform for your church or event. Browse the pricing models, language coverage and recorded timing observations for 14 alternatives to Exbabel.</p>
        </div>
        <aside className="border-l-2 border-[#394dfe] pl-5">
          <p className="font-bold">See the Wordly latency benchmark</p>
          <p className="my-2 text-sm leading-6 text-slate-600">Review the recordings, measurement protocol and timing breakdown.</p>
          <Link href="/lab-test/" className="text-sm font-bold text-[#3042dd] hover:underline">Open the benchmark →</Link>
        </aside>
      </div>
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white px-5 py-6 sm:p-9">
        <h2 className="text-2xl font-bold tracking-tight">Compare Exbabel with a specific platform</h2>
        <ComparisonDirectory />
      </section>
    </div>
  );
}
