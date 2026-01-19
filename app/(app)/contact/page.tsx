import { CONTACT_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import ContactCard from '@/components/ContactCard';

export default async function Contact() {
    return (
        <div className="max-w-5xl space-y-6 mt-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-y-2">
                <h1 className="text-4xl font-semibold">Contact me</h1>
                <p className="text-zinc-400">Feel free to contact me through any of the options below.</p>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {CONTACT_LINKS.map((props) => (
                    <ContactCard key={props.label} {...props} />
                ))}
            </section>

            <section className="mt-5">
                <h3 className="text-xl font-semibold mb-4">Other stuff</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {SOCIAL_LINKS.map((props) => (
                        <ContactCard key={props.label} {...props} />
                    ))}
                </div>
            </section>
        </div>
    )
}