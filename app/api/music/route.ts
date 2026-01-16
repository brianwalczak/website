import { NextResponse } from 'next/server';

let cache: { name: string | null, artist: string | null, playing: boolean | null, position: number | null, duration: number | null } | null = null;
let expiresAt: number | null = null;

// TO-DO: Refresh token logic agggh
async function getCurrentTrack() {
    const req = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
            "Authorization": `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
        },
        cache: "no-store"
    });

    if (req.status === 204 || !req.ok) return null;

    try {
        const res = await req.json();

        if (res.item) {
            return res;
        } else {
            return null;
        }
    } catch {
        return null;
    }
}

export async function GET() {
    if (cache && expiresAt && Date.now() < expiresAt) {
        return NextResponse.json(cache); // serve from cache (we don't want to spam APIs)
    }

    try {
        const track = await getCurrentTrack();

        if (track) {
            cache = { name: track.item.name, artist: track.item?.artists?.map((artist: any) => artist.name).join(", "), playing: track.is_playing, position: (track?.progress_ms || 0), duration: (track.item?.duration_ms || 0) };
        } else {
            cache = { name: null, artist: null, playing: null, position: null, duration: null };
        }

        expiresAt = Date.now() + 30 * 1000; // cache for 30 seconds
        return NextResponse.json(cache);
    } catch {
        return NextResponse.json({ name: null, artist: null, playing: null, position: null, duration: null }); // something went wrong (API down? idk don't cache though)
    }
}