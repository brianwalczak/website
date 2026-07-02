"use client";

import { useEffect, useState } from "react";
import { SKILLS_DATA } from "@/lib/constants";

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
		<section className="mt-12">
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
				{SKILLS_DATA[skillsTab as keyof typeof SKILLS_DATA]?.map((skill) => (
					<div key={skill.name} className="flex flex-col items-center gap-3 p-4 border border-surface-border bg-surface rounded-xl hover:border-surface-border-hover transition">
						{skill.icon}
						<span className="text-sm text-center whitespace-nowrap">{skill.name}</span>
					</div>
				))}
			</div>
		</section>
	);
}
