"use client";

import { useEffect, useState } from "react";
import { MusicData } from "@/lib/types";
import Image from "next/image";

import X from "@/components/icons/X";

export default function Music() {
	const [spotify, setSpotify] = useState<MusicData | null>(null);

	const [isVisible, setIsVisible] = useState(false);
	const [currentPos, setCurrentPos] = useState<number | null>(null);

	useEffect(() => {
		fetch("/api/music")
			.then((res) => res.json())
			.then((data) => {
				setSpotify(data); // set listening state with fetched data
				setCurrentPos(data.position);
				if (data && data.name) setIsVisible(true);
			})
			.catch(() => {
				setSpotify(null); // shouldn't happen, but assume not listening
				setIsVisible(false);
				setCurrentPos(null);
			});
	}, []);

	useEffect(() => {
		if (!spotify?.playing) return;

		const interval = setInterval(() => {
			setCurrentPos((prev) => {
				if (prev === null || spotify.duration === null) return prev;
				const newPos = prev + 1000;

				if (newPos >= spotify.duration) {
					fetch("/api/music")
						.then((res) => res.json())
						.then((data) => {
							setSpotify(data);
							setCurrentPos(data.position);
							if (!data || !data.name) setIsVisible(false);
						})
						.catch(() => {
							setSpotify(null);
							setIsVisible(false);
							setCurrentPos(null);
						});

					return prev;
				} else {
					return newPos;
				}
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [spotify?.playing, spotify?.duration]);

	return (
		<section className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 w-[min(90vw,50rem)] border border-surface-border bg-surface rounded-full p-2 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`}>
			{spotify && spotify.name && (
				<div className="flex items-center gap-3">
					{spotify.albumArtUrl && <Image src={spotify.albumArtUrl} alt="Album - Spotify" width={55} height={55} className="rounded-full" unoptimized />}

					<div className="flex-1 min-w-0">
						<p className="text-header truncate">
							{spotify.url ? (
								<a href={spotify.url} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 active:text-green-500 transition-colors">
									{spotify.name}
								</a>
							) : (
								spotify.name
							)}
						</p>

						<p className="text-xs truncate">{spotify.artist}</p>

						{currentPos !== null && spotify.duration !== null && (
							<div className="flex items-center gap-2 mt-1">
								<span className="text-xs mono">
									{Math.floor(currentPos / 60000)}:{String(Math.floor((currentPos % 60000) / 1000)).padStart(2, "0")}
								</span>

								<div className="flex-1 bg-surface-border rounded-full h-1">
									<div className="bg-green-400 h-1 rounded-full transition-all duration-500" style={{ width: `${(currentPos / spotify.duration) * 100}%` }}></div>
								</div>

								<span className="text-xs mono">
									{Math.floor(spotify.duration / 60000)}:{String(Math.floor((spotify.duration % 60000) / 1000)).padStart(2, "0")}
								</span>
							</div>
						)}
					</div>

					<button onClick={() => setIsVisible(false)} className="bg-surface-border hover:bg-surface-border-hover hover:text-header transition-colors rounded-full p-1 cursor-pointer mr-2">
						<X className="size-3" />
					</button>
				</div>
			)}
		</section>
	);
}
