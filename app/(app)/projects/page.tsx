import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";

import type { Project, Media } from "@/payload-types";
import { PROJECTS_CACHE_SECONDS } from "@/lib/constants";

export const dynamic = "force-dynamic";

const getProjects = unstable_cache(
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

export const metadata = {
	title: "Projects - Brian Walczak",
	description: "A collection of projects I've built over the years, including ones I'm currently working on.",
	alternates: {
		canonical: "https://brian.re/projects",
	},
	openGraph: {
		title: "Projects - Brian Walczak",
		description: "A collection of projects I've built over the years, including ones I'm currently working on.",
		url: "https://brian.re/projects",
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

export default async function Projects() {
	const projects = await getProjects();

	return (
		<div className="max-w-5xl mt-20">
			<div className="mb-10">
				<h1 className="text-3xl sm:text-4xl text-header font-semibold mb-3">Projects</h1>
				<p className="text-base sm:text-lg max-w-4xl">A showcase of projects I&apos;ve worked on! Not everything I&apos;ve built, but the most significant ones.</p>
			</div>

			<section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{projects?.docs?.map((project: Project) => {
					const image = project.image as Media | null | undefined;
					const tags = project.tags?.map((t) => t.tag) ?? [];

					return (
						<a key={project.id} href={project.url} target="_blank" rel="noopener noreferrer" className="group border border-surface-border bg-surface rounded-xl overflow-hidden flex flex-col hover:bg-surface-hover hover:border-surface-border-hover transition-colors">
							<div className="relative w-full aspect-video overflow-hidden bg-backdrop">{image?.url && <Image src={image.url} alt={image.alt ?? project.name} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />}</div>

							<div className="flex flex-col gap-2 p-4 flex-1">
								<h2 className="text-lg font-bold text-header leading-snug">{project.name}</h2>
								<p className="text-base leading-relaxed flex-1">{project.description}</p>

								<div className="flex flex-wrap gap-1.5">
									{tags.map((tag) => (
										<span key={tag} className="text-sm font-medium px-2 py-0.5 rounded-md bg-backdrop border border-surface-border">
											{tag}
										</span>
									))}
								</div>
							</div>
						</a>
					);
				})}

				{projects?.docs?.length === 0 && <p className="text-header font-semibold text-base sm:text-lg col-span-3">No projects found yet. Check back soon!</p>}
			</section>
		</div>
	);
}
