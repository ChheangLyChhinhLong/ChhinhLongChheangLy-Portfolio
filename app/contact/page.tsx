import type { Metadata } from "next";
import { BiArrowBack, BiEnvelope, BiRightTopArrowCircle } from "react-icons/bi";
import Link from "next/link";
import ContactForm from "../components/shared/ContactForm";
import { brandName, fullName, siteUrl } from "../data/site";
import { siteConfig, socialConfig } from "@/lib/env";

export const metadata: Metadata = {
  title: `Contact | ${brandName}`,
  metadataBase: new URL(`${siteUrl}/contact`),
  description: `Start a conversation with ${fullName}.`,
  openGraph: { title: `Contact | ${brandName}`, url: `${siteUrl}/contact`, description: `Start a conversation with ${fullName}.`, images: siteConfig.siteOgImage },
};

export default function ContactPage() {
  return (
    <main className="page-shell">
      <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-indigo-500"><BiArrowBack /> Back home</Link>
      <section className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <p className="eyebrow mb-5">Open channel</p>
          <h1 className="max-w-lg font-incognito text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl">Let&apos;s make something useful.</h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-500 dark:text-zinc-400">Have a product idea, a technical problem, or a collaboration in mind? Send the shape of it. I&apos;ll reply with a thoughtful next step.</p>
          <a href={`mailto:${socialConfig.email}`} className="mt-8 inline-flex items-center gap-3 text-sm font-semibold transition hover:text-indigo-500"><span className="grid h-10 w-10 place-items-center rounded-full bg-indigo-500/10 text-xl text-indigo-500"><BiEnvelope /></span>{socialConfig.email}<BiRightTopArrowCircle /></a>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}