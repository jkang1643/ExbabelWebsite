import Link from 'next/link';
import { comparisons, comparisonHref } from '@/lib/comparisons';

export default function ComparisonMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <details
      className="group/comparisons px-3"
      onPointerEnter={event => {
        if (event.pointerType === 'mouse') event.currentTarget.open = true;
      }}
      onPointerLeave={event => {
        if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) {
          event.currentTarget.open = false;
        }
      }}
    >
      <summary className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-50 hover:text-primary">
        Comparisons
      </summary>
      <ul className="max-h-[min(42vh,22rem)] overflow-y-auto border-l border-indigo-100 pl-2">
        <li><Link href="/compare/" onClick={onNavigate} className="block rounded-lg px-3 py-2 text-xs font-bold text-[#3042dd] hover:bg-indigo-50">All comparisons</Link></li>
        {comparisons.map(({ name, slug }) => (
          <li key={slug}><Link href={comparisonHref(slug)} onClick={onNavigate} className="block rounded-lg px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-[#3042dd]">Exbabel vs {name}</Link></li>
        ))}
      </ul>
    </details>
  );
}
