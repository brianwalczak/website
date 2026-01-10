"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [time, setTime] = useState("--:-- --");

  useEffect(() => {
    function updateTime() {
      const now = new Date();

      const timeString = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/Chicago",
      });

      setTime(timeString);
    }

    updateTime();

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto max-w-5xl px-6 py-16">
      <header className="flex items-center justify-between">
        <span className="mono text-sm text-zinc-200">
          Brian's Cabin
          <span className="opacity-20"> | </span>
          <a className="hover:text-zinc-400 active:text-zinc-600 transition" href="mailto:brian@brianwalczak.com"
            target="_blank">brian@brianwalczak.com</a>
        </span>

        <nav className="flex gap-10 text-base font-medium text-zinc-400">
          <a href="#" className="text-zinc-100 hover:text-zinc-100 transition">Home</a>
          <a href="#" className="hover:text-zinc-100 transition">Blog</a>
          <a href="#" className="hover:text-zinc-100 transition">Contact</a>
        </nav>
      </header>

      <section className="max-w-2xl space-y-4 mt-20">
        <h1 className="text-5xl font-semibold">
          Hey - I'm Brian.
        </h1>

        <p className="text-lg font-medium text-zinc-400">
          I'm a high school student and full-stack developer with a strong focus on back-end development. I'm
          proficient in Node.js and have a solid understanding of Python. I love tinkering with electronics,
          especially Arduino.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="border border-white/10 bg-zinc-900 rounded-xl p-5">
          <h2 className="mono text-blue-400 text-sm mb-2">Local Time</h2>
          <p className="mono text-zinc-100 text-2xl font-extrabold">{time}</p>
          <p className="text-zinc-500 text-xs mt-3">Central Time (McKinney, TX, USA)</p>
        </div>

        <div className="border border-white/10 bg-zinc-900 rounded-xl p-5">
          <h2 className="mono text-green-400 text-sm mb-3">Status</h2>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr mt-12">
        <div className="border border-white/10 bg-zinc-900 rounded-xl p-5">
          <h2 className="mono text-purple-400 text-sm mb-2">Projects</h2>

          <p className="text-zinc-400 text-base font-medium">
            I've built many websites and wrote cool software that helps others. I like writing code, designing hardware, and
            building random ideas all the time.
          </p>
        </div>

        <div className="border border-white/10 bg-zinc-900 rounded-xl p-5 pb-8">
          <h2 className="mono text-purple-400 text-sm mb-2">Learning</h2>

          <p className="text-zinc-400 text-base font-medium">
            I love learning new things, whether it's a programming language, using software, or just tinkering with
            tech! If I'm free, I'm probably learning something new.
          </p>
        </div>

        <div className="border border-white/10 bg-zinc-900 rounded-xl p-5">
          <h2 className="mono text-purple-400 text-sm mb-2">Running Stuff</h2>

          <p className="text-zinc-400 text-base font-medium">
            I run a ton of services on my own server using Docker, including cloud storage for my family and
            more. I love self-hosting! :D
          </p>
        </div>
      </section>
    </div>
  );
}
