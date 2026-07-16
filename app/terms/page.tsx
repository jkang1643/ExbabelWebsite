import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Exbabel",
  description:
    "Exbabel Terms of Service — the rules and guidelines governing use of our real-time AI translation platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header bar */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            Exbabel
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-primary transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-12">
          <p className="text-xs tracking-wider text-primary uppercase font-bold mb-3">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400">
            Effective Date: July 15, 2026
          </p>
        </header>

        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6 text-[15px]">
          <p>
            Welcome to Exbabel. By accessing or using our platform, you agree
            to be bound by these Terms of Service. If you do not agree to these
            terms, please do not use our services.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            1. Services
          </h2>
          <p>
            Exbabel provides real-time speech-to-speech AI translation services
            for live events, video, audio, and captions. Our services include
            but are not limited to live translation sessions, livestream
            translation, and AI-powered caption generation.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            2. Account Registration
          </h2>
          <p>
            To access certain features, you must create an account and provide
            accurate, complete information. You are responsible for maintaining
            the confidentiality of your account credentials and for all
            activities that occur under your account.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            3. Acceptable Use
          </h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Use the platform for any unlawful purpose</li>
            <li>
              Attempt to gain unauthorized access to our systems or networks
            </li>
            <li>
              Interfere with or disrupt the integrity or performance of the
              platform
            </li>
            <li>
              Reverse-engineer, decompile, or disassemble any aspect of our
              technology
            </li>
            <li>
              Use the service to translate content that promotes hate speech,
              violence, or illegal activity
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            4. Subscription &amp; Billing
          </h2>
          <p>
            Paid features are billed according to the plan you select.
            Subscription fees are non-refundable except as required by
            applicable law. We reserve the right to modify pricing with
            reasonable advance notice.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            5. Intellectual Property
          </h2>
          <p>
            All content, features, and functionality of the Exbabel platform
            are owned by Exbabel and are protected by international copyright,
            trademark, and other intellectual property laws. You retain
            ownership of any content you submit through our platform.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            6. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, Exbabel shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages arising from your use of the platform. Our total liability
            shall not exceed the amount you have paid us in the twelve (12)
            months preceding the claim.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            7. Termination
          </h2>
          <p>
            We may suspend or terminate your access to the platform at our sole
            discretion, with or without cause, upon reasonable notice. Upon
            termination, your right to use the service will cease immediately.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            8. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the United States. Any disputes arising from these
            terms will be resolved through binding arbitration.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            9. Changes to These Terms
          </h2>
          <p>
            We may update these Terms from time to time. We will notify you of
            any material changes by posting the new terms on this page and
            updating the effective date. Continued use of the platform after
            changes constitutes acceptance of the revised terms.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            10. Contact Us
          </h2>
          <p>
            For any questions regarding these Terms, please contact us at{" "}
            <a
              href="mailto:support@exbabel.com"
              className="text-primary hover:underline"
            >
              support@exbabel.com
            </a>
            .
          </p>
        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/privacy"
            className="text-sm text-primary hover:underline font-medium"
          >
            ← Read Privacy Policy
          </Link>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Exbabel. All rights reserved.
          </p>
        </div>
      </article>
    </main>
  );
}
