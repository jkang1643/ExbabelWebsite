export type Solution = {
  kind: "events" | "business";
  path: string;
  title: string;
  description: string;
  h1: string;
  h1Accent: string;
  lead: string;
  heroNote: string;
  source: string;
  example: string;
  translated: string;
  language: string;
  intro: { title: string; accent: string; text: string[] };
  benefits: { title: string; text: string; photo: string; alt: string; credit: string; source: string; license: string }[];
  scenarios: { eyebrow: string; title: string; situation: string; approach: string; outcome: string }[];
  workflow: { title: string; lead: string; steps: { title: string; text: string }[] };
  formats: { title: string; lead: string };
  uses: { title: string; lead: string; items: { title: string; text: string }[] };
  caution: { title: string; text: string[] };
  quote: string;
  faqLead: string;
  faqs: { question: string; answer: string }[];
  close: { title: string; accent: string; text: string; prep: string };
};

export const solutions: Record<Solution["kind"], Solution> = {
  events: {
    kind: "events",
    path: "/solutions/events/",
    title: "Live Event Translation & Conference Interpretation | Exbabel",
    description: "Live event translation for conferences, church conferences, panels, and hybrid events. Guests follow translated audio or captions on their own devices.",
    h1: "Live event translation",
    h1Accent: "for every audience",
    lead: "From a conference keynote to a church leadership gathering, help every guest follow the moment with translated audio and live captions on their own device.",
    heroNote: "Share a QR code or link. Guests join in a browser, with no app download.",
    source: "Stage microphone",
    example: "Welcome to the conversation.",
    translated: "Bienvenidos a la conversación.",
    language: "Español",
    intro: {
      title: "One stage.",
      accent: "More ways to take part.",
      text: [
        "Picture the opening keynote: guests have traveled from different countries, the speaker is on stage, and everyone is meant to share the same idea at the same time. If only one language is available, some people miss the point while they work to translate it for themselves.",
        "Exbabel takes a clear live speech feed and makes translated audio and captions available through a browser. Your team hosts the session, places a QR code or link where guests will see it, and lets each person choose an available language. The same path can support a main-stage talk, a moderated panel, a church conference, or a hybrid presentation.",
        "Plan the language experience as part of the run of show. Check your priority language pairs, feed the host computer clean audio, and rehearse names, scripture references, product terms, or industry acronyms with a fluent reviewer before doors open."
      ]
    },
    benefits: [
      { title: "Keynotes people can follow", text: "Give guests an audio or caption path into the central message, even when the stage speaks one language.", photo: "/solutions/photos/event-keynote.jpg", alt: "Audience gathered for a large conference presentation", credit: "2019 Nobel Conference Audience by BLT 152", source: "https://commons.wikimedia.org/w/index.php?curid=121376238", license: "CC BY-SA 4.0" },
      { title: "No receiver handout", text: "Guests use their own phone and headphones, so your team can focus on access and guidance rather than distributing receivers.", photo: "/solutions/photos/event-headphones.jpg", alt: "Person with personal headphones", credit: "Woman Headphones by Burst", source: "https://stocksnap.io/photo/woman-headphones-NOLZXJLYKF", license: "CC0" },
      { title: "Flexible event formats", text: "Use the same language plan for a keynote, a moderated panel, a breakout presentation, or a hybrid session.", photo: "/solutions/photos/event-panel.jpg", alt: "Speakers seated together during a conference panel", credit: "Conference panel by Fabrice Florin", source: "https://commons.wikimedia.org/w/index.php?curid=26966249", license: "CC BY-SA 2.0" },
      { title: "Easy attendee access", text: "Place the joining QR code or link on an entry screen, program, badge insert, or slide and repeat it before each session.", photo: "/solutions/photos/event-access.jpg", alt: "Conference guests at a registration area", credit: "RIC 2015: Registration Session by NRCgov", source: "https://www.flickr.com/photos/69383258@N08/16597753480", license: "CC BY 2.0" }
    ],
    scenarios: [
      { eyebrow: "01 / International conference", title: "The opening keynote reaches the whole room", situation: "A conference draws delegates, speakers, and sponsors from several countries. Everyone is seated for the same headline talk, but the presentation language is familiar to only part of the audience.", approach: "The AV lead sends a clean stage feed to the host computer, tests the selected language channels during rehearsal, and puts the joining QR code on the opening slide and printed program.", outcome: "A guest can choose translated audio or captions in an available language and follow the main message without leaving the auditorium." },
      { eyebrow: "02 / Church leadership conference", title: "Shared teaching across congregations", situation: "Pastors and volunteers from different language communities gather for worship, teaching, and workshops. The message includes names, references, and terms that need special care.", approach: "The team rehearses with representative speakers, checks scripture references and names with fluent reviewers, and keeps a human interpreter for pastoral or highly nuanced moments when needed.", outcome: "Attendees have a clearer path into the teaching while the event remains one shared gathering." },
      { eyebrow: "03 / Hybrid summit", title: "One access path for in-room and remote guests", situation: "A nonprofit summit combines on-stage talks, a panel, and remote participants. The producer needs a repeatable way to introduce language access at each changeover.", approach: "The run of show includes a brief language-access cue, a tested speech feed for each format, and a link shared both on screen and in the remote event chat.", outcome: "Guests can rejoin the language channel as the program moves from keynote to panel, with fewer instructions for the production team to repeat." }
    ],
    workflow: {
      title: "From the stage to the audience.",
      lead: "A simple signal path your AV team can rehearse, cue, and repeat throughout the program.",
      steps: [
        { title: "Connect the speech feed", text: "Route a clean microphone or mixer output to the host computer through a compatible input." },
        { title: "Start the session", text: "Choose source and target languages, then test the signal and representative words." },
        { title: "Share access", text: "Display a QR code or link. Guests join and choose an available language." }
      ]
    },
    formats: { title: "Listen, read, or do both.", lead: "Guests can use translated audio or live captions where their chosen language supports it. Voice and caption coverage differ." },
    uses: {
      title: "Every format has a moment worth sharing.",
      lead: "Build access into the agenda where guests need to understand, respond, or carry a message home.",
      items: [
        { title: "Industry conferences", text: "Give international delegates a way into product launches, research talks, sponsor sessions, and executive keynotes." },
        { title: "Panels", text: "Help guests track speaker changes, questions, and fast discussion when a moderator keeps the conversation moving." },
        { title: "Church conferences", text: "Support multilingual teaching, leadership gatherings, mission events, and shared announcements." },
        { title: "Hybrid and community events", text: "Share the same browser link with people in the room and joining remotely." }
      ]
    },
    caution: {
      title: "Rehearse the moments that matter.",
      text: [
        "AI translation can mishear names, acronyms, accents, and technical terms. Include representative speakers and a fluent reviewer in your rehearsal.",
        "For legal, medical, safety-critical, or highly nuanced content, use a qualified human interpreter or an approved backup where appropriate."
      ]
    },
    quote: "A great event is shared in the room. Understanding should travel with it.",
    faqLead: "Practical answers for planners, producers, and AV teams.",
    faqs: [
      { question: "What is live event translation?", answer: "Live event translation converts a speaker's speech into another language while the event is happening. Exbabel provides translated audio and written captions in supported languages through a browser-based attendee experience." },
      { question: "Do attendees need to download an app?", answer: "No. Attendees use a compatible phone, tablet, or computer with internet access and open the event's QR code or link." },
      { question: "What equipment does an event need?", answer: "The host needs a computer, supported browser, reliable internet connection, and clear speech input. A venue mixer can feed the computer through a compatible audio interface. Test the full signal path before the event." },
      { question: "Is this conference interpretation?", answer: "Exbabel offers AI-translated audio and captions for live conference speech. It differs from a human interpreter in a booth. Use a qualified interpreter when exact nuance or active judgment is essential." },
      { question: "Can guests choose audio or captions?", answer: "Guests can choose available languages and supported output modes. Spoken voice and caption language coverage differ, so confirm your target languages during planning." },
      { question: "How should we prepare for a panel?", answer: "Feed the panel microphones into a clean mixer output, rehearse speaker changes, and test names, accents, and specialist terms with a fluent reviewer." }
    ],
    close: {
      title: "Plan the language experience",
      accent: "before doors open.",
      text: "Bring your event format, venue audio path, expected audience, and priority languages to an Exbabel demo.",
      prep: "Start with the event length, speaker count, audio setup, and languages your guests need."
    }
  },
  business: {
    kind: "business",
    path: "/solutions/business/",
    title: "Business Translation Services for Live Meetings | Exbabel",
    description: "Live business translation for all-hands meetings, training, onboarding, and partner briefings. Teams follow translated audio and captions in a browser.",
    h1: "Business translation",
    h1Accent: "for live meetings",
    lead: "Keep company updates, training, and partner conversations understandable across languages with live translated audio and captions.",
    heroNote: "Start a browser-based session, share a link or code, and let participants choose an available language.",
    source: "Meeting audio",
    example: "Let's move forward together.",
    translated: "Avançons ensemble.",
    language: "Français",
    intro: {
      title: "The work moves faster",
      accent: "when everyone can follow.",
      text: [
        "Think of an all-hands update where a new policy, deadline, or strategy is explained once and acted on by teams in several countries. Colleagues who spend the meeting decoding unfamiliar words have less room to ask questions and connect the decision to their work.",
        "Exbabel offers a browser-based language path for spoken company updates, training, onboarding, and partner briefings. The host sends clear speech from a computer; participants open a shared link or code and choose an available language for translated audio or captions.",
        "Treat language access as part of meeting preparation. Identify the decisions people must understand, test terms and names with fluent colleagues, and follow the live conversation with written takeaways. The technology supports participation; your team still owns clarity and the final record."
      ]
    },
    benefits: [
      { title: "Shared updates", text: "Help colleagues follow leadership announcements and the reasoning behind a change, not only the final slide.", photo: "/solutions/photos/business-updates.jpg", alt: "Small team talking around a work table", credit: "Team Meeting by Startup Stock Photos", source: "https://stocksnap.io/photo/team-meeting-VQXYE2ZEHC", license: "CC0" },
      { title: "Inclusive training", text: "Let learners listen or read in an available language while they watch a demonstration and ask questions.", photo: "/solutions/photos/business-training.jpg", alt: "Presenter leading a professional training workshop", credit: "NAVFAC Pacific Hosted a Building Trust Workshop by NAVFAC", source: "https://commons.wikimedia.org/w/index.php?curid=70013024", license: "CC BY 2.0" },
      { title: "Familiar devices", text: "Participants join through a web browser on a phone, tablet, or computer they already know how to use.", photo: "/solutions/photos/business-devices.jpg", alt: "Person working at a laptop with a phone beside it", credit: "Office Work by Fabian Irsara", source: "https://stocksnap.io/photo/office-work-X4AAF4SU9Q", license: "CC0" },
      { title: "Repeatable setup", text: "Give each host a short routine for the microphone, internet, language choices, and terminology check.", photo: "/solutions/photos/business-setup.jpg", alt: "Controls on a live sound mixing console", credit: "Yamaha M7CL digital live-sound mixing console by beeki", source: "https://commons.wikimedia.org/w/index.php?curid=33437249", license: "CC0" }
    ],
    scenarios: [
      { eyebrow: "01 / Global all-hands", title: "A company update people can act on", situation: "Leadership explains a change to teams in several regions. The audience needs more than a translated headline: they need to follow the context, the questions, and the next steps.", approach: "The host tests the speech feed, shares language access before the meeting starts, and pauses for questions after each major topic. A written recap records the final decisions.", outcome: "Colleagues can follow the live explanation in an available language and leave with the same written action list." },
      { eyebrow: "02 / Multilingual onboarding", title: "New hires can focus on the work", situation: "A trainer is demonstrating a workflow while new employees are learning unfamiliar systems, acronyms, and team names. Translating every sentence mentally competes with watching the demonstration.", approach: "The training team rehearses terminology, provides a glossary and written steps, then offers live audio or captions as the trainer walks through the task.", outcome: "Learners have another way to keep up with the demonstration and can return to the written instructions afterward." },
      { eyebrow: "03 / Partner briefing", title: "Questions stay in the conversation", situation: "A product team is presenting a roadmap to regional partners. Questions arrive quickly and speakers use internal language that may be new to the audience.", approach: "The team agrees on plain-language definitions, tests representative terms, and gives partners a browser link before the presentation. The meeting owner confirms commitments in writing.", outcome: "Partners can track the presentation and ask for clarification while the discussion is still happening." }
    ],
    workflow: {
      title: "One speaker feed. Many listeners.",
      lead: "A practical path for meetings and internal events.",
      steps: [
        { title: "Bring a clear audio input", text: "Use the host computer microphone or a suitable mixer and audio interface." },
        { title: "Choose session languages", text: "Set the source and available target languages; test real meeting terms." },
        { title: "Invite participants", text: "Share a link, QR code, or session code. People join in a browser and choose an output." }
      ]
    },
    formats: { title: "Give teams a way to listen and read.", lead: "Translated audio and live captions offer different ways to follow the same meeting. Confirm supported modes for your priority languages." },
    uses: {
      title: "Make spoken work easier to follow.",
      lead: "Use live translation where people need to understand a change, learn a task, or ask a better question.",
      items: [
        { title: "Company town halls", text: "Translate leadership context, Q&A, and next steps so global teams can follow the full update." },
        { title: "Training and onboarding", text: "Support live demonstrations while learners read or listen in an available language." },
        { title: "Partner briefings", text: "Help regional partners follow a presentation, ask timely questions, and confirm commitments afterward." },
        { title: "On-site and hybrid meetings", text: "Offer the same browser-based language access to colleagues in a room and those joining remotely." }
      ]
    },
    caution: {
      title: "For important decisions, keep people in the loop.",
      text: [
        "AI can mistranscribe names, acronyms, industry terms, and numbers. Rehearse representative speech, check priority languages with fluent colleagues, and confirm decisions in writing.",
        "For confidential or regulated discussions, review your organization's requirements and the current product terms before use. Bring in qualified human language support when precision or judgment is essential."
      ]
    },
    quote: "The best meeting is the one people can participate in, not just attend.",
    faqLead: "Answers for meeting hosts, team leads, and operations teams.",
    faqs: [
      { question: "What does business translation mean here?", answer: "This page covers live translation of spoken business meetings, training, and presentations. Exbabel is not a certified document translation service." },
      { question: "Can participants use their own devices?", answer: "Yes. Participants join in a compatible browser on a phone, tablet, or computer with internet access. No app download is required." },
      { question: "Does it provide audio and captions?", answer: "Exbabel can provide translated audio and live written captions in supported languages. Voice and caption language coverage differ; confirm the modes for your planned session." },
      { question: "Can we use it for remote meetings?", answer: "A host can route a clear meeting speech feed into a computer input. Setup depends on your conferencing tool and audio routing. Test it with participant devices before the meeting." },
      { question: "Is AI translation suitable for sensitive meetings?", answer: "Check your organization's privacy and retention requirements against the current product terms. For legal, medical, safety-critical, or highly nuanced discussions, use qualified human language support where appropriate." },
      { question: "How should we prepare multilingual training?", answer: "Test the microphone and internet connection, identify priority languages, rehearse technical terms and names, and provide written materials for key instructions." }
    ],
    close: {
      title: "Bring your next meeting.",
      accent: "We'll plan the language path.",
      text: "See how Exbabel can support the spoken moments that matter to your team.",
      prep: "Start with meeting format, audio source, participant count, and priority languages."
    }
  }
};
