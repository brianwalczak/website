import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";

import { BLOG_POSTS_CACHE_SECONDS, BLOG_POST_CACHE_SECONDS, POSTS_PER_PAGE } from "@/lib/constants";

export const getPosts = unstable_cache(
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

export const getPost = unstable_cache(
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
	{ revalidate: BLOG_POST_CACHE_SECONDS },
);
