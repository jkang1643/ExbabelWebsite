import VendorFacts from "@/components/compare/VendorFacts";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { comparisons, comparisonHref } from '@/lib/comparisons';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return comparisons.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = comparisons.find(platform => platform.slug === slug);
  if (!entry) notFound();
  return {
    title: `Exbabel vs ${entry.name}`,
    description: `Compare Exbabel and ${entry.name} for live translation, including pricing structure, language coverage and available timing observations.`,
    alternates: { canonical: comparisonHref(slug) },
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const entry = comparisons.find(platform => platform.slug === slug);
  if (!entry) notFound();
  const alternatives = comparisons.filter(platform => platform.slug !== slug);
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-10">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-600"><Link href="/compare/" className="font-semibold text-[#3042dd] hover:underline">Comparisons</Link> / {entry.name}</nav>
      <header className="border-b border-slate-200 pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#394dfe] sm:text-6xl">Exbabel vs {entry.name}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Compare live translation features and the cost of reaching your audience in one to five languages.</p>
        <nav aria-label="Page sections" className="mt-5 flex flex-wrap gap-5 text-sm font-bold text-[#3042dd]">
          <a href="#features" className="hover:underline">Platform features</a>
          <a href="#pricing" className="hover:underline">Pricing</a>
          {entry.rows.length > 0 && <a href="#timing" className="hover:underline">Timing evidence</a>}
          <a href="#all-comparisons" className="hover:underline">Other comparisons</a>
        </nav>
      </header>
      <VendorFacts slug={slug} name={entry.name} />
      {entry.rows.length > 0 && <section id="timing" className="mt-10 scroll-mt-28 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight">Timing evidence</h2>
        {entry.rows.length ? <>
          <p className="mb-4 mt-3 max-w-3xl text-sm leading-6 text-slate-600">These observations measure time from speech onset to the first translated caption and first translated audio in the recorded samples. Results vary with the passage and test conditions.</p>
          <div className="overflow-auto rounded-lg bg-white">
            <table className="w-full min-w-[460px] text-left text-sm [&_td]:p-4 [&_th]:p-4 [&_tr]:border-b [&_tr]:border-slate-200">
              <thead><tr><th scope="col">{entry.name} sample</th><th scope="col">Caption</th><th scope="col">Audio</th></tr></thead>
              <tbody>{entry.rows.map((row, index) => <tr key={index}><th scope="row">{row.sample}<span className="mt-1 block font-normal text-slate-600">{row.utterance}</span></th><td>{row.caption == null ? '—' : `${row.caption} s`}</td><td>{row.audio} s</td></tr>)}</tbody>
            </table>
          </div>
        </> : <p className="mt-3 text-sm leading-6 text-slate-600">The comparison notes contain no recorded timing measurements for {entry.name}.</p>}
        <Link href="/lab-test/" className="mt-5 inline-block font-bold text-[#3042dd] hover:underline">{slug === 'wordly' ? 'See the Exbabel and Wordly results, video and protocol →' : 'Read the Exbabel and Wordly latency benchmark →'}</Link>
      </section>}
      <section id="all-comparisons" className="mt-12 scroll-mt-28">
        <h2 className="mb-3 text-2xl font-bold tracking-tight">Other platform comparisons</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">{alternatives.map(platform => <li key={platform.slug}><Link className="text-sm font-semibold text-[#3042dd] hover:underline" href={comparisonHref(platform.slug)}>{platform.name}</Link></li>)}</ul>
      </section>
    </div>
  );
}
