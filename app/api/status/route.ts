import { NextResponse } from "next/server";
import { DEFAULT_STATUS, StatusStore, StatusData } from "@/lib/types";
import { redis } from "@/lib/redis";

const CACHE_TTL = 30 * 1000;
const STALE_THRESHOLD = 5 * 60 * 1000;

let cache: StatusData | null = null;
let expiresAt: number = 0;

export async function GET() {
	// return default offline status if disabled
	if (process.env.STATUS_ENABLED != "true") {
		return NextResponse.json(DEFAULT_STATUS);
	}

	// serve from cache if its still fresh (don't want to spam Redis!)
	if (cache && Date.now() < expiresAt) {
		return NextResponse.json(cache);
	}

	try {
		const result = await redis.hgetall<StatusStore>("status");

		// use Redis result if it's there!
		if (result && Object.keys(result).length > 0) {
			let winningPriority = Infinity;
			let winningStatus: StatusData | null = null;

			for (const device of Object.keys(result)) {
				if (result[device].priority >= winningPriority) continue; // skip lower priority statuses
				if (Object.keys(result[device]?.status).length === 0) continue; // skip empty statuses

				const status = result[device].status as StatusData;

				if (status?.updatedAt) {
					const stale = Date.now() - new Date(status.updatedAt).getTime() > STALE_THRESHOLD;
					if (stale) continue; // skip stale statuses
				}

				// everything looks good, let's use this status for now!
				winningPriority = result[device].priority;
				winningStatus = status;
			}

			if (winningStatus) {
				cache = winningStatus;
				expiresAt = Date.now() + CACHE_TTL;
				return NextResponse.json(cache);
			}
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
