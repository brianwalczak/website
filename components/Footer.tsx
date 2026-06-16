import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
	return (
		<footer className="mono text-zinc-500 text-xs mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
			<span>© {new Date().getFullYear()} Brian Walczak</span>

			<div className="flex gap-6 items-center">
				{FOOTER_LINKS.map(({ label, url, icon }) => (
					<a key={label} href={url} className="hover:text-zinc-300 transition" target="_blank" rel="noopener noreferrer" aria-label={label}>
						{icon ? icon : label}
					</a>
				))}
			</div>
		</footer>
	);
}
