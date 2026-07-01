"use client";

import { HEADER_LINKS } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Bars from "@/components/icons/Bars";

export default function Header() {
	const pathname = usePathname();
	const isActive = (href: string) => pathname === href;
	const [menuOpen, setMenuOpen] = useState(false);
	const [lastPathname, setLastPathname] = useState(pathname);

	// Close the menu when the page changes
	if (pathname !== lastPathname) {
		setLastPathname(pathname);
		setMenuOpen(false);
	}

	// Prevent scrolling when the menu is open
	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => { document.body.style.overflow = ""; };
	}, [menuOpen]);

	return (
		<header className="flex items-center justify-between relative">
			<span className="mono text-sm text-header">
				<Link className="hover:text-purple-400 transition-all duration-200" href="/">
					Brian&apos;s Cabin
				</Link>
				<span className="opacity-20 hidden sm:inline"> | </span>
				<a className="hover:text-text-hover transition hidden sm:inline" href="mailto:me@brian.re" target="_blank">
					me@brian.re
				</a>
			</span>

			{/* nav links for desktop */}
			<nav className="hidden sm:flex gap-10 text-base">
				{HEADER_LINKS.map((page) => (
					<Link key={page.url} href={page.url} className={isActive(page.url) ? "text-zinc-200" : "hover:text-text-hover transition"}>
						{page.label}
					</Link>
				))}
			</nav>

			{/* nav button for mobile */}
			<button className="sm:hidden relative flex justify-center items-center w-8 h-8 z-55" onClick={() => setMenuOpen((prev) => !prev)}>
				<Bars className={`size-6 transition-opacity duration-200 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
				<span className={`text-xl font-bold absolute transition-opacity duration-200 ${menuOpen ? "opacity-100" : "opacity-0"}`}>✕</span>
			</button>

			{/* nav drawer for mobile */}
			<div className={`fixed inset-0 bg-backdrop/80 backdrop-blur-sm z-50 sm:hidden transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}>
				<nav className={`fixed flex flex-col top-0 right-0 h-full w-64 pt-24 px-8 gap-6 text-lg bg-surface border-l border-surface-border shadow-2xl transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
					{HEADER_LINKS.map((page) => (
						<Link key={page.url} href={page.url} className={isActive(page.url) ? "text-zinc-200" : "hover:text-text-hover transition"} onClick={() => setMenuOpen(false)}>
							{page.label}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
}
