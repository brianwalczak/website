"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Music() {
    const [spotify, setSpotify] = useState<{
        name: string | null;
        artist: string | null;
        playing: boolean | null;
        url: string | null;
        albumArtUrl: string | null;
        position: number | null;
        duration: number | null;
    } | null>(null);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        fetch('/api/music').then(res => res.json())
            .then(data => {
                setSpotify(data); // set listening state with fetched data
                if (data && data.name) setIsVisible(true);
            })
            .catch(() => {
                setSpotify(null); // shouldn't happen, but assume not listening
                setIsVisible(false);
            });
    }, []);

    return (
        <section className={`mt-6 border border-white/10 bg-zinc-900 rounded-xl p-5 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {spotify && spotify.name && (
                <div className="flex items-center gap-4">
                    {spotify.albumArtUrl && (
                        <Image src={spotify.albumArtUrl} alt="Album - Spotify" width={60} height={60} className="rounded-md" unoptimized />
                    )}
                    
                    <div className="flex-1 min-w-0">
                        <p className="text-zinc-200 text-lg font-medium truncate">
                            {spotify.url ? (
                                <a href={spotify.url} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 active:text-green-500 transition-colors">{spotify.name}</a>
                            ) : spotify.name}
                        </p>

                        <p className="text-zinc-400 text-sm truncate">{spotify.artist}</p>

                        {spotify.position !== null && spotify.duration !== null && (
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-zinc-500 text-xs mono">
                                    {Math.floor(spotify.position / 60000)}:{String(Math.floor((spotify.position % 60000) / 1000)).padStart(2, '0')}
                                </span>

                                <div className="flex-1 bg-zinc-700 rounded-full h-2">
                                    <div className="bg-green-400 h-2 rounded-full" style={{ width: `${(spotify.position / spotify.duration) * 100}%` }}></div>
                                </div>
                                
                                <span className="text-zinc-500 text-xs mono">
                                    {Math.floor(spotify.duration / 60000)}:{String(Math.floor((spotify.duration % 60000) / 1000)).padStart(2, '0')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}