import type { Metadata } from 'next';
import EventsPageContent from '@/components/events-page/EventsPageContent';

const title = 'Live event translation and captions | Exbabel Events';
const description = 'Bring your audience into the conversation with live AI translated audio and captions on their phones. Organize rooms, sessions, and crew with Exbabel Events.';
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: 'https://www.exbabel.com/events/' },
  robots: { index: true, follow: true },
  openGraph: { title, description, url: 'https://www.exbabel.com/events/', type: 'website', siteName: 'Exbabel', images: [{ url: '/solutions/events/og.png', width: 1200, height: 630, alt: 'Exbabel Events live event translation' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/solutions/events/og.png'] },
};

export default function EventsPage() { return <EventsPageContent />; }
