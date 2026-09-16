import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LabTestClient from "./LabTestClient";
import DatasetSchema from "@/components/schema/DatasetSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export const metadata = {
  title: "Real-Time Translation Latency Benchmarks | Exbabel Lab",
  description: "See independent latency tests and benchmarks for Exbabel's real-time AI translation. Compare audio-visual latency performance across different languages.",
  alternates: { canonical: "/lab-test" },
};

export default function LabTestPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={[{ name: "Lab Test", url: "https://www.exbabel.com/lab-test" }]} />
      <DatasetSchema name="Exbabel Real-Time Translation Latency Benchmarks" description="Empirical latency benchmarks measuring real-time AI speech-to-speech translation latency across languages." url="https://www.exbabel.com/lab-test" creator={{ name: "Exbabel", url: "https://www.exbabel.com" }} />
      <LabTestClient />
      <Footer />
    </main>
  );
}
