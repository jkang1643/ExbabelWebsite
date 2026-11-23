import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './research.css';
export default function ResearchLayout({children}:{children:React.ReactNode}){
 return <><Navbar/><div className="research"><div className="labstrip"><div><a href="/research/">Exbabel Research Lab</a><span> / </span><a href="/lab-test/">Latency benchmark</a><a href="/research/un-speech-translation/">UN speech study</a></div></div>{children}</div><Footer/></>;
}
