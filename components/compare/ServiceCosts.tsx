const liveHours = 8;
const counts = [1, 2, 3, 4, 5];
const money = (amount: number) => '$' + amount.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2 });
type Row = [label: string, price: (languages: number) => string];
type Scenario = { rows: Row[]; note: string; source: string };
const fixed = (amount: number) => () => money(amount);

const scenarios: Partial<Record<string, Scenario>> = {
  glossa: {
    rows: [
      ['Pay as you go', n => money(liveHours * n * 5)],
      ['Standard', n => money(99 + Math.max(0, liveHours * n - 25) * 4)],
      ['Advanced', fixed(299)],
      ['Premium', fixed(499)],
    ],
    note: 'Glossa counts language-hours. Eight hours in three languages uses 24 of Standard’s 25 included language-hours. Five languages uses 40, so the bill includes $60 in overages.',
    source: 'https://glossa.live/#pricing',
  },
  captionkit: {
    rows: [['Audio translation add-on only', n => money(liveHours * n * 2.5)]],
    note: 'The audio figures exclude the campus license and speaking-hour charges. Audio includes translated text for the same languages. Text-only pricing adds $2 per selected language per month to the campus and speaking-hour charges.',
    source: 'https://captionkit.com/pricing',
  },
  'kaleo-ai': {
    rows: [
      ['Starter', n => n <= 2 ? '$30' : 'Choose a higher tier'],
      ['Pro', n => n <= 4 ? '$49' : 'Choose a higher tier'],
      ['Unlimited', fixed(149)],
    ],
    note: 'Starter includes five streaming hours and two target languages. The eight-hour example adds three $2 streaming hours. Pro includes ten hours and four target languages.',
    source: 'https://withkaleo.com/#pricing',
  },
  'breeze-translate': {
    rows: [['Basic', fixed(32)], ['Abundant Sundays', fixed(60)], ['Abundant All Week', fixed(80)]],
    note: 'These are published US monthly prices. Breeze makes every supported listener language available on every plan. Basic is designed for one service each Sunday.',
    source: 'https://docs.breezetranslate.com/en/plans/pricing-and-plans/',
  },
  polyglossia: {
    rows: [
      ['Speech translation', n => money(liveHours * 60 * .20 * n)],
      ['Text translation', fixed(liveHours * 60 * .10)],
    ],
    note: 'Speech pricing includes translated captions. The text-only rate covers up to 15 target languages. Both estimates exclude the one-time $149 audio gateway per source.',
    source: 'https://polyglossia.io/pricing/',
  },
  'live-voice': {
    rows: [['Premium AI voice and translated captions add-on only', n => money(liveHours * 60 * .52 * n)]],
    note: 'The estimate covers the AI add-on only. A participant plan or screen package costs extra. Eight hours in three languages is 24 hours of AI usage.',
    source: 'https://livevoice.io/en/pricing/ai',
  },
  'vonal-ai': {
    rows: [['Starter', fixed(20)], ['Growth', fixed(40)], ['Venue', fixed(200)]],
    note: 'Vonal counts active speaking time once regardless of how many supported languages are active. Its Starter plan includes 10 hours per month.',
    source: 'https://vonal.ai/pricing',
  },
  wordly: {
    rows: [['10-hour package', () => 'About $1,500 to start']],
    note: 'The figure is the starting package price, with two hours left after eight hours of use. All supported languages are included. Package hours are valid for up to 12 months.',
    source: 'https://www.wordly.ai/pricing',
  },
};

export default function ServiceCosts({ slug, name }: { slug: string; name: string }) {
  const scenario = scenarios[slug];
  const rows: Row[] = [
    ['Exbabel Starter with two hours of overage', fixed(59)],
    ['Exbabel Pro', fixed(99)],
    ['Exbabel Unlimited', fixed(299)],
    ...(scenario?.rows.map(([label, price]): Row => [name + ' · ' + label, price]) ?? []),
  ];
  return (
    <div className="my-6">
      <div className="rounded-2xl bg-[#293bc7] p-5 text-white sm:p-7">
        <h3 className="text-xl font-bold">One live hour in three languages uses one Exbabel hour</h3>
        <p className="mt-2">Every Exbabel church plan includes unlimited simultaneous supported languages. A provider that meters each target language would count the same session as three language-hours.</p>
      </div>
      <h3 className="mt-8 text-xl font-bold">Estimated bill for four two-hour Sundays</h3>
      <p className="my-3 text-sm text-slate-600">
        Figures are before tax and after trials for one room, with every selected output active for all eight hours. Exbabel Starter is $39 plus $20 for two extra broadcast hours, assuming overage is enabled.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[570px] text-left text-sm [&_th]:p-3 [&_td]:p-3 [&_tr]:border-b">
          <caption className="sr-only">Estimated charges with one to five simultaneous target languages</caption>
          <thead><tr><th scope="col">Plan</th>{counts.map(n => <th scope="col" key={n}>{n} {n === 1 ? 'language' : 'languages'}</th>)}</tr></thead>
          <tbody>{rows.map(([label, price]) => <tr key={label}><th scope="row">{label}</th>{counts.map(n => <td key={n}>{price(n)}</td>)}</tr>)}</tbody>
        </table>
      </div>
      {scenario ? (
        <p className="mt-4 text-sm leading-6">{scenario.note}{' '}<a className="font-semibold text-indigo-700 underline" href={scenario.source}>Provider pricing ↗</a></p>
      ) : (
        <p className="mt-4 text-sm leading-6">See {name}’s published plans and billing terms below. {slug === 'google-translate' ? 'The consumer app has no comparable event subscription.' : 'The public information does not establish a comparable bill for this scenario.'}</p>
      )}
    </div>
  );
}
