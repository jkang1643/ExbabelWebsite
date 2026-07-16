import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Exbabel",
  description:
    "Exbabel Privacy Policy — learn how we collect, use, and protect your data when using our real-time AI translation platform.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">
            Effective Date: July 15, 2026
          </p>
        </header>

        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6 text-[15px]">
          <p>
            Exbabel (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website at exbabel.com and use our real-time translation
            services.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            1. Information We Collect
          </h2>
          <p>
            <strong>Personal Information:</strong> When you create an account,
            subscribe to a plan, or contact us, we may collect your name, email
            address, billing information, and organization details.
          </p>
          <p>
            <strong>Usage Data:</strong> We automatically collect information
            about how you interact with our services, including IP address,
            browser type, device information, pages visited, and session
            duration.
          </p>
          <p>
            <strong>Audio &amp; Translation Data:</strong> Our platform processes
            real-time audio for translation purposes. Audio streams are
            processed in real-time and are not stored permanently unless you
            explicitly enable recording features.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              To provide and maintain our real-time translation services
            </li>
            <li>To process transactions and manage your subscription</li>
            <li>To improve and personalize your experience</li>
            <li>
              To communicate with you about updates, security alerts, and
              support
            </li>
            <li>
              To analyze usage patterns and optimize our platform performance
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            3. Cookies &amp; Tracking Technologies
          </h2>
          <p>
            We use cookies and similar tracking technologies to enhance your
            experience:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong>Essential Cookies:</strong> Required for the platform to
              function properly (authentication, session management).
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how
              visitors interact with our website to improve our services.
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Used to deliver relevant
              advertisements and measure their effectiveness.
            </li>
          </ul>
          <p>
            You can manage your cookie preferences through your browser
            settings. Disabling certain cookies may limit the functionality of
            our services.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            4. Data Sharing &amp; Disclosure
          </h2>
          <p>
            We do not sell your personal information. We may share data with
            trusted third-party service providers who assist us in operating
            our platform (e.g., payment processors, cloud hosting, analytics).
            All third parties are contractually obligated to protect your data.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            5. Data Retention &amp; Security
          </h2>
          <p>
            We retain your information only for as long as necessary to fulfill
            the purposes outlined in this policy. We implement
            industry-standard security measures, including encryption in
            transit and at rest, to protect your data from unauthorized access.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            6. Your Rights
          </h2>
          <p>
            Depending on your jurisdiction, you may have the right to access,
            correct, delete, or export your personal data. To exercise these
            rights, please contact us at{" "}
            <a
              href="mailto:support@exbabel.com"
              className="text-primary hover:underline"
            >
              support@exbabel.com
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting the new policy on this page
            and updating the effective date.
          </p>

          <h2 className="text-xl font-semibold text-slate-800 !mt-10">
            8. Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at{" "}
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
            href="/terms"
            className="text-sm text-primary hover:underline font-medium"
          >
            Read Terms of Service →
          </Link>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Exbabel. All rights reserved.
          </p>
        </div>
      </article>
    </main>
  );
}
