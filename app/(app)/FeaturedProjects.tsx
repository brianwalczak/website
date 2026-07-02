import type { Project } from "@/payload-types";
import { getProjects } from "@/lib/projects";
import Link from "next/link";

import ProjectCard from "@/components/ProjectCard";
import ArrowRight from "@/components/icons/ArrowRight";

export const dynamic = "force-dynamic";

export default async function FeaturedProjects() {
	const projects = await getProjects();
	const featured = projects?.docs?.slice(0, 3);

	if (!featured?.length) return null;

	return (
		<section className="mt-12">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-header text-2xl font-bold">Projects</h2>

				<Link href="/projects" className="text-base font-semibold text-link hover:text-link-hover transition-colors flex items-center gap-1">
					View all
					<ArrowRight className="size-4" />
				</Link>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{featured.map((project: Project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</section>
	);
}
