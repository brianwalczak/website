import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";

import { PROJECTS_CACHE_SECONDS } from "@/lib/constants";

export const getProjects = unstable_cache(
	async () => {
		const payload = await getPayload({ config });

		return await payload.find({
			collection: "projects",
			sort: "order,-createdAt",
		});
	},
	["projects"],
	{ revalidate: PROJECTS_CACHE_SECONDS },
);
