import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { comparisons, comparisonHref } from '@/lib/comparisons';

export default function ComparisonMenu({ onNavigate, expandOnHover = false }: { onNavigate: () => void; expandOnHover?: boolean }) {
  return (
    <details
      className="relative px-3"
      onPointerEnter={event => {
        if (expandOnHover && event.pointerType === 'mouse') event.currentTarget.open = true;
      }}
      onPointerLeave={event => {
        if (expandOnHover && event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) {
          event.currentTarget.open = false;
        }
      }}
    >
      <summary className={`cursor-pointer rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-50 hover:text-primary ${expandOnHover ? "flex list-none items-center justify-between [&::-webkit-details-marker]:hidden" : ""}`}>
        Comparisons
        {expandOnHover && <ChevronRight aria-hidden="true" className="h-4 w-4" />}
      </summary>
      <div className={expandOnHover ? 'absolute -top-3 left-full z-50 w-64 pl-1' : ''}>
      <ul className={expandOnHover ? 'max-h-[min(45vh,25rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl' : 'max-h-[min(42vh,22rem)] overflow-y-auto border-l border-indigo-100 pl-2'}>
        <li><Link href="/compare/" onClick={onNavigate} className="block rounded-lg px-3 py-2 text-xs font-bold text-[#3042dd] hover:bg-indigo-50">All comparisons</Link></li>
        {comparisons.map(({ name, slug }) => (
          <li key={slug}><Link href={comparisonHref(slug)} onClick={onNavigate} className="block rounded-lg px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-[#3042dd]">Exbabel vs {name}</Link></li>
        ))}
      </ul>
      </div>
    </details>
  );
}
