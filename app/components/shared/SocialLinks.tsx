"use client";

import type { CSSProperties } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
  getSocialLinks,
  type SocialPlatformId,
} from "@/lib/social-data";

export type SocialLinksVariant =
  | "floating-bar"
  | "grid-cards"
  | "footer-minimal";

type SocialLinksProps = {
  variant?: SocialLinksVariant;
  platforms?: SocialPlatformId[];
  showExtensions?: boolean;
  className?: string;
};

const floatingPlatforms: SocialPlatformId[] = [
  "github",
  "linkedin",
  "instagram",
  "youtube",
  "email",
];

const joinClasses = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

export default function SocialLinks({
  variant = "footer-minimal",
  platforms,
  showExtensions = variant === "grid-cards",
  className,
}: SocialLinksProps) {
  const selectedPlatforms =
    platforms ?? (variant === "floating-bar" ? floatingPlatforms : undefined);
  const links = getSocialLinks(selectedPlatforms).filter(
    (item) => showExtensions || item.category === "primary",
  );

  if (links.length === 0) return null;

  const triggerHaptic = () => navigator.vibrate?.(8);

  if (variant === "grid-cards") {
    return (
      <ul
        className={joinClasses(
          "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
          className,
        )}
        aria-label="Social media links"
      >
        {links.map((item) => {
          const Icon = item.icon;
          const style = {
            "--social-color": item.color,
          } as CSSProperties;

          return (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${item.name} profile in a new tab`}
                onClick={triggerHaptic}
                style={style}
                className="group relative flex h-full min-h-[8rem] items-center gap-4 overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[var(--social-color)] hover:shadow-[0_20px_55px_color-mix(in_srgb,var(--social-color)_20%,transparent)] active:scale-95 dark:border-white/10 dark:bg-black/25 lg:backdrop-blur-xl"
              >
                <span
                  className="pointer-events-none absolute -left-8 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-35"
                  style={{ background: item.glow }}
                />
                <span
                  className="relative grid h-14 w-14 flex-none place-items-center rounded-[1.25rem] border border-white/30 bg-white/55 text-2xl shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/10 lg:backdrop-blur-xl"
                  style={{ color: item.color }}
                >
                  <Icon aria-hidden="true" />
                </span>
                <span className="relative min-w-0 flex-1">
                  <span className="block font-incognito text-base font-semibold tracking-tight">
                    {item.name}
                  </span>
                  <span className="mt-1 block truncate text-sm text-zinc-500 dark:text-zinc-400">
                    {item.displayUsername}
                  </span>
                </span>
                <HiOutlineExternalLink
                  className="relative flex-none text-lg text-zinc-400 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--social-color)]"
                  aria-hidden="true"
                />
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  if (variant === "floating-bar") {
    return (
      <ul
        className={joinClasses(
          "items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1.5 shadow-[0_16px_45px_rgba(15,23,42,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-black/30",
          className ?? "flex",
        )}
        aria-label="Social media quick links"
      >
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.id} className="relative">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${item.name} in a new tab`}
                onClick={triggerHaptic}
                className="group relative grid h-11 w-11 place-items-center rounded-full border border-transparent text-zinc-500 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/40 active:scale-90 dark:text-zinc-400 dark:hover:border-white/10 dark:hover:bg-white/10"
              >
                <span
                  className="pointer-events-none absolute inset-1 rounded-full opacity-0 blur-md transition-opacity duration-200 group-hover:opacity-45"
                  style={{ background: item.glow }}
                />
                <Icon
                  className="relative text-base transition-transform duration-200 group-hover:scale-110"
                  style={{ color: item.color }}
                  aria-hidden="true"
                />
                <span className="pointer-events-none absolute left-1/2 top-[calc(100%+0.65rem)] z-50 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-zinc-950/90 px-2.5 py-1 text-[10px] font-semibold text-white opacity-0 shadow-xl backdrop-blur-xl transition duration-200 group-hover:translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {item.name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul
      className={joinClasses("flex flex-wrap items-center gap-2", className)}
      aria-label="Social media links"
    >
      {links.map((item) => {
        const Icon = item.icon;

        return (
          <li key={item.id}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${item.name} in a new tab`}
              onClick={triggerHaptic}
              className="group relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-black/[0.06] bg-white/40 text-zinc-500 backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/30 active:scale-90 dark:border-white/10 dark:bg-white/[0.06] lg:backdrop-blur-xl"
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 blur-lg transition-opacity duration-200 group-hover:opacity-45"
                style={{ background: item.glow }}
              />
              <Icon
                className="relative text-base transition-transform duration-200 group-hover:scale-110"
                style={{ color: item.color }}
                aria-hidden="true"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
