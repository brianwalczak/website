import Link from "next/link";

export const metadata = {
	title: "Not found - Brian Walczak",
	description: "The page you are looking for does not exist.",
	alternates: {
		canonical: "https://brian.re/not-found",
	},
	openGraph: {
		title: "Not found - Brian Walczak",
		description: "The page you are looking for does not exist.",
		url: "https://brian.re/not-found",
		siteName: "Brian Walczak",
		locale: "en_US",
		type: "website",
	},
	robots: {
		index: false,
		follow: false,
	},
};

export default function NotFound() {
	return (
		<section className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-10">
			<div className="space-y-3">
				<p className="text-purple-400 font-bold tracking-wider text-sm sm:text-base">404 Error</p>
				<h1 className="text-5xl sm:text-6xl font-semibold text-header">Page not found</h1>
				<p className="text-lg sm:text-xl max-w-lg mx-auto">Sorryyy, the page you&apos;re looking for doesn&apos;t exist or may have been moved.</p>
			</div>

			<div className="pt-2">
				<Link href="/" className="text-base sm:text-lg inline-flex px-5 py-2.5 rounded-lg border border-surface-border bg-surface text-header font-semibold hover:bg-surface-hover hover:border-surface-border-hover transition-colors">
					Go Back Home
				</Link>
			</div>
		</section>
	);
}
