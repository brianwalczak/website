import { getPayload } from 'payload'
import config from '@payload-config'

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { defaultJSXConverters } from '@payloadcms/richtext-lexical/react';
import { extractText, formatDate, calcReadTime } from '@/lib/utils';
import { redirect } from 'next/navigation';

const converters = {
    ...defaultJSXConverters,
    heading: ({ node, nodesToJSX }: { node: any; nodesToJSX: any }) => {
        const classes = {
            h1: 'text-4xl font-bold mt-8 mb-4',
            h2: 'text-3xl font-bold mt-7 mb-3',
            h3: 'text-2xl font-bold mt-6 mb-3',
            h4: 'text-xl font-bold mt-5 mb-2',
            h5: 'text-lg font-bold mt-4 mb-2',
            h6: 'text-base font-bold mt-4 mb-2',
        };
        
        const children = nodesToJSX({ nodes: node.children });
        const Tag = node.tag as keyof typeof classes;
        
        return (
            <Tag className={classes[Tag]}>
                {children}
            </Tag>
        );
    },
    paragraph: ({ node, nodesToJSX }: { node: any; nodesToJSX: any }) => {
        const children = nodesToJSX({ nodes: node.children });

        return (
            <p className="mb-4 text-xl font-medium leading-relaxed">
                {children}
            </p>
        );
    },
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