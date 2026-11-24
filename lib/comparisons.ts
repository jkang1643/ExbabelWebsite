import platforms from '@/data/comparison/platforms.json';

export const comparisons = [...platforms].sort((a, b) => a.name.localeCompare(b.name));
export const comparisonHref = (slug: string) => `/compare/${slug}/`;
