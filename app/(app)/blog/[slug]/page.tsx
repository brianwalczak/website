import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";

import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react";
import { extractText, formatDate, calcReadTime } from "@/lib/utils";
import { BLOG_POST_CACHE_SECONDS } from "@/lib/constants";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const getPost = unstable_cache(
	async (slug: string) => {
		const payload = await getPayload({ config });

		return await payload.find({
			collection: "posts",
			where: {
				slug: {
					equals: slug,
				},
				visibility: {
					not_equals: "private",
				},
			},
			limit: 1,
			pagination: false,
		});
	},
	["post"],
	{ revalidate: BLOG_POST_CACHE_SECONDS }
);

export async function generateMetadata({ params }: { params: { slug?: string } }) {
	try {
		const pathParams = params ? await params : {};

		if (!pathParams || pathParams.slug === undefined) throw new Error();

		const search = await getPost(pathParams.slug);

		const post = search?.docs?.[0];
		if (!post) throw new Error();

		const summary = extractText(post.body).replace(/\s+/g, " ").trim().slice(0, 150) + "...";

		return {
			title: `${post.title} | Blog - Brian Walczak`,
			description: summary,
			alternates: {
				canonical: `https://brian.re/blog/${pathParams.slug}`,
			},
			openGraph: {
				title: `${post.title} | Blog - Brian Walczak`,
				description: summary,
				url: `https://brian.re/blog/${pathParams.slug}`,
				siteName: "Brian Walczak",
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
	} catch {
		return {
			title: "Not found | Blog - Brian Walczak",
			description: "This blog post does not exist or is invalid.",
			robots: {
				index: false,
				follow: false,
			},
		};
	}
}

export default async function Blog({ params }: { params?: { slug?: string } }) {
	const pathParams = params ? await params : {};

	if (!pathParams || pathParams.slug === undefined) {
		redirect(`/blog`);
	}

	const search = await getPost(pathParams.slug);

	const post = search?.docs?.[0];
	if (!post) redirect(`/blog`);

	return (
		<article className="post">
			<header className="header">
				<h1 className="title">{post.title}</h1>
				<div className="meta">
					Published on {formatDate(post.createdAt)} <span className="font-bold mx-1">•</span> {calcReadTime(extractText(post.body))}
				</div>
			</header>

			<div className="rich-content">
				<RichTextConverter data={post.body as SerializedEditorState} />
			</div>
		</article>
	);
}
