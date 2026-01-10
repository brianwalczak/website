"use client";

import { useEffect, useState } from "react";
import GetActivity from "@/components/server/GetActivity";

export default function ActivityStatus() {
    const [activity, setActivity] = useState<{
        online: boolean;
        working: boolean;
    }>({ online: false, working: false });

    useEffect(() => {
        async function get() {
            const result = await GetActivity();
            setActivity(result);
        }

        get();
    }, []);

    return (
        <>
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${activity.online ? (activity.working ? "bg-yellow-400 animate-pulse" : "bg-green-400 animate-pulse") : "bg-gray-400"}`}></div>
                <p className="text-zinc-100 font-medium">{activity.online ? (activity.working ? "Working on a project" : "Online") : "Offline"}</p>
            </div>

            {activity.online && activity.working && (
                <p className="text-zinc-300 text-sm mt-3">I&apos;m currently working on a project in Visual Studio Code!</p>
            )}

            {activity.online && !activity.working && (
                <p className="text-zinc-300 text-sm mt-3">I&apos;m currently chatting over on the <a href='https://hackclub.com/slack/' className='underline text-[#ec3750]' target='_blank' rel='noopener noreferrer'>Hack Club</a> Slack!</p>
            )}

            {!activity.online && (
                <p className="text-zinc-300 text-sm mt-3">I&apos;m currently away from my computer, probably sleeping or just chilling.</p>
            )}
        </>
    );
}