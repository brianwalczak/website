import { getPayload } from 'payload'
import config from '@payload-config'

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { extractText, formatDate, calcReadTime } from '@/lib/utils';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug?: string } }) {
    try {
        const payload = await getPayload({ config });
        const pathParams = params ? await params : {};

        if (!pathParams || pathParams.slug === undefined) throw new Error();

        const search = await payload.find({
            collection: 'posts',
            where: {
                slug: {
                    equals: pathParams.slug,
                },
            },
            limit: 1,
            pagination: false
        });

        const post = search?.docs?.[0];
        if (!post) throw new Error();

        const summary = extractText(post.body).replace(/\s+/g, " ").trim().slice(0, 150) + "...";

        return {
            title: `${post.title} - Blog | Brian's Cabin`,
            description: summary,
            alternates: {
                canonical: `https://brian.re/blog/${pathParams.slug}`,
            },
            openGraph: {
                title: `${post.title} - Blog | Brian's Cabin`,
                description: summary,
                url: `https://brian.re/blog/${pathParams.slug}`,
                siteName: "Brian's Cabin",
                locale: "en_US",
                type: "article",
            },
            robots: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        };
    } catch (error) {
        return {
            title: "404 Not Found - Blog | Brian's Cabin",
            description: "This blog post does not exist or is invalid.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }
}

export default async function Blog({ params }: { params?: { slug?: string } }) {
    const payload = await getPayload({ config });
    const pathParams = params ? await params : {};

    if (!pathParams || pathParams.slug === undefined) {
        redirect(`/blog`);
    }

    const search = await payload.find({
        collection: 'posts',
        where: {
            slug: {
                equals: pathParams.slug,
            },
        },
        limit: 1,
        pagination: false
    });

    const post = search?.docs?.[0];
    if (!post) redirect(`/blog`);

    return (
        <article className="prose max-w-5xl mt-12">
            <header className="mb-6">
                <h1 className="title">{post.title}</h1>
                <div className="text-zinc-300 text-xl font-semibold mb-2">Published on {formatDate(post.createdAt)} <span className="font-bold mx-1">•</span> {calcReadTime(extractText(post.body))}</div>
            </header>

            <RichTextConverter data={post.body as SerializedEditorState} />
        </article>
    )
}