import Image from "next/image";
import sanityLogo from "@/public/sanity.png";
import vercelLogo from "@/public/vercel.svg";
import nextjsLogo from "@/public/nextjs.svg";
import { brandName, fullName } from "@/app/data/site";
import { paywayConfig } from "@/lib/server-env";
import UnmountStudio from "./Unmount";
import PayWayWidget from "../widgets/PayWayWidget";
import SocialLinks from "../shared/SocialLinks";

const footerSocials = [
  "github",
  "linkedin",
  "facebook",
  "instagram",
  "youtube",
  "tiktok",
  "x",
  "telegram",
  "email",
] as const;

const stack = [
  { name: "Sanity", href: "https://sanity.io", logo: sanityLogo },
  { name: "Next.js", href: "https://nextjs.org", logo: nextjsLogo },
  { name: "Vercel", href: "https://vercel.com", logo: vercelLogo },
];

export default function Footer() {
  return (
    <UnmountStudio>
      <footer className="relative mt-24 px-4 pb-5 md:px-8 lg:mt-36 lg:pb-8">
        <div className="glass-strong relative mx-auto max-w-7xl overflow-hidden rounded-[32px] p-6 sm:p-8 lg:rounded-[38px] lg:p-10">
          <div className="pointer-events-none absolute -left-20 -top-28 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <section className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <p className="eyebrow mb-4">Let&apos;s build what&apos;s next</p>
              <h2 className="max-w-lg text-4xl font-semibold leading-none tracking-[-0.045em] sm:text-5xl">
                Keep it fluid.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                Thoughtful software, open experiments, and small details that
                make the web feel more human.
              </p>
              <div className="mt-7 w-full lg:max-w-sm">
                <PayWayWidget
                  baseUrl={paywayConfig.baseUrl}
                  khrCode={paywayConfig.khrCode}
                  usdCode={paywayConfig.usdCode}
                />
              </div>
            </section>

            <div className="flex min-w-0 flex-col items-center justify-between gap-9 text-center lg:items-end">
              <section className="lg:text-right" aria-labelledby="footer-stack-title">
                <p
                  id="footer-stack-title"
                  className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-500"
                >
                  Built with
                </p>
                <ul className="flex flex-wrap justify-center gap-2 lg:justify-end">
                  {stack.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[44px] items-center gap-2 rounded-full border border-black/[0.07] bg-white/45 px-3.5 py-2 text-xs font-semibold shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/70 active:scale-95 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/10 lg:backdrop-blur-xl"
                      >
                        <Image
                          src={item.logo}
                          width={16}
                          height={16}
                          alt=""
                          aria-hidden="true"
                          className="h-4 w-4 object-contain"
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="min-w-0 lg:text-right" aria-labelledby="footer-connect-title">
                <p
                  id="footer-connect-title"
                  className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-500"
                >
                  Connect
                </p>
                <div className="inline-flex max-w-full rounded-[22px] border border-black/[0.06] bg-white/30 p-2 shadow-sm backdrop-blur-md dark:border-white/[0.08] dark:bg-black/20 lg:backdrop-blur-2xl">
                  <SocialLinks
                    variant="footer-minimal"
                    platforms={[...footerSocials]}
                    className="gap-1.5"
                  />
                </div>
              </section>

              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 lg:text-right">
                © {fullName} <span aria-hidden="true">•</span>{" "}
                {new Date().getFullYear()} <span aria-hidden="true">•</span>{" "}
                {brandName}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </UnmountStudio>
  );
}
