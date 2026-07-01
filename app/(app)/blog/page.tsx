import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";

import { extractText, formatDate, calcReadTime } from "@/lib/utils";
import { BLOG_POSTS_CACHE_SECONDS, POSTS_PER_PAGE } from "@/lib/constants";
import { redirect } from "next/navigation";
import type { Post } from "@/payload-types";

import AngleLeft from "@/components/icons/AngleLeft";
import AngleRight from "@/components/icons/AngleRight";

export const dynamic = "force-dynamic";

const getPosts = unstable_cache(
	async (pageNumber: number) => {
		const payload = await getPayload({ config });

		return await payload.find({
			collection: "posts",
			where: {
				visibility: {
					equals: "public",
				},
			},
			limit: POSTS_PER_PAGE,
			page: pageNumber,
			sort: "-createdAt",
		});
	},
	["posts"],
	{ revalidate: BLOG_POSTS_CACHE_SECONDS },
);

export const metadata = {
	title: "Blog - Brian Walczak",
	description: "Read the latest posts from my blog, where I write about programming, technology, and other things I find interesting.",
	alternates: {
		canonical: "https://brian.re/blog",
	},
	openGraph: {
		title: "Blog - Brian Walczak",
		description: "Read the latest posts from my blog, where I write about programming, technology, and other things I find interesting.",
		url: "https://brian.re/blog",
		siteName: "Brian Walczak",
		locale: "en_US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		"max-image-preview": "large",
		"max-snippet": -1,
		"max-video-preview": -1,
	},
};

export default async function Blog({ searchParams }: { searchParams?: { p?: string } }) {
	const params = searchParams ? await searchParams : {};

	let page = 1;
	if (params && params.p !== undefined) {
		const parsed = parseInt(params.p);

		if (!isNaN(parsed) && parsed > 0) page = parsed;
	}

	const posts = await getPosts(page);
	const totalPages = Math.max(1, Math.ceil((posts?.totalDocs || 0) / POSTS_PER_PAGE));

	if (page > totalPages) {
		redirect(`/blog?p=${totalPages}`);
	}

	return (
		<div className="max-w-5xl space-y-6 mt-20">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl sm:text-4xl text-header font-semibold">Blog</h1>
				<p className="text-sm">
					Showing page {page} of {totalPages}
				</p>
			</div>

			<section className="grid grid-cols-1 gap-6">
				{posts?.docs?.map((post: Post) => (
					<Link key={post.id} href={`/blog/${post.slug}`} className="block">
						<article className="border border-surface-border bg-surface rounded-xl p-5 hover:bg-surface-hover transition-colors">
							<h2 className="text-xl sm:text-2xl font-bold mb-2 line-clamp-2 text-header">{post.title}</h2>
							<div className="text-sm mb-2">
								{formatDate(post.createdAt)} <span className="font-bold mx-1">•</span> {calcReadTime(extractText(post.body))}
							</div>
							<p className="line-clamp-3">{extractText(post.body)}</p>
						</article>
					</Link>
				))}

				{posts?.docs?.length === 0 && <p className="text-header font-semibold text-base sm:text-lg">No posts found :( Check back later!</p>}
			</section>

			<nav className="flex items-center justify-between">
				<div>
					<Link href={`/blog?p=${Math.max(1, page - 1)}`} className={`${page > 1 ? "hover:text-text-hover transition-colors" : "text-text-disabled pointer-events-none"}`} aria-disabled={page <= 1}>
						<span className="flex items-center justify-center font-semibold">
							<AngleLeft className="size-3.5 mr-1" />
							<span>Previous</span>
						</span>
					</Link>
				</div>

				<div className="text-sm font-semibold">
					Page {page} of {totalPages}
				</div>

				<div>
					<Link href={`/blog?p=${Math.min(totalPages, page + 1)}`} className={`${page < totalPages ? "hover:text-text-hover transition-colors" : "text-text-disabled pointer-events-none"}`} aria-disabled={page >= totalPages}>
						<span className="flex items-center justify-center font-semibold">
							<span>Next</span>
							<AngleRight className="size-3.5 ml-1" />
						</span>
					</Link>
				</div>
			</nav>
		</div>
	);
}
