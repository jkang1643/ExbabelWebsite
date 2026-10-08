# Final narrated assembly

1920 × 1080, 30 fps; 123.8 seconds. Entirely HTML/SVG. Narration: ElevenLabs Roger.

The main HTML composition renders each visual scene on track 1. Caption clips use track 5. Narration occupies track 10 from 00:00.000 to the end, including a 300ms lead and a silent end hold. Scene exits use a short upward fade, mapped to actual spoken timing. The outgoing visual fades over the shared pale background; the incoming title resolves with outQuint easing. No generated or recorded visual footage is required.

| Scene | In | Out | Narration | Camera target |
|---|---|---|---|---|
| S01 | 00:00.000 | 00:06.244 | Hey there, just wanted to show you how you can bring multilingual services to your congregation at your church. | Static composition with element entrances |
| S02 | 00:06.244 | 00:10.988 | Picture someone walking into your service this Sunday with their family. | Static composition with element entrances |
| S03 | 00:10.988 | 00:20.166 | They want to be there. They want to hear the sermon. But English isn't their first language, so they're only catching pieces of the message. | Static composition with element entrances |
| S04 | 00:20.166 | 00:24.756 | With Exbabel, they can pull out their phone, scan a QR code, | Service QR code |
| S05 | 00:24.756 | 00:27.700 | choose their language, and start listening. | Translation language selector |
| S06 | 00:27.700 | 00:29.800 | That's pretty much it. | Static composition with element entrances |
| S07 | 00:29.800 | 00:37.289 | Your pastor keeps preaching like normal. Exbabel listens to the service and translates it while they're speaking. | Static composition with element entrances |
| S08 | 00:37.289 | 00:42.756 | The person in the congregation hears the sermon through their headphones in their own language. | Translated audio control |
| S09 | 00:42.756 | 00:46.656 | They can also read translated captions right on their phone. | Translated caption text |
| S10 | 00:46.656 | 00:53.066 | So if you have a Spanish-speaking family visiting your church, you don't have to create another service for them. | Static composition with element entrances |
| S11 | 00:53.066 | 00:59.833 | They can sit with their family, worship with the same congregation, and actually understand what's being said. | Static composition with element entrances |
| S12 | 00:59.833 | 01:07.100 | And you're not limited to Spanish. You can make other languages available depending on the people you're trying to reach. | Static composition with element entrances |
| S13 | 01:07.100 | 01:09.544 | The same thing works online. | Static composition with element entrances |
| S14 | 01:09.544 | 01:15.500 | If you're already livestreaming your services, Exbabel can translate the livestream too. | Start Broadcasting button |
| S15 | 01:15.500 | 01:21.822 | Someone watching from another city or another country can choose their language and follow along. | Remote listener language selector |
| S16 | 01:21.822 | 01:29.522 | We designed it to work with the audio setup churches already use, so your team doesn't have to completely rethink Sunday morning. | Static composition with element entrances |
| S17 | 01:29.522 | 01:35.044 | Connect your audio. Start the translation. Put the QR code on the screen. | Audio configuration → Start Broadcasting button → Share QR code |
| S18 | 01:35.044 | 01:38.622 | Your congregation handles the rest from their phones. | Static composition with element entrances |
| S19 | 01:38.622 | 01:44.200 | If this sounds useful for your church, I'd love for you to actually try it during a service. | Static composition with element entrances |
| S20 | 01:44.200 | 01:48.656 | You can start with a 30-day free trial at Exbabel.com. | Static composition with element entrances |
| S21 | 01:48.656 | 01:55.356 | And if you'd rather have us walk through your setup with you first, you can schedule a quick call with our team. | Static composition with element entrances |
| S22 | 01:55.356 | 02:03.800 | That way, the next person who walks into your church doesn't have to speak the same language as your pastor to understand the message. | Static composition with element entrances |

See production.json for editable scene data, camera-cues.json for source coordinates, narration-timing.json for word alignment, and film.js for deterministic animation. OriginalStartMs/originalEndMs/originalDurationMs preserve the authored motion timing; each scene maps that choreography to the final spoken window.
