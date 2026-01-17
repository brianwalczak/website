"use client";

import { useEffect, useState } from "react";
import { MusicData } from '@/lib/types';
import Image from "next/image";

export default function Music() {
    const [spotify, setSpotify] = useState<MusicData | null>(null);

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
        <section className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[min(90vw,50rem)] border border-white/10 bg-zinc-900 rounded-full p-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
            {spotify && spotify.name && (
                <div className="flex items-center gap-3">
                    {spotify.albumArtUrl && (
                        <Image src={spotify.albumArtUrl} alt="Album - Spotify" width={55} height={55} className="rounded-full" unoptimized />
                    )}
                    
                    <div className="flex-1 min-w-0">
                        <p className="text-zinc-200 font-medium truncate">
                            {spotify.url ? (
                                <a href={spotify.url} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 active:text-green-500 transition-colors">{spotify.name}</a>
                            ) : spotify.name}
                        </p>

                        <p className="text-zinc-400 text-xs truncate">{spotify.artist}</p>

                        {spotify.position !== null && spotify.duration !== null && (
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-zinc-500 text-xs mono">
                                    {Math.floor(spotify.position / 60000)}:{String(Math.floor((spotify.position % 60000) / 1000)).padStart(2, '0')}
                                </span>

                                <div className="flex-1 bg-zinc-700 rounded-full h-1">
                                    <div className="bg-green-400 h-1 rounded-full" style={{ width: `${(spotify.position / spotify.duration) * 100}%` }}></div>
                                </div>
                                
                                <span className="text-zinc-500 text-xs mono">
                                    {Math.floor(spotify.duration / 60000)}:{String(Math.floor((spotify.duration % 60000) / 1000)).padStart(2, '0')}
                                </span>
                            </div>
                        )}
                    </div>

                    <button onClick={() => setIsVisible(false)} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors rounded-full p-1 cursor-pointer mr-2">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            )}
        </section>
    );
}