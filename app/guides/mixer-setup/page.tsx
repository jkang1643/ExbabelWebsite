"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./mixer-guide.css";

type Setup = "analog" | "usb";
type OSTab = "windows" | "mac";

const paths = {
  analog: {
    name: "Analog mixer",
    description: "Your mixer has an XLR or ¼-inch output, but no computer-facing USB audio output.",
    chain: ["Microphone", "Mixer", "Audio interface", "Computer", "Exbabel"],
    equipment: [
      "A mixer with a main, aux, or matrix output",
      "An audio interface with a line-level input",
      "An XLR cable from the microphone to the mixer",
      "A cable that fits the mixer's output and the interface's line input — often XLR-to-¼-inch TRS",
      "A USB cable from the audio interface to the computer",
    ],
    steps: [
      { title: "Make a speech mix", body: "Send the speaker microphones to a main, aux, or matrix output. Keep music and room noise out of this feed when you can." },
      { title: "Connect mixer to interface", body: "Connect that mixer output to a line-level input on the audio interface. Match the actual connector at each end: an XLR output often needs an XLR-to-¼-inch TRS cable for an interface's line jack." },
      { title: "Connect interface to computer", body: "Connect the interface by USB and install its driver if its manufacturer requires one. Select line input on the interface and set the gain so speech is clear without clipping." },
      { title: "Configure operating system sound input", body: "Open Windows or Mac sound settings, select your audio interface under Input, and speak into the mic to confirm the system's input meter bounces before opening your browser." },
      { title: "Check Exbabel", body: "Choose the interface under Audio Input Device. Watch the input meter before broadcasting. In Audio input setup, choose the channel carrying your mix." },
    ],
  },
  usb: {
    name: "USB mixer",
    description: "Your mixer has a computer-facing USB audio connection or a built-in audio interface.",
    chain: ["Microphone", "USB mixer", "Computer", "Exbabel"],
    equipment: [
      "A mixer that sends audio to a computer over USB",
      "An XLR cable from an XLR microphone to the mixer",
      "A USB cable that fits the mixer's computer-facing port",
      "The mixer's driver or routing software, if required by its manufacturer",
    ],
    steps: [
      { title: "Make a speech mix", body: "Create a main, aux, or matrix mix for translation. Route it to USB send channels 1–2 for the broadest browser compatibility." },
      { title: "Connect mixer to computer", body: "Use the mixer's computer-facing USB audio port. A USB port meant only for storage or playback will not become a microphone input in the browser." },
      { title: "Configure operating system sound input", body: "Open Windows or Mac sound settings, select your mixer under Input, and speak into the mic to confirm the system's input meter bounces before opening your browser." },
      { title: "Check Exbabel", body: "Choose the mixer under Audio Input Device. Watch the input meter before broadcasting. If Exbabel shows multiple channels, select the one or pair carrying your mix." },
    ],
  },
} as const;

export default function MixerSetupGuide() {
  const [setup, setSetup] = useState<Setup>("analog");
  const [completed, setCompleted] = useState<string[]>([]);
  const [channelCount, setChannelCount] = useState<2 | 32 | 64>(32);
  const [browserChannels, setBrowserChannels] = useState<2 | 32 | 64>(2);
  const [osTab, setOsTab] = useState<OSTab>("windows");

  const guide = paths[setup];
  const done = guide.steps.filter((_, index) => completed.includes(`${setup}-${index}`)).length;

  function toggleStep(index: number) {
    const key = `${setup}-${index}`;
    setCompleted(current => current.includes(key) ? current.filter(item => item !== key) : [...current, key]);
  }

  return (
    <main className="min-h-screen bg-base-paper pt-28 pb-20 text-base-ink">
      <div className="layout-spine mx-auto max-w-6xl px-6">
        <Link href="/guides" className="mb-10 inline-block text-sm font-medium text-primary hover:underline">← All guides</Link>

        <header className="grid gap-10 pb-14 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <h1 className="max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">Connect your mixer to Exbabel</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-base-muted">
              Follow the signal from your microphone to the broadcast. Choose your mixer type below to see the right cable, interface, operating system setup, and channel routing.
            </p>
          </div>
          <div className="bg-base-ink p-7 text-base-white" aria-label="Audio signal path">
            <p className="mb-5 text-sm font-semibold">Your signal path</p>
            <ol className="flex flex-wrap items-center gap-2 text-base font-medium">
              {guide.chain.map((item, index) => (
                <li key={item} className="flex items-center gap-2">
                  <span className={index === guide.chain.length - 1 ? "text-aurora-mint" : ""}>{item}</span>
                  {index < guide.chain.length - 1 && <span aria-hidden="true" className="text-base-white/50">→</span>}
                </li>
              ))}
            </ol>
          </div>
        </header>

        <nav aria-label="On this page" className="mb-8 flex flex-wrap gap-x-5 gap-y-2 border-y border-base-ink/15 py-4 text-sm font-semibold text-primary">
          <a href="#choose-setup">Choose a path</a>
          <a href="#diagram">Wiring diagram</a>
          <a href="#equipment-heading">Equipment</a>
          <a href="#interfaces">Interfaces</a>
          <a href="#connection-heading">Setup checklist</a>
          <a href="#computer-settings">Windows & Mac setup</a>
          <a href="#routing">32/64 channels</a>
          <a href="#troubleshooting">Troubleshooting</a>
        </nav>

        <section aria-labelledby="choose-setup" className="py-10">
          <h2 id="choose-setup" className="mb-5 text-3xl font-bold">Which mixer do you have?</h2>
          <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Mixer connection type">
            {(Object.keys(paths) as Setup[]).map(option => (
              <button
                key={option}
                type="button"
                aria-pressed={setup === option}
                onClick={() => setSetup(option)}
                className={`min-h-32 p-6 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${setup === option ? "bg-primary text-white" : "bg-base-white hover:bg-base-100"}`}
              >
                <span className="block text-xl font-bold">{paths[option].name}</span>
                <span className={`mt-2 block leading-relaxed ${setup === option ? "text-white/90" : "text-base-muted"}`}>{paths[option].description}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="diagram" className="py-12" aria-labelledby="diagram-heading">
          <div className="mb-7 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-primary">Connection map</p>
            <h2 id="diagram-heading" className="mt-3 text-3xl font-bold md:text-4xl">Follow the audio, one connection at a time</h2>
            <p className="mt-4 leading-relaxed text-base-muted">The mixer&apos;s output becomes the input Exbabel listens to. The connection between the mixer and computer changes with the mixer type you selected.</p>
          </div>
          <div className="overflow-x-auto bg-base-ink p-5 text-base-white md:p-10">
            <div className="mixer-flow mx-auto flex min-w-[680px] items-center justify-between gap-2" aria-label={`${guide.chain.join(' to ')}`}>
              {guide.chain.map((item, index) => (
                <div key={item} className="flex flex-1 items-center gap-2">
                  <div className={`flex min-h-28 flex-1 flex-col items-center justify-center border p-3 text-center ${index === guide.chain.length - 1 ? 'border-aurora-mint bg-aurora-mint/15' : 'border-white/30 bg-white/5'}`}>
                    <span className="mb-2 text-2xl" aria-hidden="true">
                      {({Microphone:'🎙',Mixer:'🎚', 'USB mixer':'🎚','Audio interface':'🎛',Computer:'💻',Exbabel:'◎'} as Record<string,string>)[item]}
                    </span>
                    <span className="font-bold">{item}</span>
                  </div>
                  {index < guide.chain.length - 1 && <span className="mixer-flow-arrow shrink-0 text-2xl text-aurora-mint" aria-hidden="true">→</span>}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 border-t border-white/20 pt-5 text-sm text-white/80 md:grid-cols-3">
              <p><strong className="text-white">Mic → mixer:</strong> balanced XLR microphone cable.</p>
              <p><strong className="text-white">Mixer → {setup === 'analog' ? 'interface' : 'computer'}:</strong> {setup === 'analog' ? 'line-level cable matched to both sockets.' : 'computer-facing USB audio cable.'}</p>
              <p><strong className="text-white">Computer → Exbabel:</strong> select the interface in sound settings and verify the live input meter.</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-base-muted">The moving arrows illustrate signal direction. Actual connectors vary by mixer model.</p>
        </section>

        <section className="grid gap-10 py-12 md:grid-cols-[0.8fr_1.2fr]" aria-labelledby="equipment-heading">
          <div>
            <h2 id="equipment-heading" className="text-3xl font-bold">What you need</h2>
            <p className="mt-4 leading-relaxed text-base-muted">
              {setup === "analog"
                ? "An analog mixer needs an external audio interface to turn its output into a computer input. The XLR cable connects the microphone to the mixer; the mixer-to-interface cable must match the line input."
                : "A USB mixer already includes the computer audio interface. The XLR cable connects an XLR microphone to the mixer, while USB carries the mix to the computer."}
            </p>
          </div>
          <ul className="space-y-3 bg-base-white p-6 md:p-9">
            {guide.equipment.map(item => (
              <li key={item} className="flex gap-3 leading-relaxed"><span aria-hidden="true" className="text-primary">●</span><span>{item}</span></li>
            ))}
          </ul>
        </section>

        <section className="py-14" aria-labelledby="photos-heading">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-primary">See the hardware</p>
          <h2 id="photos-heading" className="mt-3 text-3xl font-bold md:text-4xl">Recognize the pieces before you plug them in</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {src:"/images/guides/mixer/digico-quantum-852-digital-mixing-console-20250726120254.jpg",alt:"Large digital audio mixing console with faders and channel displays",title:"The mixer",description:"A large console can create a dedicated speech bus. Find the bus output or USB send patch before choosing a cable.",credit:"TurnOnTheNight · CC BY-SA 4.0",source:"https://commons.wikimedia.org/wiki/File:DiGiCo_Quantum_852_Digital_Mixing_Console_20250726120254.jpg"},
              {src:"/images/guides/mixer/xlr-stecker-makro.jpg",alt:"Close view of a three-pin XLR audio connector",title:"The XLR connector",description:"A microphone normally reaches the mixer by XLR. Match male and female ends and check whether the destination expects mic or line level.",credit:"RobertKuhlmann · CC BY-SA 3.0",source:"https://commons.wikimedia.org/wiki/File:XLR-Stecker_Makro.jpg"},
              {src:"/images/guides/mixer/focusrite-scarlett-2i2-2i4-6i6-usb2-0.jpg",alt:"Older Focusrite Scarlett USB audio interfaces with front-panel controls",title:"The audio interface",description:"An interface converts an analog mixer feed into a USB computer input. Photo shows earlier Scarlett models; connector placement differs on the recommended 4th Gen 2i2.",credit:"Matt Vanacoro · CC BY 2.0",source:"https://commons.wikimedia.org/wiki/File:Focusrite_Scarlett_2i2,_2i4,_6i6_USB2.0_Audio_Interfaces_with_Focusrite_Mic_Preamps_-_2014_NAMM_Show_(by_Matt_Vanacoro).jpg"},
            ].map(photo => (
              <figure key={photo.title} className="overflow-hidden bg-base-white">
                <Image src={photo.src} alt={photo.alt} width={1280} height={853} className="aspect-[4/3] w-full object-cover"/>
                <figcaption className="p-5">
                  <h3 className="text-xl font-bold">{photo.title}</h3>
                  <p className="mt-2 leading-relaxed text-base-muted">{photo.description}</p>
                  <a className="mt-3 inline-block text-xs text-primary underline" href={photo.source} target="_blank" rel="noopener noreferrer">Photo: {photo.credit} ↗</a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="py-14" aria-labelledby="cables-heading">
          <h2 id="cables-heading" className="text-3xl font-bold">Choose the right cable for each hop</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-base-muted">Read the labels beside the sockets. An XLR-shaped socket does not automatically mean it accepts a mixer&apos;s line-level signal. If you have a Scarlett 2i2 fourth generation, its front ¼-inch jacks are the line inputs and its rear XLR sockets are microphone inputs.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {mark:"XLR → XLR",title:"Microphone to mixer",text:"Use a balanced XLR microphone cable from the speaker's microphone to a mixer mic input. Turn on phantom power only if that microphone requires it."},
              {mark:"XLR → ¼″ TRS",title:"Mixer to line input",text:"A common match for a mixer's balanced XLR output and an interface's ¼-inch line jack. Check the mixer's output wiring and your interface manual."},
              {mark:"¼″ TRS → ¼″ TRS",title:"Line output to line input",text:"Use this when both the mixer output and interface input are balanced ¼-inch line connectors. For stereo, you normally need two cables and two inputs."},
            ].map(cable => (
              <article key={cable.title} className="border border-base-ink/15 bg-base-white p-6">
                <div className="mb-5 flex h-16 items-center justify-center rounded-full border-2 border-dashed border-primary/40 bg-primary/5 font-mono text-xl font-bold text-primary">{cable.mark}</div>
                <h3 className="text-xl font-bold">{cable.title}</h3>
                <p className="mt-3 leading-relaxed text-base-muted">{cable.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 border-l-4 border-primary bg-primary/5 p-5">
            <strong>Important:</strong> Leave 48V phantom power off on an interface channel receiving a mixer output. Start with the interface gain low, then raise it while watching the meter. Consult both equipment manuals before connecting unfamiliar outputs.
          </div>
        </section>

        <section id="interfaces" className="py-16" aria-labelledby="interfaces-heading">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-primary">Buying guide</p>
          <h2 id="interfaces-heading" className="mt-3 text-3xl font-bold md:text-4xl">Audio interfaces that fit a mixer feed</h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-base-muted">For a single mono speech feed, one line input is enough. For a stereo feed, choose two line inputs. These are practical examples with manufacturer-documented line inputs, not a promise that any interface solves every mixer or browser routing issue. Amazon buttons open current search results so you can check the seller, exact generation, included cable, return terms, and current price.</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              {tag:"Best all-round fit",name:"Focusrite Scarlett 2i2 · 4th Gen",fit:"Two front ¼-inch line inputs suit a mono or stereo mixer feed. It is compact and connects to the computer by USB-C.",watch:"Use the front line jacks for mixer line outputs; the rear XLR sockets are mic inputs.",maker:"https://focusrite.com/products/scarlett-2i2",amazon:"https://www.amazon.com/s?k=Focusrite+Scarlett+2i2+4th+Generation"},
              {tag:"Best visible metering",name:"MOTU M2",fit:"Two combo inputs accept line-level signals, and the front-panel LCD meters make it easy to see audio before opening the browser.",watch:"Set each input for line level according to the M Series guide and watch for clipping.",maker:"https://cdn-data.motu.com/manuals/usb-c-audio/M_Series_User_Guide.pdf",amazon:"https://www.amazon.com/s?k=MOTU+M2+audio+interface"},
              {tag:"Lower-cost option",name:"Behringer UMC202HD",fit:"Two combination mic/line inputs give you a basic two-channel path from an analog mixer to USB.",watch:"Check the exact listing and local driver guidance for your computer.",maker:"https://www.behringer.com/en/products/0805-AAR",amazon:"https://www.amazon.com/s?k=Behringer+UMC202HD+audio+interface"},
            ].map(product => (
              <article key={product.name} className="flex flex-col bg-base-white p-7 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-[.16em] text-primary">{product.tag}</span>
                <h3 className="mt-3 text-2xl font-bold">{product.name}</h3>
                <p className="mt-4 leading-relaxed text-base-muted">{product.fit}</p>
                <p className="mt-4 border-l-2 border-primary pl-4 text-sm leading-relaxed"><strong>Check:</strong> {product.watch}</p>
                <div className="mt-auto flex flex-wrap gap-3 pt-7 text-sm font-semibold">
                  <a href={product.amazon} target="_blank" rel="noopener noreferrer" className="bg-primary px-4 py-3 text-white hover:opacity-90">Find on Amazon ↗</a>
                  <a href={product.maker} target="_blank" rel="noopener noreferrer" className="border border-primary px-4 py-3 text-primary hover:bg-primary/5">Read specs ↗</a>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-base-muted">Already have a USB mixer? Try its built-in USB interface first. An extra interface adds another cable and conversion stage without necessarily exposing more browser channels.</p>
        </section>

        {/* ── Section: Checklist ── */}
        <section className="py-14" aria-labelledby="connection-heading">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="connection-heading" className="text-3xl font-bold">Connect and check</h2>
              <p className="mt-3 text-base-muted">Mark each step as you finish it. Your progress stays on this page while it is open.</p>
            </div>
            <p className="font-semibold text-primary" aria-live="polite">{done} of {guide.steps.length} complete</p>
          </div>
          <ol className="grid gap-3 md:grid-cols-2">
            {guide.steps.map((step, index) => {
              const checked = completed.includes(`${setup}-${index}`);
              return (
                <li key={`${setup}-${step.title}`} className={`p-6 md:p-8 ${checked ? "bg-aurora-mint/20" : "bg-base-white"}`}>
                  <label className="flex cursor-pointer items-start gap-4">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleStep(index)}
                      className="mt-1 h-5 w-5 shrink-0 accent-primary"
                    />
                    <span>
                      <span className="block text-xl font-bold">{step.title}</span>
                      <span className="mt-3 block leading-relaxed text-base-muted">{step.body}</span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ol>
          {done === guide.steps.length && (
            <p role="status" className="mt-5 bg-aurora-mint/30 p-5 font-semibold">Your path is connected. Confirm the Exbabel input meter moves before you start broadcasting.</p>
          )}
        </section>

        {/* ── Section: Windows & Mac Sound Settings Step (NEW) ── */}
        <section id="computer-settings" className="py-16" aria-labelledby="os-settings-heading">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-primary">Operating system setup</p>
            <h2 id="os-settings-heading" className="mt-3 text-3xl font-bold md:text-4xl">
              Select your audio interface in Windows or Mac settings
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-base-muted">
              Before opening Exbabel in Chrome or Edge, make sure your operating system recognizes the audio interface or USB mixer as its active microphone input and verifies sound is coming through. This isolates physical cable and gain issues before you ever enter the browser.
            </p>
          </div>

          {/* OS Switcher Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-base-ink/15 pb-4" role="tablist" aria-label="Operating system selection">
            <button
              type="button"
              role="tab"
              aria-selected={osTab === "windows"}
              aria-controls="windows-tab-content"
              onClick={() => setOsTab("windows")}
              className={`flex items-center gap-2.5 px-6 py-3 text-base font-bold transition-all ${
                osTab === "windows"
                  ? "bg-base-ink text-base-white shadow-sm"
                  : "bg-base-white text-base-muted hover:bg-base-100 hover:text-base-ink"
              }`}
            >
              <span className="text-lg" aria-hidden="true">⊞</span>
              Windows 11 / 10 Setup
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={osTab === "mac"}
              aria-controls="mac-tab-content"
              onClick={() => setOsTab("mac")}
              className={`flex items-center gap-2.5 px-6 py-3 text-base font-bold transition-all ${
                osTab === "mac"
                  ? "bg-base-ink text-base-white shadow-sm"
                  : "bg-base-white text-base-muted hover:bg-base-100 hover:text-base-ink"
              }`}
            >
              <span className="text-lg" aria-hidden="true"></span>
              macOS (Sonoma, Sequoia & Ventura)
            </button>
          </div>

          {/* Windows Content */}
          {osTab === "windows" && (
            <div id="windows-tab-content" role="tabpanel" className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
              {/* Screenshot Figure */}
              <figure className="overflow-hidden bg-base-white border border-base-ink/10 shadow-sm">
                <div className="relative">
                  <Image
                    src="/images/guides/mixer/windows-sound-input-settings.jpg"
                    alt="Windows 11 Settings window showing System > Sound with Focusrite Scarlett 2i2 USB selected under Input and active blue test microphone input level meter"
                    width={1280}
                    height={720}
                    className="w-full object-cover"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-base-ink/90 text-white text-xs font-semibold px-2.5 py-1 rounded backdrop-blur-sm">
                    Windows 11 Sound Settings
                  </div>
                </div>
                <figcaption className="p-5 text-sm leading-relaxed text-base-muted border-t border-base-ink/10">
                  <strong className="text-base-ink">Windows 11:</strong> Select your audio interface or USB mixer under <span className="font-semibold text-base-ink">Input → Choose a device for speaking or recording</span>. As someone speaks into the pulpit mic, the blue <span className="font-semibold text-base-ink">Test your microphone</span> meter will jump.
                </figcaption>
              </figure>

              {/* Step-by-Step Instructions */}
              <div className="space-y-4">
                <div className="bg-base-white p-6 border-l-4 border-primary">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 1</span>
                  <h3 className="text-lg font-bold mt-1">Open Sound Settings</h3>
                  <p className="mt-2 text-sm text-base-muted leading-relaxed">
                    Press <kbd className="px-2 py-0.5 bg-base-100 border border-base-ink/20 rounded font-mono text-xs font-semibold">Win + I</kbd> on your keyboard to open Windows Settings, then navigate to <strong className="text-base-ink">System → Sound</strong>. Alternatively, right-click the speaker icon in the bottom-right taskbar and select <em>Sound settings</em>.
                  </p>
                </div>

                <div className="bg-base-white p-6 border-l-4 border-primary">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 2</span>
                  <h3 className="text-lg font-bold mt-1">Select your Audio Interface or USB Mixer</h3>
                  <p className="mt-2 text-sm text-base-muted leading-relaxed">
                    Scroll down to the <strong className="text-base-ink">Input</strong> section. Under <em>Choose a device for speaking or recording</em>, select your connected interface (e.g., <span className="font-semibold text-base-ink">Focusrite Scarlett 2i2 USB</span>, <span className="font-semibold text-base-ink">Line (Behringer UMC)</span>, or your console&apos;s <span className="font-semibold text-base-ink">USB Audio</span> driver).
                  </p>
                </div>

                <div className="bg-base-white p-6 border-l-4 border-primary">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 3</span>
                  <h3 className="text-lg font-bold mt-1">Test the microphone input meter</h3>
                  <p className="mt-2 text-sm text-base-muted leading-relaxed">
                    Speak into the presenter microphone at normal speaking volume. Watch the <strong className="text-base-ink">Test your microphone</strong> input level bar. The blue indicator should comfortably bounce up to 70–85%. If the meter stays dark or silent, turn up the gain knob on the interface or verify the mixer aux send fader.
                  </p>
                </div>

                <div className="bg-base-white p-6 border-l-4 border-primary">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 4</span>
                  <h3 className="text-lg font-bold mt-1">Verify Windows Microphone Permissions</h3>
                  <p className="mt-2 text-sm text-base-muted leading-relaxed">
                    In Windows Settings, go to <strong className="text-base-ink">Privacy & security → Microphone</strong>. Verify that <em>Microphone access</em> is switched <strong>On</strong>, and that <em>Let desktop apps access your microphone</em> (including Google Chrome and Microsoft Edge) is allowed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mac Content */}
          {osTab === "mac" && (
            <div id="mac-tab-content" role="tabpanel" className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
              {/* Screenshot Figure */}
              <figure className="overflow-hidden bg-base-white border border-base-ink/10 shadow-sm">
                <div className="relative">
                  <Image
                    src="/images/guides/mixer/mac-sound-input-settings.jpg"
                    alt="macOS System Settings Sound page showing Focusrite Scarlett 2i2 USB selected in the Input device table and active green Input level meter"
                    width={1280}
                    height={720}
                    className="w-full object-cover"
                    priority
                  />
                  <div className="absolute top-3 left-3 bg-base-ink/90 text-white text-xs font-semibold px-2.5 py-1 rounded backdrop-blur-sm">
                    macOS System Settings · Sound
                  </div>
                </div>
                <figcaption className="p-5 text-sm leading-relaxed text-base-muted border-t border-base-ink/10">
                  <strong className="text-base-ink">macOS:</strong> In <span className="font-semibold text-base-ink">System Settings → Sound → Input</span>, select your audio interface. As the speaker preaches, the green <span className="font-semibold text-base-ink">Input level</span> dot meter will animate live to confirm clear audio reception.
                </figcaption>
              </figure>

              {/* Step-by-Step Instructions */}
              <div className="space-y-4">
                <div className="bg-base-white p-6 border-l-4 border-primary">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 1</span>
                  <h3 className="text-lg font-bold mt-1">Open System Settings</h3>
                  <p className="mt-2 text-sm text-base-muted leading-relaxed">
                    Click the <strong className="text-base-ink">Apple menu ()</strong> in the top-left corner of your Mac display and choose <strong className="text-base-ink">System Settings</strong> (or <em>System Preferences</em> on macOS Monterey and earlier). In the left sidebar, click <strong className="text-base-ink">Sound</strong>.
                  </p>
                </div>

                <div className="bg-base-white p-6 border-l-4 border-primary">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 2</span>
                  <h3 className="text-lg font-bold mt-1">Select the &quot;Input&quot; Tab &amp; Choose Your Device</h3>
                  <p className="mt-2 text-sm text-base-muted leading-relaxed">
                    In the main Sound panel, click the <strong className="text-base-ink">Input</strong> tab. In the device table under <em>Choose a device for sound input</em>, click on your audio interface or USB mixer (e.g., <span className="font-semibold text-base-ink">Focusrite Scarlett 2i2 USB</span>, <span className="font-semibold text-base-ink">USB Audio CODEC</span>, or <span className="font-semibold text-base-ink">X32 / M32 USB</span>).
                  </p>
                </div>

                <div className="bg-base-white p-6 border-l-4 border-primary">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 3</span>
                  <h3 className="text-lg font-bold mt-1">Speak into the mic & check the Input Level meter</h3>
                  <p className="mt-2 text-sm text-base-muted leading-relaxed">
                    Have someone speak into the microphone at normal speaking level. Watch the green LED <strong className="text-base-ink">Input level</strong> meter directly beneath the volume slider. The green bars should light up across 60–80% of the meter. Adjust the <span className="font-semibold text-base-ink">Input volume</span> slider if needed.
                  </p>
                </div>

                <div className="bg-base-white p-6 border-l-4 border-primary">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Step 4</span>
                  <h3 className="text-lg font-bold mt-1">Verify Mac Privacy & Security Permissions</h3>
                  <p className="mt-2 text-sm text-base-muted leading-relaxed">
                    In the left sidebar, go to <strong className="text-base-ink">Privacy & Security → Microphone</strong>. Verify that your browser (<span className="font-semibold text-base-ink">Google Chrome</span>, <span className="font-semibold text-base-ink">Safari</span>, or <span className="font-semibold text-base-ink">Microsoft Edge</span>) has its toggle switched <strong>On</strong> so Exbabel can read the input.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Troubleshooting Tip Callout */}
          <div className="mt-8 bg-base-white p-6 border border-base-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-base text-base-ink">Signal not moving on the operating system meter?</p>
              <p className="mt-1 text-sm text-base-muted leading-relaxed">
                Check that your audio interface gain knob is turned up until its LED ring turns green when speaking. If using an analog mixer, ensure the aux or matrix master fader is raised and unmuted.
              </p>
            </div>
            <a
              href="#troubleshooting"
              className="shrink-0 px-4 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white font-semibold text-xs transition-colors rounded"
            >
              View Full Troubleshooting ↓
            </a>
          </div>
        </section>

        {/* ── Section: Routing ── */}
        <section id="routing" className="py-16" aria-labelledby="routing-heading">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-primary">Large USB mixers</p>
          <h2 id="routing-heading" className="mt-3 text-3xl font-bold md:text-4xl">What happens with 32 or 64 channels?</h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-base-muted">A mixer may have 32 or 64 physical or USB channels, yet a browser can expose fewer to a web app. Exbabel can only select and meter the channels the browser supplies. The most reliable shared starting point is to route your speech mix to the mixer&apos;s USB sends 1–2, then confirm the input meter moves before broadcasting.</p>
          <div className="mt-8 grid gap-6 bg-base-white p-6 md:grid-cols-2 md:p-10">
            <div>
              <label htmlFor="mixer-channels" className="block font-bold">Mixer USB output channels</label>
              <select id="mixer-channels" value={channelCount} onChange={e => setChannelCount(Number(e.target.value) as 2 | 32 | 64)} className="mt-3 w-full border border-base-ink/20 bg-white p-3">
                <option value={2}>2 channels</option>
                <option value={32}>32 channels</option>
                <option value={64}>64 channels</option>
              </select>
              <label htmlFor="browser-channels" className="mt-6 block font-bold">Channels visible in Exbabel</label>
              <select id="browser-channels" value={browserChannels} onChange={e => setBrowserChannels(Number(e.target.value) as 2 | 32 | 64)} className="mt-3 w-full border border-base-ink/20 bg-white p-3">
                <option value={2}>2 channels</option>
                <option value={32}>32 channels</option>
                <option value={64}>64 channels</option>
              </select>
            </div>
            <div className="bg-base-ink p-6 text-base-white" aria-live="polite">
              <p className="text-sm font-bold uppercase tracking-[.16em] text-aurora-mint">Routing result</p>
              <p className="mt-4 text-xl font-bold">{browserChannels < channelCount ? `Your browser sees ${browserChannels} of ${channelCount} channels.` : `Your browser can see up to ${channelCount} channels in this example.`}</p>
              <p className="mt-4 leading-relaxed text-white/80">{browserChannels < channelCount ? "Send the speech mix to USB channels 1–2 at the mixer. A signal present only on a higher USB send will not appear in this browser input." : "Open Audio input setup in Exbabel, play a test signal, and select the responding channel or pair. Keeping a copy on 1–2 is a useful fallback."}</p>
            </div>
          </div>
          <ol className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              "Choose a dedicated aux or matrix bus for speech so the translation feed does not follow house speaker changes.",
              "Patch that bus to USB send 1, or to USB sends 1–2 for a stereo mix, using the mixer's routing screen or control app.",
              "Confirm the computer's input meter and Exbabel's meter move; open Audio input setup to select the responding channel before broadcast."
            ].map((step,index)=>(
              <li key={step} className="border-t-4 border-primary bg-base-white p-5">
                <span className="text-sm font-bold text-primary">0{index+1}</span>
                <p className="mt-2 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-base-muted">Channel counts are illustrative. What a specific browser exposes depends on the browser, operating system, driver, and device. The app cannot detect every mixer&apos;s physical channel count from its USB name.</p>
        </section>

        {/* ── Section: Troubleshooting ── */}
        <section id="troubleshooting" className="py-16" aria-labelledby="trouble-heading">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-primary">If the meter is silent</p>
          <h2 id="trouble-heading" className="mt-3 text-3xl font-bold md:text-4xl">Find the missing link</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-base-muted">Work from the microphone toward Exbabel. Stop at the first meter that does not move.</p>
          <div className="mt-8 space-y-3">
            {[
              ["1. Mixer channel meter is silent","Check the mic cable, channel mute, gain, and whether a condenser mic needs phantom power at the mixer."],
              ["2. Mixer channel moves, output bus does not","Check aux or matrix send level, pre/post fader choice, bus mute, and output patch."],
              ["3. Output moves, interface input is silent","Match line-level sockets and cables. Verify input mode, gain, power, and that the interface is connected directly by a short USB cable."],
              ["4. Computer input moves, Exbabel does not","Allow microphone permission in Windows or macOS Privacy settings, choose the exact device in Exbabel, inspect the Audio input setup channel selection, and reload after connecting the device."],
              ["5. Signal cuts out or sounds distorted","Lower mixer/interface levels if clipping. Try a short known-good USB cable and direct computer port; close software that has taken exclusive control of the device."],
            ].map(([title,body])=>(
              <details key={title} className="group bg-base-white p-5 open:pb-6">
                <summary className="cursor-pointer text-lg font-bold marker:text-primary">{title}</summary>
                <p className="mt-4 max-w-4xl leading-relaxed text-base-muted">{body}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="grid gap-10 bg-base-ink px-6 py-12 text-base-white md:grid-cols-2 md:px-12" aria-labelledby="safety-heading">
          <div>
            <h2 id="safety-heading" className="text-3xl font-bold">Before you turn up the gain</h2>
            <p className="mt-4 leading-relaxed text-base-white/80">A mixer output is normally line level. Connect it to an interface input rated for line level, not an XLR microphone preamp unless that input explicitly supports line level. Leave 48V phantom power off for a mixer output.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">If a 32 or 64 channel mixer shows only two channels</h3>
            <p className="mt-4 leading-relaxed text-base-white/80">That is what the browser currently receives. Route the speech mix to USB channels 1–2 in the mixer or its driver software. If more channels appear in Exbabel, open Audio input setup and select the channel or pair carrying the mix.</p>
          </div>
        </section>

        <section className="py-16" aria-labelledby="questions-heading">
          <h2 id="questions-heading" className="mb-6 text-3xl font-bold">Common questions</h2>
          <div className="space-y-3">
            <details className="bg-base-white p-5 open:pb-6"><summary className="cursor-pointer font-semibold">Do I always need a separate audio interface?</summary><p className="mt-4 max-w-3xl leading-relaxed text-base-muted">No. A mixer that sends audio to your computer over USB already acts as an interface. An analog mixer needs an external interface or another computer audio input.</p></details>
            <details className="bg-base-white p-5 open:pb-6"><summary className="cursor-pointer font-semibold">Which XLR cable should I buy?</summary><p className="mt-4 max-w-3xl leading-relaxed text-base-muted">Use a standard XLR microphone cable for an XLR microphone going into the mixer. For a mixer&apos;s XLR output, check the interface&apos;s line-input connector: many need XLR-to-¼-inch TRS, while others accept line level on XLR. Match the labels and the equipment manuals.</p></details>
            <details className="bg-base-white p-5 open:pb-6"><summary className="cursor-pointer font-semibold">The mixer is listed, but the meter does not move. What next?</summary><p className="mt-4 max-w-3xl leading-relaxed text-base-muted">Check the mixer&apos;s USB send or aux routing, the operating system input meter (see Windows & Mac setup above), and Exbabel&apos;s selected input. Send a test signal to the intended channel and open Audio input setup to see which browser-visible channel responds.</p></details>
          </div>
        </section>

        <footer className="pb-8 text-sm text-base-muted">
          <p>Hardware guidance: <a className="underline" href="https://support.focusrite.com/hc/en-gb/articles/207546295-What-can-I-connect-to-the-XLR-Input-on-my-Interface">Focusrite XLR and line input guidance</a> · <a className="underline" href="https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings/channelCount">Browser channel count reference</a></p>
          <Link href="/guides" className="mt-8 inline-block font-semibold text-primary hover:underline">Return to all guides →</Link>
        </footer>
      </div>
    </main>
  );
}
