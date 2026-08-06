import { NextRequest, NextResponse } from "next/server";
import { MAX_PRINTER_CHARS } from "@/lib/constants";
import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from "obscenity";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

const rateLimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.slidingWindow(1, "24 h"),
});

const matcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});

export async function POST(req: NextRequest) {
	const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || "127.0.0.1";
	const body = await req.json().catch(() => null);

	// Check if printing is enabled
	if (process.env.PRINT_ENABLED != "true") {
		return NextResponse.json({ error: "Sorry, printing is currently paused! Please check back later." }, { status: 503 });
	}

	// Check if the request body is valid
	if (!body || typeof body.message !== "string") {
		return NextResponse.json({ error: "Your request was invalid. Please try entering your message again." }, { status: 400 });
	}

	// Check if the IP address is manually blocked
	const blockedIps = process.env.PRINT_BLOCKED_IPS?.split(",")
		.map((blockedIp) => blockedIp.trim())
		.filter(Boolean);

	if (blockedIps?.includes(ip)) {
		return NextResponse.json({ error: "An unknown error occurred while sending your message to the printer." }, { status: 500 });
	}

	const message: string = body.message.trim();

	// Check if the message is valid
	if (!message || message.length === 0) {
		return NextResponse.json({ error: "You forgot to type a message, silly! I can't send an empty page to print." }, { status: 400 });
	}

	// Check if the message is too long
	if (message.length > MAX_PRINTER_CHARS) {
		return NextResponse.json({ error: `Sorry, your message is too long! Please keep it under ${MAX_PRINTER_CHARS} characters.` }, { status: 400 });
	}

	// Check if the message has some inappropriate content
	if (matcher.hasMatch(message)) {
		return NextResponse.json({ error: "Your message was flagged for inappropriate content and cannot be printed." }, { status: 400 });
	}

	// Check if the IP address is a known VPN/proxy
	if (process.env.PRINT_VPN_CHECK != "false" && process.env.PRINT_VPN_CHECK_API_KEY) {
		try {
			const req = await fetch(`https://proxycheck.io/v3/${ip}?key=${process.env.PRINT_VPN_CHECK_API_KEY}`);
			const res = await req.json();

			if (res.status === "denied" || res.status === "error") {
				throw null; // fallback to the catch
			} else if (res?.[ip]?.detections?.proxy === true || res?.[ip]?.detections?.vpn === true || res?.[ip]?.detections?.tor === true) {
				return NextResponse.json({ error: "So sorry, but VPNs and proxies aren't allowed here to prevent abuse. :((" }, { status: 400 });
			} else if (res?.[ip]?.network?.type === "Wireless") {
				return NextResponse.json({ error: "So sorry, but mobile networks aren't allowed here to prevent spamming. :((" }, { status: 400 });
			}
		} catch {
			return NextResponse.json({ error: "An error occurred while checking your IP address. Please try again later." }, { status: 500 });
		}
	}

	// Check rate limit for IP address
	const { success } = await rateLimit.limit(ip);

	if (!success) {
		return NextResponse.json({ error: "You've already sent a message in the last 24 hours. Try again later!" }, { status: 429 });
	}

	// Everything is good! Push it to the Redis queue for printing :D
	try {
		await redis.rpush("print_queue", message);
		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "An unknown error occurred while sending your message to the printer." }, { status: 500 });
	}
}
