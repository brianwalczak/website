import { NextResponse } from 'next/server';
import { DEFAULT_STATUS, StatusData } from '@/lib/types';
import { redis } from '@/lib/redis';

const CACHE_TTL = 30 * 1000;
const STALE_THRESHOLD = 5 * 60 * 1000;

let cache: StatusData | null = null;
let expiresAt: number = 0;

export async function GET() {
    // return default offline status if disabled
    if (process.env.STATUS_ENABLED === 'false') {
        return NextResponse.json(DEFAULT_STATUS);
    }

    // serve from cache if its still fresh (don't want to spam Redis!)
    if (cache && Date.now() < expiresAt) {
        return NextResponse.json(cache);
    }

    try {
        const result = await redis.get<StatusData>('status');

        // use Redis result if it's not stale!
        if (result) {
            if (result.updatedAt) {
                const stale = Date.now() - new Date(result.updatedAt).getTime() > STALE_THRESHOLD;
                if (stale) return NextResponse.json(DEFAULT_STATUS);
            }

            cache = result;
            expiresAt = Date.now() + CACHE_TTL;
            return NextResponse.json(cache);
        }
    } catch {
        // something went wrong (Redis down? idk don't cache tho so we can try again next time)
        return NextResponse.json(DEFAULT_STATUS);
    }

    // fallback to offline since Redis is empty
    cache = DEFAULT_STATUS;
    expiresAt = Date.now() + CACHE_TTL;
    return NextResponse.json(cache);
}