"use client";

import { HEADER_LINKS } from "@/lib/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
	const pathname = usePathname();
	const isActive = (href: string) => pathname === href;

	return (
		<header className="flex items-center justify-between">
			<span className="mono text-sm text-zinc-200">
				<Link className="hover:text-purple-400 transition-all duration-200" href="/">
					Brian&apos;s Cabin
				</Link>
				<span className="opacity-20 hidden sm:inline"> | </span>
				<a className="hover:text-zinc-400 active:text-zinc-600 transition hidden sm:inline" href="mailto:me@brian.re" target="_blank">
					me@brian.re
				</a>
			</span>

			<nav className="flex gap-10 text-base text-zinc-400">
				{HEADER_LINKS.map((page) => (
					<Link key={page.url} href={page.url} className={isActive(page.url) ? "text-zinc-100" : "hover:text-zinc-100 transition"}>
						{page.label}
					</Link>
				))}
			</nav>
		</header>
	);
}
