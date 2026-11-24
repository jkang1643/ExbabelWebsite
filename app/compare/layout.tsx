import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <><Navbar /><main className="bg-slate-50 pb-20 pt-24 text-slate-900 sm:pt-28">{children}</main><Footer /></>;
}
