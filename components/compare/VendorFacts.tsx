import ServiceCosts from './ServiceCosts';
import research from '@/data/comparison/vendor-facts.json';

type Fact = { value: string; source: string };
type Vendor = {
  features: Record<string, Fact>;
  pricing: Array<Fact & { name: string }>;
};
const facts: Record<string, Vendor> = research;
const criteria = [
  ['captions', 'Live translated captions'],
  ['audio', 'Live translated audio'],
  ['input', 'Supported speaker languages'],
  ['languageSwitch', 'Speaker changes language mid-session'],
  ['church', 'Church service workflow'],
  ['phone', 'Listen on a personal device'],
  ['screens', 'Presentation and broadcast screens'],
  ['embed', 'Website or app embed'],
  ['glossary', 'Custom names and terminology'],
  ['humanReview', 'Human review before delivery'],
  ['transcripts', 'Post-session transcripts'],
  ['guides', 'Setup and help guides'],
  ['trial', 'Free trial or free access'],
] as const;

const tableClass = 'w-full min-w-[520px] text-left text-sm leading-6 [&_td]:px-4 [&_td]:py-3 [&_th]:px-4 [&_th]:py-3 [&_tr]:border-b [&_tr]:border-slate-200';

function FactCell({ fact }: { fact: Fact }) {
  return <>{fact.value} <a aria-label={`Source for ${fact.value}`} href={fact.source} className="whitespace-nowrap text-xs font-semibold text-[#3042dd] underline">Source ↗</a></>;
}

export default function VendorFacts({ slug, name }: { slug: string; name: string }) {
  const exbabel = facts.exbabel;
  const competitor = facts[slug];
  return <>
    <section id="features" className="mt-9 scroll-mt-28">
      <h2 className="mb-3 text-2xl font-bold tracking-tight">Exbabel and {name} side by side</h2>
      <p className="mb-4 text-sm leading-6 text-slate-600">Based on provider documentation reviewed November 23, 2026. Capabilities can vary by plan, language and mode.</p>
      <div className="overflow-auto rounded-xl border border-slate-200 bg-white">
        <table className={tableClass}>
          <thead className="bg-indigo-50"><tr><th scope="col">Feature</th><th scope="col" className="rounded-t-xl border-x border-t border-indigo-300 text-indigo-700">Exbabel</th><th scope="col">{name}</th></tr></thead>
          <tbody>{criteria.filter(([key]) => exbabel.features[key] && competitor.features[key]).map(([key, label]) => <tr key={key}>
            <th scope="row" className="w-1/4">{label}</th>
            <td className="w-[37.5%] border-x border-indigo-300 bg-indigo-50/40"><FactCell fact={exbabel.features[key]} /></td>
            <td><FactCell fact={competitor.features[key]} /></td>
          </tr>)}</tbody>
        </table>
      </div>
    </section>
    <section id="pricing" className="mt-10 scroll-mt-28">
      <h2 className="mb-3 text-2xl font-bold tracking-tight">What eight hours of translation costs</h2>
      <ServiceCosts slug={slug} name={name} />
      <p className="mb-4 text-sm leading-6 text-slate-600">Published prices and allowances are listed with their billing units. Confirm the current checkout terms for your location and usage.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {([{ label: 'Exbabel', vendor: exbabel }, { label: name, vendor: competitor }]).map(({label, vendor}) => {
          const plans = vendor.pricing;
          return <div key={label} className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-3 text-lg font-bold">{label}</h3>
            {plans.length ? <dl className="divide-y divide-slate-200">{plans.map(plan => <div key={plan.name} className="py-3 text-sm leading-6">
              <dt className="font-semibold">{plan.name}</dt><dd><FactCell fact={plan} /></dd>
            </div>)}</dl> : <p className="text-sm text-slate-600">Public pricing could not be confirmed.</p>}
          </div>;
        })}
      </div>
    </section>
  </>;
}
