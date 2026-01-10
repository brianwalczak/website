"use client";

import ActivityStatus from "@/components/client/ActivityStatus";
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
          Brian&apos;s Cabin
          <span className="opacity-20 hidden sm:inline"> | </span>
          <a className="hover:text-zinc-400 active:text-zinc-600 transition hidden sm:inline" href="mailto:brian@brianwalczak.com"
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
          Hey - I&apos;m Brian.
        </h1>

        <p className="text-lg font-medium text-zinc-400">
          I&apos;m a high school student and full-stack developer with a strong focus on back-end development. I&apos;m
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

          <ActivityStatus />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr mt-12">
        <div className="border border-white/10 bg-zinc-900 rounded-xl p-5">
          <h2 className="mono text-purple-400 text-sm mb-2">Projects</h2>

          <p className="text-zinc-400 text-base font-medium">
            I&apos;ve built many websites and wrote cool software that helps others. I like writing code, designing hardware, and
            building random ideas all the time.
          </p>
        </div>

        <div className="border border-white/10 bg-zinc-900 rounded-xl p-5 pb-8">
          <h2 className="mono text-purple-400 text-sm mb-2">Learning</h2>

          <p className="text-zinc-400 text-base font-medium">
            I love learning new things, whether it&apos;s a programming language, using software, or just tinkering with
            tech! If I&apos;m free, I&apos;m probably learning something new.
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

      <footer className="mono text-zinc-500 text-xs mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span>© 2026 Brian Walczak</span>

        <div className="flex gap-6 items-center">
          <a href="mailto:brian@brianwalczak.com" className="hover:text-zinc-300 transition" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </a>

          <a href="https://github.com/brianwalczak" className="hover:text-zinc-300 transition" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="size-4.5">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
          </a>

          <a href="https://hackclub.enterprise.slack.com/team/U091MEESEDT" className="hover:text-zinc-300 transition" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="size-4.5">
              <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111.756 8.43 1.68 8.43h1.682zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682zm6.749 1.682c0-.926.755-1.682 1.68-1.682S16 4.964 16 5.889s-.756 1.681-1.68 1.681h-1.681zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68s.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681z" />
            </svg>
          </a>

          <a href="https://discord.com/users/603517534720753686" className="hover:text-zinc-300 transition" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="size-5">
              <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
