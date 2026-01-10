"use client";

import { useState } from "react";

export default function ActivityStatus() {
    const [activity] = useState<{
        online: boolean;
        type: string | null;
    }>({ online: false, type: null });

    return (
        <>
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${activity.online ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}></div>
                <p className="text-zinc-100 font-medium">{activity.online ? "Online" : "Offline"}</p>
            </div>

            <p className="text-zinc-500 text-xs mt-3">{activity.type}</p>
        </>
    );
}