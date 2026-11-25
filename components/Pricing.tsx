"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "@/app/solutions/church-translation/page.module.css";
import { capturePostHogEvent } from "@/lib/posthog-client";

export default function Pricing({ surface = "home" }: { surface?: "home" | "church" }) {
  return (
    <section
      id={surface === "home" ? "pricing" : undefined}
      className={surface === "home" ? `${styles.page} ${styles.planningBand}` : styles.planningBand}
      aria-labelledby="pricing-title"
    >
      <div className={styles.wrap}>
        <div className={styles.planningContainer}>
          <div className={styles.planningHeader}>
            <h2 id="pricing-title">
              Church &amp; House of Worship Packages
            </h2>
            <p className={styles.planningIntro}>
              Flexible packages designed to cover 12 months of Exbabel usage across a wide range of services, meetings, and campus types.
              You can expand your package at any time during the year as your multilingual congregation grows. Volume discounts apply to all packages.
            </p>
          </div>

          {/* Full-width 3-column pricing cards */}
          <ul className={styles.pricingCards} aria-label="Exbabel packages for churches">
            <li className={styles.pricingCard} data-plan="starter">
              <h3 className={styles.planName}><Image className={styles.planArt} src="/plan-starter.png" alt="" width={80} height={58} /><span><small>1 — PLAN</small>Starter</span></h3>
              <strong className={styles.planPrice}>$39<span>/mo</span></strong>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#394dfe", marginBottom: "8px" }}>
                6 Hours / Month <span style={{ color: "#667085", fontWeight: "normal" }}>(~72 hrs/yr)</span>
              </div>
              <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#475467", fontWeight: "600", margin: "12px 0 6px" }}>
                Sample Meeting Types:
              </div>
              <ul className={styles.planFeatures}>
                <li>1 Weekly Sunday Service</li>
                <li>Community Outreach Meetings</li>
                <li>Midweek Bible Study</li>
                <li>Volunteer Onboarding</li>
                <li><strong>90+</strong> Spoken Voice Languages</li>
                <li><strong>180+</strong> Live Caption Languages</li>
                <li>Customizable Church Glossaries</li>
                <li>30-Day Free Trial</li>
              </ul>
              <Link
                prefetch={false}
                href="https://app.exbabel.com/translate/checkout?plan=starter"
                onClick={() => capturePostHogEvent("checkout_started", { plan_name: "starter", billing_interval: "monthly", is_recommended: false })}
                className={styles.planCta}
              >
                Start free trial
              </Link>
            </li>
            <li className={styles.pricingCard + " " + styles.pricingCardFeatured} data-plan="pro">
              <span className={styles.planBadge}>Most popular</span>
              <h3 className={styles.planName}><Image className={styles.planArt} src="/plan-pro.jpg" alt="" width={80} height={58} /><span><small>2 — PLAN</small>Pro</span></h3>
              <strong className={styles.planPrice}>$99<span>/mo</span></strong>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#394dfe", marginBottom: "8px" }}>
                15 Hours / Month <span style={{ color: "#667085", fontWeight: "normal" }}>(~180 hrs/yr)</span>
              </div>
              <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#475467", fontWeight: "600", margin: "12px 0 6px" }}>
                Sample Meeting Types:
              </div>
              <ul className={styles.planFeatures}>
                <li>Multiple Weekly Services</li>
                <li>Youth &amp; Children’s Services</li>
                <li>Ministry Staff Meetings</li>
                <li><strong>90+</strong> Voice &amp; <strong>180+</strong> Caption Languages</li>
                <li>Priority WebRTC Low-Latency Audio</li>
                <li>Post-Sermon Multilingual Transcripts</li>
                <li>AI Sermon Summaries &amp; Study Notes</li>
              </ul>
              <Link
                prefetch={false}
                href="https://app.exbabel.com/translate/checkout?plan=pro"
                onClick={() => capturePostHogEvent("checkout_started", { plan_name: "pro", billing_interval: "monthly", is_recommended: true })}
                className={styles.planCta}
              >
                Get started
              </Link>
            </li>
            <li className={styles.pricingCard} data-plan="unlimited">
              <h3 className={styles.planName}><Image className={styles.planArt} src="/plan-unlimited.jpg" alt="" width={80} height={58} /><span><small>3 — PLAN</small>Unlimited</span></h3>
              <strong className={styles.planPrice}>$299<span>/mo</span></strong>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#394dfe", marginBottom: "8px" }}>
                36 Hours / Month <span style={{ color: "#667085", fontWeight: "normal" }}>(~432 hrs/yr)</span>
              </div>
              <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#475467", fontWeight: "600", margin: "12px 0 6px" }}>
                Sample Meeting Types:
              </div>
              <ul className={styles.planFeatures}>
                <li>Multiple Campuses &amp; Large Sanctuaries</li>
                <li><strong>90+</strong> Voice &amp; <strong>180+</strong> Caption Languages</li>
                <li>Voice Cloning (Pastor Voice Match)</li>
                <li>Conference &amp; Revival Event Support</li>
                <li>Video Subtitles &amp; Dubbing</li>
                <li>Livestream Captions &amp; Broadcasts</li>
                <li>Dedicated AV Specialist Onboarding</li>
                <li>SSO Access Included</li>
              </ul>
              <Link
                prefetch={false}
                href="https://app.exbabel.com/translate/checkout?plan=unlimited"
                onClick={() => capturePostHogEvent("checkout_started", { plan_name: "unlimited", billing_interval: "monthly", is_recommended: false })}
                className={styles.planCta}
              >
                Get started
              </Link>
            </li>
          </ul>
          <p className={styles.pricingNote}>
            Additional usage billed at $10/hour per language. 30-day free trial available on Starter plan.{" "}
            <Link prefetch={false} href={surface === "home" ? "/solutions/church-translation/#pricing-title" : "/#pricing"}>
              Full pricing details ↗
            </Link>
          </p>

          {/* ── Packages Comparison Matrix Table ── */}
          <div className={styles.packagesComparison}>
            <h3>Feature &amp; Package Comparison</h3>
            <p className={styles.packagesComparisonSubtitle}>
              Compare features across all three church packages. Expand hours anytime as your multilingual ministry needs grow.
            </p>
            <div className={styles.packagesTableWrap}>
              <table className={styles.packagesTable}>
                <thead>
                  <tr>
                    <th scope="col">Feature / Capability</th>
                    <th scope="col" className={styles.starterHeading}>Starter</th>
                    <th scope="col" className={styles.proHeading}>Pro (Recommended)</th>
                    <th scope="col" className={styles.unlimitedHeading}>Unlimited</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Live Hours / Month</td>
                    <td><span className={styles.tableBadge}>6 Hours</span></td>
                    <td><span className={styles.tableBadgeFeatured}>15 Hours</span></td>
                    <td><span className={styles.tableBadge}>36 Hours</span></td>
                  </tr>
                  <tr>
                    <td>Annual Hours Included</td>
                    <td>72 Hours / year</td>
                    <td>180 Hours / year</td>
                    <td>432 Hours / year</td>
                  </tr>
                  <tr>
                    <td>Primary Coverage</td>
                    <td>1 Weekly Service + Bible Study</td>
                    <td>Multiple Weekly Services + Youth</td>
                    <td>Multiple Campuses + Broadcasts</td>
                  </tr>
                  <tr>
                    <td>Free Trial Available</td>
                    <td><span className={styles.checkIcon}>✅ 30-Day Free Trial</span></td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Spoken Voice Languages (Audio)</td>
                    <td><span className={styles.checkIcon}>✅ 90+ Languages</span></td>
                    <td><span className={styles.checkIcon}>✅ 90+ Languages</span></td>
                    <td><span className={styles.checkIcon}>✅ 90+ Languages</span></td>
                  </tr>
                  <tr>
                    <td>Live Caption Languages (Subtitles)</td>
                    <td><span className={styles.checkIcon}>✅ 180+ Languages</span></td>
                    <td><span className={styles.checkIcon}>✅ 180+ Languages</span></td>
                    <td><span className={styles.checkIcon}>✅ 180+ Languages</span></td>
                  </tr>
                  <tr>
                    <td>In Person &amp; Virtual (WebRTC)</td>
                    <td><span className={styles.checkIcon}>✅ Included</span></td>
                    <td><span className={styles.checkIcon}>✅ Included</span></td>
                    <td><span className={styles.checkIcon}>✅ Included</span></td>
                  </tr>
                  <tr>
                    <td>Output Formats</td>
                    <td>Audio + Live Captions</td>
                    <td>Audio + Captions + Transcripts</td>
                    <td>Audio + Captions + Transcripts</td>
                  </tr>
                  <tr>
                    <td>Customizable Glossaries (Biblical Terms)</td>
                    <td><span className={styles.checkIcon}>✅ Included</span></td>
                    <td><span className={styles.checkIcon}>✅ Included</span></td>
                    <td><span className={styles.checkIcon}>✅ Advanced</span></td>
                  </tr>
                  <tr>
                    <td>Volunteer Onboarding &amp; Support</td>
                    <td><span className={styles.checkIcon}>✅ Included</span></td>
                    <td><span className={styles.checkIcon}>✅ Priority</span></td>
                    <td><span className={styles.checkIcon}>✅ Dedicated AV Specialist</span></td>
                  </tr>
                  <tr>
                    <td>Post-Sermon Transcript Translation</td>
                    <td>—</td>
                    <td><span className={styles.checkIcon}>✅ Included</span></td>
                    <td><span className={styles.checkIcon}>✅ Included</span></td>
                  </tr>
                  <tr>
                    <td>AI Sermon Summaries &amp; Study Notes</td>
                    <td>—</td>
                    <td><span className={styles.checkIcon}>✅ Included</span></td>
                    <td><span className={styles.checkIcon}>✅ Included</span></td>
                  </tr>
                  <tr>
                    <td>Voice Cloning (Pastor Voice Match)</td>
                    <td>—</td>
                    <td>—</td>
                    <td><span className={styles.checkIcon}>✅ Included</span></td>
                  </tr>
                  <tr>
                    <td>Conference &amp; Revival Event Support</td>
                    <td>—</td>
                    <td>—</td>
                    <td><span className={styles.checkIcon}>✅ Included</span></td>
                  </tr>
                  <tr>
                    <td>SSO Access &amp; Multi-Admin Security</td>
                    <td>—</td>
                    <td>Optional add-on</td>
                    <td><span className={styles.checkIcon}>✅ Included</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
