"use client";

import Image from "next/image";

export default function AsSeenOn() {
    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="layout-spine">
                <p className="text-eyebrow mb-8 text-center text-slate-400">
                    AS SEEN ON
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
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
                            className="h-auto w-full max-w-[400px] md:max-w-[500px]"
                            priority={false}
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
                            className="h-auto w-full max-w-[300px] md:max-w-[350px]"
                            priority={false}
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}
