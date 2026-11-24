import research from '@/data/comparison/vendor-facts.json';

const counts = [1, 2, 3, 4, 5];
const money = (amount: number) => '$' + amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
type Row = [string, (languages: number) => string];
const fixed = (amount: number) => () => money(amount);
const capped = (amount: number, cap: number) => (n: number) => n <= cap ? money(amount) : 'Choose higher tier';
type Scenario = { rows: Row[]; note: string; link?: string };
const scenarios: Record<string, Scenario> = {
  glossa: {rows: [
    ['Pay as you go', n => money(8 * n * 5)],
    ['Standard', n => money(99 + Math.max(0, 8*n - 25)*4)],
    ['Advanced', fixed(299)], ['Premium', fixed(499)]
  ], note: 'Glossa counts language-hours. Eight hours in three languages uses 24 of Standard’s 25 included hours. Five languages uses 40 hours, adding $60 in overages.'},
  captionkit: {rows: [['Audio + text', n => money(12+8+8*n*2.5)], ['Text only', n => money(12+8+2*n)]], note: 'The USD calculator combines a $12 campus license and $8 for speaking time with the selected outputs. Each spoken language adds $20 for eight hours and includes its captions.'},
  'kaleo-ai': {rows: [['Starter', capped(30,2)], ['Pro', capped(49,4)], ['Unlimited', fixed(149)]], note: 'Starter includes five hours, so the example adds three $2 hours. Pro covers ten hours and four target languages. Five target languages requires Unlimited.'},
  'breeze-translate': {rows: [['Basic Sunday', n=>n<=2?'$32':'See Abundant'],['Abundant Sundays',fixed(60)],['Abundant All Week',fixed(80)]], note:'Four weekly payments in the USD weekly view. Basic is marketed for one Sunday service and a couple of languages. Both Abundant plans include unlimited languages.'},
  'sunflower-ai': {rows:[['Basic',()=>'$110–130'],['Pro',fixed(200)]], note:'Prices use the vendor’s $ currency symbol. Its church FAQ quotes Australian dollars. Basic includes five target languages and 7.5 hours. The extra half hour costs $20 if prorated or $40 as a whole hour. Pro includes ten target languages and 30 hours.'},
  'vonal-ai': {rows:[['Starter',fixed(20)],['Growth',fixed(40)],['Venue',fixed(200)]],note:'Estimate assumes the eight broadcast hours count once. Each plan lists 40+ audience languages and unlimited listeners. Monthly allowances are 10, 30 and 250 hours respectively.'},
  'selah-translate': {rows:[['Basic',capped(29,1)],['Professional',()=>'$49*']],note:'Basic serves one output per session. Professional includes 40 hours and several simultaneous languages with spoken output in beta. *Confirm the desired language count with Selah before booking.'},
  polyglossia:{rows:[['Speech usage',n=>money(480*.2*n)],['Text-only usage',fixed(48)]],note:'Speech includes translated captions. Text alone covers up to 15 languages at one rate. Add $149 once for each gateway audio source.'},
  'live-voice':{rows:[['AI audio add-on',n=>money(480*.52*n)]],note:'Add this USD usage charge to the participant plan for your audience size. Each eight-hour audio channel adds $249.60, including translated captions.'},
  wordly:{rows:[['10-hour package',()=>'≈ $1,500']],note:'Upfront package price, with two hours left after these services. The hours are valid for up to 12 months. All languages are included at one fixed price.'},
  stenomatic:{rows:[['Self-service starting cost',()=>'From $600']],note:'480 minutes at the advertised starting rate of $1.25 per minute. Self-service includes unlimited parallel tracks. Event support and enterprise volume use are quoted separately.'},
  oneaccord:{rows:[],note:'CaptionKit reports that OneAccord’s $150 monthly base plan covers five hours, up to three languages and 30 listeners per service. For an eight-hour month, its team prices the number of languages, hours and users together.',link:'https://captionkit.com/compare/oneaccord'},
  'spf-io':{rows:[],note:'CaptionKit cites a starting price of $199/month for conferences and a separate onboarding fee. Church packages are quoted by hours and target languages. The conference starting price does not establish a church rate for eight hours.',link:'https://captionkit.com/compare/spf-io'},
  'google-translate':{rows:[],note:'Google Translate is a free consumer app. A listener can use it on their device. Google does not sell a one-to-five-channel event subscription through this app.'}
};

export default function ServiceCosts({slug,name}:{slug:string;name:string}){
  const scenario = scenarios[slug];
  const vendor = research[slug as keyof typeof research];
  const featuredPrices: Record<string, [string, string]> = {
    oneaccord: ['$150/mo', 'Five hours, up to three languages and 30 listeners per service.'],
    'spf-io': ['From $199/mo', 'Conference pricing. Recurring church services are priced individually.'],
    'google-translate': ['Free', 'Consumer translation on a personal device.'],
    'kaleo-ai': ['$49', 'Pro covers eight hours in three languages.'],
    'breeze-translate': ['$60', 'Abundant Sundays covers four Sundays with unlimited languages.'],
    'selah-translate': ['$49', 'Professional includes several languages per session.'],
    wordly: ['≈ $1,500', 'Upfront 10-hour package covering all languages.'],
  };
  const [headline, detail] = featuredPrices[slug] || [
    scenario.rows[0][1](3),
    scenario.rows[0][0] + ' · eight live hours in three languages.',
  ];
  const rows: Row[] = [['Exbabel Starter · $39/month + $20 for two extra hours',fixed(59)],['Exbabel Pro · $99/month',fixed(99)],['Exbabel Unlimited · $299/month',fixed(299)], ...scenario.rows.map(([label,price]):Row=>[name+' · '+label,price])];
  return <div className="my-6">
    <div className="grid gap-4 md:grid-cols-2">
    <div className="rounded-3xl bg-[#293bc7] p-6 text-white sm:p-9">
      <p className="text-sm font-semibold">Exbabel Starter</p>
      <p className="my-2 text-5xl font-bold tracking-tight">$39<span className="text-xl">/month</span></p>
      <p>Includes six live hours. Pro is $99/month and Unlimited is $299/month. All three plans include unlimited simultaneous supported languages.</p>
    </div>
    <div className="rounded-3xl bg-slate-100 p-6 sm:p-9">
      <p className="text-sm font-semibold">{name}</p>
      <p className="my-2 text-4xl font-bold tracking-tight">{slug === 'glossa' ? '$99' : headline}</p>
      <p>{slug === 'glossa' ? 'Standard covers eight live hours in three languages.' : detail}</p>
    </div></div>
    <h3 className="mt-8 text-xl font-bold">Estimated bill for four two-hour Sundays</h3>
    <p className="my-3 text-sm text-slate-600">Estimated charges before tax, after trials, for one room. Each selected output runs for all eight hours. Exbabel Starter includes six hours for $39 plus two hours at $10 each.</p>
    <div className="overflow-x-auto"><table className="w-full min-w-[570px] text-left text-sm [&_th]:p-3 [&_td]:p-3 [&_tr]:border-b">
      <caption className="sr-only">Cost for one to five simultaneous target languages</caption>
      <thead><tr><th scope="col">Plan</th>{counts.map(n=><th scope="col" key={n}>{n} {n===1?'language':'languages'}</th>)}</tr></thead>
      <tbody>{rows.map(([label,price])=><tr key={label}><th scope="row">{label}</th>{counts.map(n=><td key={n}>{price(n)}</td>)}</tr>)}</tbody>
    </table></div>
    <p className="mt-4 text-sm leading-6">{scenario.note} <a className="font-semibold text-indigo-700 underline" href={scenario.link || vendor.pricing[0].source}>{scenario.link?'CaptionKit comparison':'Provider pricing'} ↗</a></p>
  </div>;
}
