"use client";

import { LOCAL_TIMEZONE } from "@/lib/constants";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function QuickInfo() {
    const [time, setTime] = useState("--:-- --");
    const [activity, setActivity] = useState<{
        online: boolean;
        type: string | null;
    } | null>(null);

    useEffect(() => {
        function updateTime() {
            const now = new Date();

            const timeString = now.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                timeZone: LOCAL_TIMEZONE.value,
            });

            setTime(timeString);
        }

        updateTime();

        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch('/api/status').then(res => res.json())
            .then(setActivity) // set activity state with fetched data
            .catch(() => setActivity({ online: false, type: null })); // shouldn't happen, but assume offline on error
    }, []);

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            <div className="border border-white/10 bg-zinc-900 rounded-xl p-5">
                <h2 className="mono text-blue-400 text-sm mb-2">Local Time</h2>
                <p className="mono text-zinc-100 text-2xl font-extrabold">{time}</p>
                <p className="text-zinc-500 text-xs mt-3">{LOCAL_TIMEZONE.label}</p>
            </div>

            <div className="border border-white/10 bg-zinc-900 rounded-xl p-5">
                <h2 className="mono text-green-400 text-sm mb-3">Status</h2>

                {!activity ? (
                    <span className="text-white inline-flex items-center gap-1">Loading, you&apos;ll find out what I&apos;m up too soon! <Image src="/yayayayayay.gif" alt="yayyy!" width={18} height={18} className="size-4.5" unoptimized /></span>
                ) : (
                    <>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${activity.online ? (activity.type === 'coding' ? "bg-yellow-400 animate-pulse" : "bg-green-400 animate-pulse") : "bg-gray-400"}`}></div>
                            <p className="text-zinc-100">{activity.online ? (activity.type === 'coding' ? "Working on a project" : "Online") : "Offline"}</p>
                        </div>

                        {activity.online && activity.type === 'coding' && (
                            <p className="text-zinc-300 font-normal text-sm mt-3">I&apos;m currently working on a project in Visual Studio Code!</p>
                        )}

                        {activity.online && activity.type === 'chatting' && (
                            <p className="text-zinc-300 font-normal text-sm mt-3">I&apos;m currently chatting over on the <a href='https://hackclub.com/slack/' className='underline text-[#ec3750]' target='_blank' rel='noopener noreferrer'>Hack Club</a> Slack!</p>
                        )}

                        {activity.online && activity.type === null && (
                            <p className="text-zinc-300 font-normal text-sm mt-3">My computer or phone is on... I wonder what I&apos;m up to!</p>
                        )}

                        {!activity.online && (
                            <p className="text-zinc-300 font-normal text-sm mt-3">I&apos;m currently away from my computer, probably sleeping or just chilling.</p>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}