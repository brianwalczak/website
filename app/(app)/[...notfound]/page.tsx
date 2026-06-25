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
		<section className="max-w-2xl space-y-4 mt-20">
			<h1 className="text-5xl font-semibold text-header">404 - Page Not Found</h1>
			<p className="text-lg">Sorryyy, the page you&apos;re looking for doesn&apos;t exist.</p>

			<Link href="/" className="text-lg font-bold hover:text-text-hover transition">
				Go back home
			</Link>
		</section>
	);
}
