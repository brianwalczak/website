import Link from "next/link";

export const metadata = {
  title: "404 Not Found | Brian's Cabin",
  description: "The page you are looking for does not exist.",
  alternates: {
    canonical: "https://brian.re/not-found",
  },
  openGraph: {
    title: "404 Not Found | Brian's Cabin",
    description: "The page you are looking for does not exist.",
    url: "https://brian.re/not-found",
    siteName: "Brian's Cabin",
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
      <h1 className="text-5xl font-semibold">404 - Page Not Found</h1>
      <p className="text-lg text-zinc-400">Sorryyy, the page you&apos;re looking for doesn&apos;t exist.</p>

      <Link href="/" className="text-lg font-bold hover:text-zinc-400 active:text-zinc-600 transition">Go back home</Link>
    </section>
  );
}