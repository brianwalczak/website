import Image from "next/image";
import type { Project, Media } from "@/payload-types";

export default function ProjectCard({ project }: { project: Project }) {
	const image = project.image as Media | null | undefined;
	const tags = project.tags?.map((t) => t.tag) ?? [];

	return (
		<a href={project.url} target="_blank" rel="noopener noreferrer" className="group border border-surface-border bg-surface rounded-xl overflow-hidden flex flex-col hover:bg-surface-hover hover:border-surface-border-hover transition-colors">
			<div className="relative w-full aspect-video overflow-hidden bg-backdrop">{image?.url && <Image src={image.url} alt={image.alt ?? project.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />}</div>

			<div className="flex flex-col gap-2 p-4 flex-1">
				<h3 className="text-lg font-bold text-header leading-snug">{project.name}</h3>
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
}
