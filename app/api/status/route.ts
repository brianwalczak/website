import { NextResponse } from 'next/server';
import { StatusData } from '@/lib/types';

let cache: StatusData | null = null;
let expiresAt: number | null = null;

const CODE_THRESHOLD = 5; // if there's no activity after CODE_THRESHOLD minutes, assume im not coding anymore (Hackatime heartbeat)
const SLACK_THRESHOLD = 5; // if i didn't send a slack message after SLACK_ACTIVITY_THRESHOLD minutes, im probably not chatting

async function slackMessageStatus() {
    const req = await fetch(`https://slack.com/api/search.all?query=${encodeURIComponent(`from:<@${process.env.SLACK_USER_ID}>`)}&sort=timestamp&sort_dir=desc&count=1`, {
        headers: {
            "Authorization": `Bearer ${process.env.SLACK_OAUTH_TOKEN}`
        },
        cache: "no-store"
    });

    const res = await req.json();
    const lastTs = Number(res?.messages?.matches?.[0]?.ts);
    return (res.ok && Number.isFinite(lastTs) && (Date.now() - lastTs * 1000) / 1000 / 60 <= SLACK_THRESHOLD);
}

async function slackPresenceStatus() {
    const req = await fetch("https://slack.com/api/users.getPresence?user=" + process.env.SLACK_USER_ID, {
        headers: {
            "Authorization": `Bearer ${process.env.SLACK_OAUTH_TOKEN}`
        },
        cache: "no-store"
    });

    const res = await req.json();
    return (res.ok && res.presence === "active");
}

async function hackStatus() {
    const req = await fetch("https://hackatime.hackclub.com/api/v1/my/heartbeats/most_recent", {
        headers: {
            "Authorization": `Bearer ${process.env.HACKATIME_API_KEY}`
        },
        cache: "no-store"
    });

    const res = await req.json();

    if (res.has_heartbeat && res?.heartbeat?.time) {
        const diff = Date.now() - (res.heartbeat?.time * 1000);
        const minutes = diff / 1000 / 60;

        if (minutes <= CODE_THRESHOLD) {
            return minutes;
        }
    }

    return false;
}

export async function GET() {
    if (process.env.STATUS_ENABLED === 'false') {
        return NextResponse.json({ online: false, type: null });
    }

    if (cache && expiresAt && Date.now() < expiresAt) {
        return NextResponse.json(cache); // serve from cache (we don't want to spam APIs)
    }

    try {
        const isHackatime = await hackStatus();
        if (isHackatime) {
            cache = { online: true, type: 'coding' };
            expiresAt = Date.now() + (CODE_THRESHOLD - isHackatime) * 60 * 1000; // cache till threshold

            return NextResponse.json(cache); // im coding!
        }

        const isSlackMessage = await slackMessageStatus();
        if (isSlackMessage) {
            cache = { online: true, type: 'chatting' };
            expiresAt = Date.now() + 1 * 60 * 1000; // cache for 1 minute

            return NextResponse.json(cache); // sent a message recently
        }

        const isSlackPresence = await slackPresenceStatus();
        if (isSlackPresence) {
            cache = { online: true, type: null };
            expiresAt = Date.now() + 1 * 60 * 1000; // cache for 1 minute

            return NextResponse.json(cache); // computer is on / slack online (phone?)
        }
    } catch {
        return NextResponse.json({ online: false, type: null }); // something went wrong (API down? idk don't cache though)
    }

    cache = { online: false, type: null };
    expiresAt = Date.now() + 1 * 60 * 1000; // cache for 1 minute
    return NextResponse.json(cache); // fallback to offline
}