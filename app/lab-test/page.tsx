import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LabTestClient from "./LabTestClient";

export const metadata = {
  title: "Latency Benchmark Report (EXB-LAB-2026-001) | Exbabel Research Lab",
  description: "Empirical objective audio-visual latency evaluation measuring end-to-end real-time speech translation performance. Conducted under IEEE 829 and ISO 25010 guidelines.",
};

export default function LabTestPage() {
  return (
    <main className="min-h-screen bg-white">
      <LabTestClient />
      <Footer />
    </main>
  );
}
