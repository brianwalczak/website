"use server";

async function slackStatus() {
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

        if (minutes <= 10) {
            return true;
        }
    }

    return false;
}

export default async function GetActivity() {
    try {
        const isHackatime = await hackStatus();
        if (isHackatime) return { online: true, working: true }; // im coding!

        const isSlack = await slackStatus();
        if (isSlack) return { online: true, working: false }; // im chatting!
    } catch (error) {
        return { online: false, working: false }; // something went wrong
    }

    return { online: false, working: false }; // fallback to offline
}