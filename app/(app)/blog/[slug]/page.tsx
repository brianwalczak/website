import { getPayload } from 'payload'
import config from '@payload-config'

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { extractText, formatDate, calcReadTime } from '@/lib/utils';
import { redirect } from 'next/navigation';

export const metadata = { title: "Blog | Brian's Cabin" };

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