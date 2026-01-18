import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link';

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { defaultJSXConverters } from '@payloadcms/richtext-lexical/react';
import { extractText, formatDate, calcReadTime } from '@/lib/utils';
import { redirect } from 'next/navigation';

const converters = {
    ...defaultJSXConverters
};

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
        <article className="max-w-5xl mt-20">
            <header className="mb-6">
                <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
                <div className="text-zinc-300 text-xl font-semibold mb-2">Published on {formatDate(post.createdAt)} <span className="font-bold mx-1">•</span> {calcReadTime(extractText(post.body))}</div>
            </header>

            <RichTextConverter converters={converters} data={post.body as SerializedEditorState} />
        </article>
    )
}