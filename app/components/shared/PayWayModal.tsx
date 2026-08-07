"use client";

/* eslint-disable @next/next/no-img-element */

import type { ComponentType, HTMLAttributes } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, type MotionProps } from "framer-motion";
import {
  HiOutlineExternalLink,
  HiOutlineQrcode,
  HiOutlineX,
} from "react-icons/hi";

export type PayWayCurrency = "KHR" | "USD";

type MotionDivProps = Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps> & MotionProps;
const MotionDiv = motion.div as ComponentType<MotionDivProps>;

interface PayWayModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseUrl: string;
  khrCode?: string;
  usdCode?: string;
}

function createPayWayLink(baseUrl: string, code: string) {
  if (baseUrl.includes("{code}")) {
    return baseUrl.replace("{code}", encodeURIComponent(code));
  }

  return `${baseUrl.replace(/\/$/, "")}/${code.replace(/^\//, "")}`;
}

export function PayWayModal({
  isOpen,
  onClose,
  baseUrl,
  khrCode,
  usdCode,
}: PayWayModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currency, setCurrency] = useState<PayWayCurrency>(
    khrCode ? "KHR" : "USD",
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (currency === "KHR" && !khrCode && usdCode) setCurrency("USD");
    if (currency === "USD" && !usdCode && khrCode) setCurrency("KHR");
  }, [currency, khrCode, usdCode]);

  const activeCode = currency === "KHR" ? khrCode : usdCode;
  const paywayLink = useMemo(
    () => (activeCode ? createPayWayLink(baseUrl, activeCode) : baseUrl),
    [activeCode, baseUrl],
  );
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&format=png&margin=8&data=${encodeURIComponent(paywayLink)}`;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="fixed inset-0 z-[100] flex items-end bg-black/70 p-0 backdrop-blur-md md:grid md:place-items-center md:p-4"
            role="presentation"
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              onClick={onClose}
              aria-label="Close PayWay transfer"
            />

            <MotionDiv
              initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              drag={isMobile ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.35 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 110 || info.velocity.y > 650) onClose();
              }}
              className="w-full md:w-auto"
            >
              <div
                className="touch-scroll safe-bottom relative max-h-[92dvh] w-full overflow-x-hidden overflow-y-auto rounded-t-[32px] border border-white/15 bg-zinc-950/95 px-5 pb-5 pt-3 text-zinc-100 shadow-[0_32px_100px_rgba(0,0,0,0.65)] backdrop-blur-md md:w-[calc(100vw-2rem)] md:max-w-sm md:rounded-[32px] md:p-6 md:backdrop-blur-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="payway-modal-title"
                aria-describedby="payway-modal-description"
              >
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/25 md:hidden" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-16 -top-20 h-52 w-52 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-12 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.07] text-zinc-400 transition hover:bg-white/15 hover:text-white active:scale-90"
              aria-label="Close PayWay transfer"
            >
              <HiOutlineX className="text-lg" aria-hidden="true" />
            </button>

            <header className="relative text-center">
              <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-blue-400">
                <HiOutlineQrcode aria-hidden="true" /> PayWay transfer
              </span>
              <h2
                id="payway-modal-title"
                className="mt-2 text-2xl font-semibold tracking-tight text-white"
              >
                Support my work
              </h2>
              <p id="payway-modal-description" className="mt-2 pr-8 text-sm text-zinc-400 md:pr-0">
                Choose a currency, then scan with your banking app.
              </p>
            </header>

            <div
              className="relative mt-5 grid grid-cols-2 rounded-[14px] border border-white/[0.07] bg-white/[0.06] p-1"
              aria-label="Transfer currency"
            >
              {(["KHR", "USD"] as const).map((option) => {
                const isAvailable = option === "KHR" ? !!khrCode : !!usdCode;
                const isActive = currency === option;

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setCurrency(option)}
                    className={`min-h-[44px] rounded-[10px] px-2 py-2 text-xs font-semibold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-[0_5px_18px_rgba(37,99,235,0.35)]"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    aria-pressed={isActive}
                  >
                    {option === "KHR" ? "KHR (៛)" : "USD ($)"}
                  </button>
                );
              })}
            </div>

            <div className="relative mx-auto mt-5 w-full max-w-[19rem] rounded-[24px] bg-white p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_18px_50px_rgba(0,0,0,0.28)] md:p-4">
              <img
                src={qrCodeUrl}
                alt={`ABA PayWay ${currency} transfer QR code`}
                width="500"
                height="500"
                className="aspect-square h-auto w-full object-contain"
              />
            </div>

            <p className="relative mt-4 text-center text-xs leading-relaxed text-zinc-400">
              Scan with ABA Mobile or any KHQR-supported banking app.
            </p>

            <a
              href={paywayLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.14] active:scale-[0.98]"
            >
              Open PayWay
              <HiOutlineExternalLink aria-hidden="true" />
            </a>
              </div>
            </MotionDiv>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
