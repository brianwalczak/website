import PopTransition from "@/components/PopTransition";
import { ViewTransition } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<Analytics />
			</head>
			<body className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
				<PopTransition />
				<Background />

				<div className="relative mx-auto max-w-5xl px-6 py-16 flex-1 w-full flex flex-col">
					<Header />
					<ViewTransition enter="fade-in" exit="fade-out">
						<main className="flex-1 flex flex-col">{children}</main>
					</ViewTransition>
					<Footer />
				</div>
			</body>
		</html>
	);
}
