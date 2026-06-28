"use client";

import { useEffect, useState } from "react";

// -- Icons -- //
import React from "@/components/icons/React";
import Typescript from "@/components/icons/Typescript";
import Javascript from "@/components/icons/Javascript";
import HTML5 from "@/components/icons/HTML5";
import CSS from "@/components/icons/CSS";
import EJS from "@/components/icons/EJS";
import Tailwind from "@/components/icons/Tailwind";
import NodeJS from "@/components/icons/NodeJS";
import Python from "@/components/icons/Python";
import Java from "@/components/icons/Java";
import Express from "@/components/icons/Express";
import Prisma from "@/components/icons/Prisma";
import Discord from "@/components/icons/Discord";
import Bash from "@/components/icons/Bash";
import Arduino from "@/components/icons/Arduino";
import Docker from "@/components/icons/Docker";
import Blender from "@/components/icons/Blender";
import Fusion360 from "@/components/icons/Fusion360";
import VSCode from "@/components/icons/VSCode";
import AdobePhotoshop from "@/components/icons/AdobePhotoshop";
import AdobeIllustrator from "@/components/icons/AdobeIllustrator";

const FADE_DURATION = 200;

export default function Skills() {
	const [skillsTab, setSkillsTab] = useState("frontend");
	const [phase, setPhase] = useState("idle");
	const [newTab, setNewTab] = useState("frontend");

	function switchTab(next: string) {
		if (next === newTab) return;
		setNewTab(next);

		if (phase !== "exit") {
			setPhase("exit");
		}
	}

	useEffect(() => {
		if (phase === "idle") return;

		const timeout = setTimeout(() => {
			if (phase === "exit") {
				setSkillsTab(newTab);
				setPhase("enter");
			} else if (phase === "enter") {
				setPhase("idle");
			}
		}, FADE_DURATION + 20);

		return () => clearTimeout(timeout);
	}, [phase, newTab]);

	return (
		<section className="mt-12 border-t-2 border-surface-border pt-10">
			<h2 className="text-header text-2xl font-bold mb-6">Skills</h2>

			<div className="flex justify-center sm:justify-start border-b border-surface-border gap-2 mb-6">
				{" "}
				{/* centered on mobile devices! */}
				<button onClick={() => switchTab("frontend")} className={`text-[0.9375rem] px-4 py-2 transition border-b-2 cursor-pointer ${newTab === "frontend" ? "border-purple-400 text-purple-400" : "border-transparent text-text-hover hover:text-text"}`}>
					Frontend
				</button>
				<button onClick={() => switchTab("backend")} className={`text-[0.9375rem] px-4 py-2 transition border-b-2 cursor-pointer ${newTab === "backend" ? "border-purple-400 text-purple-400" : "border-transparent text-text-hover hover:text-text"}`}>
					Backend
				</button>
				<button onClick={() => switchTab("software")} className={`text-[0.9375rem] px-4 py-2 transition border-b-2 cursor-pointer ${newTab === "software" ? "border-purple-400 text-purple-400" : "border-transparent text-text-hover hover:text-text"}`}>
					Software
				</button>
			</div>

			<div
				className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
				style={{
					transition: `opacity ${FADE_DURATION}ms ease-out, transform ${FADE_DURATION}ms ease-out`,
					opacity: phase === "exit" ? 0 : 1,
					transform: phase === "exit" ? "translateY(10px)" : "translateY(0)",
				}}
			>
				{skillsTab === "frontend" && (
					<>
						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<React className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">React / Native</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Typescript className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Typescript</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Javascript className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Javascript</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<HTML5 className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">HTML5</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<CSS className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">CSS</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<EJS className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">EJS</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Tailwind className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Tailwind CSS</span>
						</div>
					</>
				)}

				{skillsTab === "backend" && (
					<>
						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<NodeJS className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Node.js</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Typescript className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Typescript</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Python className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Python</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Java className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Java</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Express className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Express</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Prisma className="size-9 my-0.5 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Prisma</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Discord className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Discord.js</span>
						</div>
					</>
				)}

				{skillsTab === "software" && (
					<>
						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Bash className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Bash</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Arduino className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Arduino</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Docker className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Docker</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Blender className="size-10 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Blender</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<Fusion360 className="size-9 my-0.5 text-header" />
							<span className="text-sm text-center whitespace-nowrap">Fusion 360</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<VSCode className="size-8 my-1 text-header" />
							<span className="text-sm text-center whitespace-nowrap">VS Code</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<AdobePhotoshop className="text-3xl mt-1" />
							<span className="text-sm text-center whitespace-nowrap">Adobe Photoshop</span>
						</div>

						<div className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
							<AdobeIllustrator className="text-3xl mt-1" />
							<span className="text-sm text-center whitespace-nowrap">Adobe Illustrator</span>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
