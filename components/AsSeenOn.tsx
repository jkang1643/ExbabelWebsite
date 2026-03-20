"use client";

import Image from "next/image";

export default function AsSeenOn() {
    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="layout-spine">
                <p className="text-eyebrow mb-8 text-center text-slate-400">
                    AS SEEN ON
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    {/* Launch Llama Newsletter Badge */}
                    <a
                        href="https://tools.launchllama.co/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-105 duration-300"
                    >
                        <Image
                            src="/badges/llbadge2.png"
                            alt="As seen on Launch Llama Newsletter"
                            width={800}
                            height={200}
                            className="h-auto w-full max-w-[250px] md:max-w-[300px]"
                            priority={false}
                        />
                    </a>

                    {/* ElevenLabs Startup Grants */}
                    <a
                        href="https://elevenlabs.io/startup-grants"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-105 duration-300"
                    >
                        <img 
                            src="https://eleven-public-cdn.elevenlabs.io/payloadcms/pwsc4vchsqt-ElevenLabsGrants.webp" 
                            alt="ElevenLabs" 
                            style={{ width: "250px" }}
                            className="h-auto"
                        />
                    </a>

                    {/* AI for Church Leaders Badge */}
                    <a
                        href="https://aiforchurchleaders.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-105 duration-300"
                    >
                        <Image
                            src="/badges/AI for Church Leadrs.jpg"
                            alt="AI for Church Leaders"
                            width={600}
                            height={200}
                            className="h-auto w-full max-w-[200px] md:max-w-[250px]"
                            priority={false}
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}
