"use client";

import Image from "next/image";
import { churchPricingPlans } from "@/components/church/churchPricingPlans";
import Link from "next/link";
import styles from "@/app/solutions/church-translation/page.module.css";
import { capturePostHogEvent } from "@/lib/posthog-client";

export default function Pricing({ surface = "church" }: { surface?: "church" | "pricing" }) {
  const Title = surface === "pricing" ? "h1" : "h2";
  return (
    <section
      className={styles.planningBand}
      aria-labelledby="pricing-title"
    >
      <div className={styles.wrap}>
        <div className={styles.planningContainer}>
          <div className={styles.planningHeader}>
            <Title id="pricing-title">
              Church &amp; House of Worship Packages
            </Title>
            <p className={styles.planningIntro}>
              Flexible packages designed to cover 12 months of Exbabel usage across a wide range of services, meetings, and campus types.
              You can expand your package at any time during the year as your multilingual congregation grows. Volume discounts apply to all packages.
            </p>
          </div>

          {/* Full-width 3-column pricing cards */}
          <ul className={styles.pricingCards} aria-label="Exbabel packages for churches">
            {churchPricingPlans.map((plan, index) => (
              <li key={plan.id} className={`${styles.pricingCard}${plan.highlighted ? ` ${styles.pricingCardFeatured}` : ""}`} data-plan={plan.id}>
                {plan.highlighted && <span className={styles.planBadge}>Most popular</span>}
                <h3 className={styles.planName}>
                  <Image className={styles.planArt} src={plan.art} alt="" width={80} height={58} />
                  <span><small>{index + 1} — PLAN</small>{plan.name}</span>
                </h3>
                <strong className={styles.planPrice}>${plan.monthlyPrice}<span>/mo</span></strong>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#394dfe", marginBottom: "8px" }}>
                  {plan.hours} Hours / Month <span style={{ color: "#667085", fontWeight: "normal" }}>(~{plan.annualHours} hrs/yr)</span>
                </div>
                <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#475467", fontWeight: "600", margin: "12px 0 6px" }}>
                  Sample Meeting Types:
                </div>
                <ul className={styles.planFeatures}>
                  {plan.features.map((feature, featureIndex) => <li key={featureIndex}>{feature}</li>)}
                </ul>
                <Link prefetch={false} href={plan.checkout}
                  onClick={() => capturePostHogEvent("checkout_started", { plan_name: plan.id, billing_interval: "monthly", is_recommended: plan.highlighted })}
                  className={styles.planCta}>
                  {plan.cta}
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.pricingNote}>
            Additional usage billed at $10/hour per language. 30-day free trial available on Starter plan.{" "}
            {surface === "church" && <Link prefetch={false} href="/pricing/">Full pricing details ↗</Link>}
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
