import Link from 'next/link';
import ComparisonDirectory from '@/components/compare/ComparisonDirectory';

export const metadata = {
  title: 'Compare live translation platforms',
  description: 'Compare Exbabel’s unlimited simultaneous languages with 14 other live translation platforms. Review language capacity, pricing, and timing observations.',
  alternates: { canonical: '/compare/' },
};

export default function CompareIndex() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-10">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-600"><Link href="/" className="hover:underline">Home</Link> / Comparisons</nav>
      <div className="grid items-end gap-8 border-b border-slate-200 pb-10 lg:grid-cols-[1fr_320px]">
        <div>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-[#394dfe] sm:text-6xl">Compare live translation platforms</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg"><strong className="text-[#234fdb]">Exbabel offers unlimited simultaneous languages on every church plan.</strong>{" "}
            See which platforms count session time, which charge for each target language, and how many languages each plan can serve at once.</p>
        </div>
        <aside className="border-l-2 border-[#394dfe] pl-5">
          <p className="font-bold">See the Wordly latency benchmark</p>
          <p className="my-2 text-sm leading-6 text-slate-600">Review the recordings, measurement protocol and timing breakdown.</p>
          <Link href="/lab-test/" className="text-sm font-bold text-[#3042dd] hover:underline">Open the benchmark →</Link>
        </aside>
      </div>
      <section id="language-hour-billing" className="mt-10 scroll-mt-28 rounded-2xl border border-blue-100 bg-blue-50/50 px-5 py-6 sm:p-9" aria-labelledby="language-hour-title">
        <h2 id="language-hour-title" className="text-2xl font-bold tracking-tight">Who charges per language-hour?</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          A one-hour service in three languages uses three language-hours when the provider meters each output. On an Exbabel church plan, that same service uses one broadcast hour. Every church plan includes unlimited simultaneous supported languages.
        </p>
        <dl className="mt-5 grid gap-4 text-sm leading-6 sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-slate-900">Per-language time charges for live audio</dt>
            <dd className="flex flex-wrap gap-x-4 gap-y-1">
              {[
                ['Glossa', 'glossa'],
                ['CaptionKit', 'captionkit'],
                ['LiveVoice', 'live-voice'],
                ['Polyglossia', 'polyglossia'],
              ].map(([name, slug]) => (
                <Link key={slug} href={`/compare/${slug}/#pricing`} className="font-semibold text-[#3042dd] underline underline-offset-2">{name}</Link>
              ))}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Per-language overages</dt>
            <dd className="text-slate-700"><Link href="/compare/spf-io/#pricing" className="font-semibold text-[#3042dd] underline underline-offset-2">spf.io</Link> applies them after its included allowance.</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-slate-700">Wordly and Vonal also count time once across supported languages.</p>
      </section>
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white px-5 py-6 sm:p-9">
        <h2 className="text-2xl font-bold tracking-tight">Compare Exbabel with a specific platform</h2>
        <ComparisonDirectory />
      </section>
    </div>
  );
}
