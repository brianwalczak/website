import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link';

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { formatDate, calcReadTime } from '@/lib/utils';
import { redirect } from 'next/navigation';

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
        <RichTextConverter data={post.body as SerializedEditorState} />
    )
}