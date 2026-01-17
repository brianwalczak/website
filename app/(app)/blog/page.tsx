import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link';

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { POSTS_PER_PAGE } from '@/lib/constants';
import { redirect } from 'next/navigation';

function extractText(body: any): string {
    try {
        const data: SerializedEditorState = body;
        return convertLexicalToPlaintext({ data });
    } catch {
        return '';
    }
}

function formatDate(str: string): string {
    const date = new Date(str);

    // this should give us a format like Jan 17, 2026
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function calcReadTime(text: string): string {
    if (!text) return '1 min read';

    const words = (text.match(/\b\w+\b/g) || []).length; // word count
    return `${Math.max(1, Math.ceil(words / 238))} min read`;
}

export default async function Blog({ searchParams }: { searchParams?: { p?: string }}) {
    const payload = await getPayload({ config });
    const params = searchParams ? await searchParams : {};

    let page = 1;
    if (params && params.p !== undefined) {
        const parsed = parseInt(params.p);

        if (!isNaN(parsed) && parsed > 0) page = parsed;
    }

    const posts = await payload.find({
        collection: 'posts',
        limit: POSTS_PER_PAGE,
        page: page,
        sort: '-createdAt'
    });

    const totalPages = Math.max(1, Math.ceil((posts?.totalDocs || 0) / POSTS_PER_PAGE));
    if (page > totalPages) {
        redirect(`/blog?p=${totalPages}`);
    }

    return (
        <main className="max-w-5xl space-y-6 mt-20">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold">Blog</h1>
                <p className="text-sm font-medium text-zinc-400 ">Showing page {page} of {totalPages}</p>
            </div>

            <section className="grid grid-cols-1 gap-6">
                {posts?.docs?.map((post: any) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                        <article className="border border-white/10 bg-zinc-900 rounded-xl p-5 hover:bg-zinc-800 transition-colors">
                            <h2 className="text-2xl font-bold mb-2 line-clamp-2">{post.title}</h2>
                            <div className="text-zinc-400 text-sm mb-2">{formatDate(post.createdAt)} <span className="font-bold mx-1">•</span> {calcReadTime(extractText(post.body))}</div>
                            <p className="text-zinc-400 font-medium mb-4 line-clamp-3">{extractText(post.body)}</p>
                        </article>
                    </Link>
                ))}

                {posts?.docs?.length === 0 && (
                    <p className="text-zinc-400 font-semibold text-lg">No posts found :( Check back later!</p>
                )}
            </section>
        </main>
    )
}