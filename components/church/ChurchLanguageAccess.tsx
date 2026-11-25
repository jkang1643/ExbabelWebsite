import { Headphones, Waveform } from "@/components/church/ChurchVisuals";
import styles from "@/app/solutions/church-translation/page.module.css";

export default function ChurchLanguageAccess() {
  return (
    <section
      className={styles.outputSection + " " + styles.wrap}
      aria-labelledby="output-title"
    >
      <div className={styles.sectionIntro}>
        <h2 id="output-title">
          Hear the translation.
          <br />
          Keep the words in view.
        </h2>
        <p>
          With unlimited simultaneous languages, attendees can choose among supported
          options in the same live session. Spoken audio and written captions cover
          different languages, so check availability for the output your audience needs.
        </p>
      </div>
      <div className={styles.outputPair}>
        <article className={styles.audioArticle}>
          <div className={styles.audioGraphic} aria-hidden="true">
            <div className={styles.headphoneRing}>
              <Headphones />
            </div>
            <Waveform />
            <span>Speech → Translated voice → Headphones</span>
          </div>
          <div className={styles.outputHeadingRow}>
            <h3>Translated audio</h3>
            <span className={styles.langCountBadge}>🎙️ 90+ Voice Languages</span>
          </div>
          <p>
            Listen while looking toward the speaker. Attendees press play
            and use headphones to hear natural, expressive AI voice translations
            in 90+ supported spoken languages. WebRTC streaming ensures
            low latency so translated audio stays synchronized with the live sermon.
          </p>
        </article>
        <article className={styles.captionsArticle}>
          <div className={styles.captionGraphic}>
            <span>Illustrative caption · Spanish</span>
            <p lang="es">
              Bienvenidos.
              <br />
              Gracias.
            </p>
            <span>Example source: “Welcome. Thank you.”</span>
          </div>
          <div className={styles.outputHeadingRow}>
            <h3>Written captions</h3>
            <span className={styles.langCountBadge}>📝 180+ Caption Languages</span>
          </div>
          <p>
            Read the spoken message in real time on any smartphone, tablet,
            or sanctuary display across 180+ supported languages and regional
            dialects. High-contrast live captions give every visitor immediate,
            word-for-word visual clarity without requiring an app download.
          </p>
        </article>
      </div>
    </section>
  );
}
