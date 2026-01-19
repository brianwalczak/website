import { CONTACT_LINKS } from '@/lib/constants';

export default async function Contact() {
    return (
        <div className="max-w-5xl space-y-6 mt-20">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold">Contact me</h1>
                <p className="text-zinc-400">Feel free to contact me through any of the options below.</p>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {CONTACT_LINKS.map(({ label, value, url, icon }) => (
                    <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center border border-white/10 bg-zinc-900 hover:bg-zinc-800 rounded-xl p-6 gap-4 transition">
                        <div className="text-purple-400">{icon}</div>

                        <div className="flex-1">
                            <div className="font-semibold text-zinc-100 truncate">{label}</div>
                            <div className="text-sm text-zinc-400 truncate">{value}</div>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" className="text-zinc-500 size-3.5" fill="currentColor" viewBox="0 0 512 512"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0-201.4 201.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3 448 192c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 96C35.8 96 0 131.8 0 176L0 432c0 44.2 35.8 80 80 80l256 0c44.2 0 80-35.8 80-80l0-80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 80c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l80 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 96z"/></svg>
                    </a>
                ))}
            </section>
        </div>
    )
}