"use client";

import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;

    return (
        <header className="flex items-center justify-between">
            <span className="mono text-sm text-zinc-200">
                Brian&apos;s Cabin
                <span className="opacity-20 hidden sm:inline"> | </span>
                <a className="hover:text-zinc-400 active:text-zinc-600 transition hidden sm:inline" href="mailto:me@brian.re"
                    target="_blank">me@brian.re</a>
            </span>

            <nav className="flex gap-10 text-base font-medium text-zinc-400">
                <a href="/" className={isActive('/') ? 'text-zinc-100' : 'hover:text-zinc-100 transition'}>Home</a>
                <a href="/blog" className={isActive('/blog') ? 'text-zinc-100' : 'hover:text-zinc-100 transition'}>Blog</a>
                <a href="/contact" className={isActive('/contact') ? 'text-zinc-100' : 'hover:text-zinc-100 transition'}>Contact</a>
            </nav>
        </header>
    );
}
