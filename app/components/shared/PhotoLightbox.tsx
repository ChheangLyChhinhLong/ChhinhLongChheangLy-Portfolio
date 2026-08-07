"use client";

import Image from "next/image";
import type {
  ButtonHTMLAttributes,
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  RefAttributes,
} from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  type MotionProps,
  useReducedMotion,
} from "framer-motion";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineX,
} from "react-icons/hi";
import type { PhotoType } from "@/types";

type MotionDivProps = Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps> &
  MotionProps;
type MotionButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof MotionProps
> &
  MotionProps;

const MotionDiv = motion.div as ComponentType<
  MotionDivProps & RefAttributes<HTMLDivElement>
>;
const MotionButton = motion.button as ComponentType<MotionButtonProps>;

function getAspectRatio(photo: PhotoType) {
  const { width, height, aspectRatio } = photo.dimensions ?? {};

  if (aspectRatio && aspectRatio > 0) return aspectRatio;
  if (width && height && width > 0 && height > 0) return width / height;
  return 4 / 5;
}

function formatTakenAt(value?: string) {
  if (!value) return null;

  const datePart = value.slice(0, 10);
  const date = new Date(`${datePart}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function PhotoLightbox({ photos }: { photos: PhotoType[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isOpen = selectedIndex !== null;
  const selected = selectedIndex === null ? null : photos[selectedIndex];

  const close = useCallback(() => setSelectedIndex(null), []);
  const open = useCallback((index: number) => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setSelectedIndex(index);
  }, []);
  const move = useCallback(
    (direction: number) => {
      setSelectedIndex((current) => {
        if (current === null || photos.length < 2) return current;
        return (current + direction + photos.length) % photos.length;
      });
    },
    [photos.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      returnFocusRef.current?.focus();
    };
  }, [close, isOpen, move]);

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {photos.map((photo, index) => {
          const aspectRatio = getAspectRatio(photo);
          const date = formatTakenAt(photo.takenAt);

          return (
            <MotionButton
              key={photo._id}
              type="button"
              onClick={() => open(index)}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              className="group relative mb-3 block min-h-[44px] w-full break-inside-avoid overflow-hidden rounded-2xl bg-zinc-200 text-left shadow-glass outline-none ring-offset-2 transition-shadow duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary-color md:mb-4 md:rounded-3xl dark:bg-zinc-800 dark:shadow-glass-dark"
              style={{ aspectRatio } as CSSProperties}
              aria-label={`Open ${photo.title}, photo ${index + 1} of ${photos.length}`}
            >
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                placeholder={photo.blurDataURL ? "blur" : "empty"}
                blurDataURL={photo.blurDataURL}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105"
              />

              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-3 pb-3 pt-10 text-white opacity-100 transition-opacity duration-300 md:px-4 md:pb-4 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                <span className="block rounded-xl border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-md">
                  <span className="block truncate text-sm font-semibold">
                    {photo.title}
                  </span>
                  {photo.location || date ? (
                    <span className="mt-0.5 block truncate text-[11px] text-white/75">
                      {[photo.location, date].filter(Boolean).join(" · ")}
                    </span>
                  ) : null}
                </span>
              </span>

              {photo.featured ? (
                <span className="absolute right-2 top-2 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md md:right-3 md:top-3">
                  Featured
                </span>
              ) : null}
            </MotionButton>
          );
        })}
      </div>

      <AnimatePresence>
        {selected ? (
          <MotionDiv
            key="photo-lightbox"
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-3 outline-none backdrop-blur-2xl sm:p-6"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-labelledby="photo-lightbox-title"
            aria-describedby="photo-lightbox-details"
          >
            <div className="absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-xs font-semibold text-white/80 backdrop-blur-xl sm:left-6 sm:top-6">
              {selectedIndex! + 1} / {photos.length}
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                close();
              }}
              aria-label="Close photo preview"
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/35 text-xl text-white backdrop-blur-xl transition hover:bg-white/15 active:scale-95 sm:right-6 sm:top-6"
            >
              <HiOutlineX aria-hidden="true" />
            </button>

            {photos.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    move(-1);
                  }}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-2xl text-white backdrop-blur-xl transition hover:bg-white/15 active:scale-95 sm:left-6"
                >
                  <HiChevronLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    move(1);
                  }}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-2xl text-white backdrop-blur-xl transition hover:bg-white/15 active:scale-95 sm:right-6"
                >
                  <HiChevronRight aria-hidden="true" />
                </button>
              </>
            ) : null}

            <MotionDiv
              key={selected._id}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 44, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              drag={photos.length > 1 && !shouldReduceMotion ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70 || info.velocity.x < -450) move(1);
                if (info.offset.x > 70 || info.velocity.x > 450) move(-1);
              }}
              onClick={(event) => event.stopPropagation()}
              className="relative h-[calc(100dvh-1.5rem)] w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-black/25 shadow-2xl sm:h-[calc(100dvh-3rem)]"
              style={{ touchAction: "pinch-zoom" }}
            >
              <Image
                src={selected.imageUrl}
                alt={selected.title}
                fill
                sizes="100vw"
                placeholder={selected.blurDataURL ? "blur" : "empty"}
                blurDataURL={selected.blurDataURL}
                className="select-none object-contain"
                draggable={false}
                priority
              />

              <div
                id="photo-lightbox-details"
                className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-black/45 p-4 text-white shadow-float-dark backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:p-5"
              >
                <h2
                  id="photo-lightbox-title"
                  className="pr-2 text-base font-semibold sm:text-lg"
                >
                  {selected.title}
                </h2>
                {selected.location || selected.takenAt ? (
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/75 sm:text-sm">
                    {selected.location ? (
                      <span className="inline-flex items-center gap-1.5">
                        <HiOutlineLocationMarker aria-hidden="true" />
                        {selected.location}
                      </span>
                    ) : null}
                    {formatTakenAt(selected.takenAt) ? (
                      <time
                        dateTime={selected.takenAt}
                        className="inline-flex items-center gap-1.5"
                      >
                        <HiOutlineCalendar aria-hidden="true" />
                        {formatTakenAt(selected.takenAt)}
                      </time>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </MotionDiv>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </>
  );
}
