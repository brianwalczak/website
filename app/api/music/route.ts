import { NextResponse } from 'next/server';
import { MusicData } from '@/lib/types';

let cache: MusicData | null = null;
let expiresAt: number | null = null;

let accessToken: string | null = null;
let tokenExpiresAt: number | null = null;

// Helper to refresh the Spotify access token
async function refreshAccessToken() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!refreshToken || !clientId || !clientSecret) {
        console.warn('Missing Spotify refresh token or client credentials.');
        return null;
    }

    const req = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }),
    });

    try {
        const res = await req.json();

        if (res.access_token) {
            accessToken = res.access_token;
            tokenExpiresAt = Date.now() + (res.expires_in * 1000);
            return accessToken;
        } else {
            return null;
        }
    } catch {
        return null;
    }
}

async function getCurrentTrack(retry = false) {
    if (!accessToken || (tokenExpiresAt && Date.now() >= tokenExpiresAt)) await refreshAccessToken(); // attempt refresh
    if (!accessToken) return null; // fail on missing token

    const req = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        cache: "no-store"
    });

    // if unauthorized try to refresh token and retry again
    if (req.status === 401) {
        if (retry === true) return null; // avoiding infinite loops

        try {
            await refreshAccessToken();
        } catch {
            return null;
        }
        
        return getCurrentTrack(true); // retry once
    }

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
            const albumArt = track.item?.album?.images;
            const lowQualityArt = albumArt && albumArt.length > 0 ? albumArt[albumArt.length - 1].url : null;

            cache = {
                name: track.item.name,
                artist: track.item?.artists?.map((artist: any) => artist.name).join(", "),
                playing: track.is_playing,
                url: (track.item?.external_urls?.spotify || track.item?.href || "https://open.spotify.com"),
                albumArtUrl: lowQualityArt,
                position: (track?.progress_ms || 0),
                duration: (track.item?.duration_ms || 0)
            };
        } else {
            cache = { name: null, artist: null, playing: null, url: null, albumArtUrl: null, position: null, duration: null };
        }

        expiresAt = Date.now() + 10 * 1000; // cache for 10 seconds
        return NextResponse.json(cache);
    } catch {
        return NextResponse.json({ name: null, artist: null, playing: null, url: null, albumArtUrl: null, position: null, duration: null }); // something went wrong (API down? idk don't cache though)
    }
}