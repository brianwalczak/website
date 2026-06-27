import PopTransition from "@/components/PopTransition";
import { ViewTransition } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
				<link rel="icon" href="https://avatars.githubusercontent.com/u/72092838?v=4" type="image/png" />
				<Analytics />
			</head>
			<body className="min-h-screen flex flex-col bg-backdrop text-text">
				<PopTransition />

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
