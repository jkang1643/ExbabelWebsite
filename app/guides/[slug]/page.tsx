import { guides } from "@/lib/guides";
import { notFound } from "next/navigation";
import GuideContent from "@/components/GuideContent";

export function generateStaticParams() {
    return Object.keys(guides).map((slug) => ({
        slug,
    }));
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const guide = guides[slug as keyof typeof guides];

    if (!guide) {
        notFound();
    }

    return <GuideContent slug={slug} guide={guide} />;
}
