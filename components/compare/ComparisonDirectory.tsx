import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { comparisons, comparisonHref } from '@/lib/comparisons';

export default function ComparisonDirectory() {
  return (
    <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {comparisons.map(({ name, slug }) => (
        <li key={slug} className="border-b border-slate-200">
          <Link href={comparisonHref(slug)} className="flex items-center justify-between gap-4 py-4 text-sm font-semibold text-slate-900 hover:text-[#394dfe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#394dfe]">
            Exbabel vs {name}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#394dfe]" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
