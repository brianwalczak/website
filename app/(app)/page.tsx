import QuickInfo from "./QuickInfo";
import Skills from "./Skills";
import Music from "./Music";

export const metadata = {
  title: "Home - Brian Walczak",
  description: "Hej! I'm Brian, a high school student and full-stack developer with a strong focus on back-end development. I'm proficient in Node.js and have a solid understanding of Python. I've been programming for over 6 years, and I love tinkering with electronics, especially Arduino.",
  alternates: {
    canonical: "https://brian.re",
  },
  openGraph: {
    title: "Home - Brian Walczak",
    description: "Hej! I'm Brian, a high school student and full-stack developer with a strong focus on back-end development. I'm proficient in Node.js and have a solid understanding of Python. I've been programming for over 6 years, and I love tinkering with electronics, especially Arduino.",
    url: "https://brian.re",
    siteName: "Brian Walczak",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export default function Home() {
  return (
    <>
      <section className="max-w-2xl space-y-4 mt-20">
        <h1 className="text-5xl font-semibold">
          Hey - I&apos;m Brian.
        </h1>

        <p className="text-lg text-zinc-400">
          I&apos;m a 16 year old high school student and full-stack developer with a strong focus on back-end development. I&apos;m
          proficient in Node.js and have a solid understanding of Python. I love tinkering with electronics,
          especially Arduino.
        </p>
      </section>

      <QuickInfo />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr mt-6">
        <div className="border border-white/10 bg-zinc-900 rounded-xl p-5">
          <h2 className="mono text-purple-400 text-sm mb-2">Projects</h2>

          <p className="text-zinc-400 text-base">
            I&apos;ve built many websites and wrote cool software that helps others. I like writing code, designing hardware, and
            building random ideas all the time.
          </p>
        </div>

        <div className="border border-white/10 bg-zinc-900 rounded-xl p-5 pb-8">
          <h2 className="mono text-purple-400 text-sm mb-2">Learning</h2>

          <p className="text-zinc-400 text-base">
            I love learning new things, whether it&apos;s a programming language, using software, or just tinkering with
            tech! If I&apos;m free, I&apos;m probably learning something new.
          </p>
        </div>

        <div className="border border-white/10 bg-zinc-900 rounded-xl p-5">
          <h2 className="mono text-purple-400 text-sm mb-2">Running Stuff</h2>

          <p className="text-zinc-400 text-base">
            I run a ton of services on my own server using Docker, including cloud storage for my family and
            more. I love self-hosting! :D
          </p>
        </div>
      </section>

      <Music />
      <Skills />

      <section className="mt-32 mb-16 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-6">Proud member of Hack Club. ❤️</h2>
        <p className="mono text-zinc-400 text-sm font-bold mb-8">I&apos;m fortunate enough to be a member of Hack Club, a nonprofit organization with an amazing community of teen hackers and creators. Some of my projects were funded by Hack Club, and they wouldn&apos;t be made possible without them!</p>
        <p className="mono text-zinc-400 text-sm font-bold">If you&apos;re a teen who&apos;s interested in coding, hardware, robotics, or just hacking, consider <a href="https://hackclub.com/slack" target="_blank" rel="noopener noreferrer" className="underline">joining us here</a>!</p>
      </section>
    </>
  );
}
