import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link';

import { extractText, formatDate, calcReadTime } from '@/lib/utils';
import { POSTS_PER_PAGE } from '@/lib/constants';
import { redirect } from 'next/navigation';

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
        <div className="max-w-5xl space-y-6 mt-20">
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
                            <p className="text-zinc-400 font-medium line-clamp-3">{extractText(post.body)}</p>
                        </article>
                    </Link>
                ))}

                {posts?.docs?.length === 0 && (
                    <p className="text-zinc-400 font-semibold text-lg">No posts found :( Check back later!</p>
                )}
            </section>

            <nav className="flex items-center justify-between">
                <div>
                    <Link href={`/blog?p=${Math.max(1, page - 1)}`} className={`${page > 1 ? 'text-zinc-100 hover:text-zinc-300 transition-colors' : 'text-zinc-600 pointer-events-none'}`} aria-disabled={page <= 1}>
                        <span className="flex items-center justify-center font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3.5 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>

                            <span>Previous</span>
                        </span>
                    </Link>
                </div>

                <div className="text-sm font-semibold text-zinc-400">Page {page} of {totalPages}</div>

                <div>
                    <Link href={`/blog?p=${Math.min(totalPages, page + 1)}`} className={`${page < totalPages ? 'text-zinc-100 hover:text-zinc-300 transition-colors' : 'text-zinc-600 pointer-events-none'}`} aria-disabled={page >= totalPages}>
                        <span className="flex items-center justify-center font-semibold">
                            <span>Next</span>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3.5 ml-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </nav>
        </div>
    )
}