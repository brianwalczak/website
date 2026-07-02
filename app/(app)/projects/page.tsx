import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/payload-types";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

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
				{projects?.docs?.map((project: Project) => (
					<ProjectCard key={project.id} project={project} />
				))}

				{projects?.docs?.length === 0 && <p className="text-header font-semibold text-base sm:text-lg col-span-3">No projects found yet. Check back soon!</p>}
			</section>
		</div>
	);
}
