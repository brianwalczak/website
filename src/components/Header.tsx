export default function Header() {
    return (
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
    );
}
