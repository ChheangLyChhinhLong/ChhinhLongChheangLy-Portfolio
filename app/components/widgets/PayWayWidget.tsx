"use client";

import { useCallback, useState } from "react";
import { HiOutlineQrcode } from "react-icons/hi";
import { PayWayModal } from "@/app/components/shared/PayWayModal";

type PayWayProps = {
  baseUrl?: string;
  khrCode?: string;
  usdCode?: string;
  compact?: boolean;
};

export default function PayWayWidget({
  baseUrl,
  khrCode,
  usdCode,
  compact = false,
}: PayWayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = useCallback(() => setIsOpen(false), []);

  if (!baseUrl || (!khrCode && !usdCode)) {
    return (
      <p className="rounded-[20px] border border-black/[0.07] bg-black/[0.03] p-4 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-400">
        PayWay transfer is temporarily unavailable.
      </p>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group flex min-h-[44px] w-full items-center justify-between border border-black/[0.07] bg-white/55 text-left shadow-[0_16px_45px_rgba(59,130,246,0.1)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-blue-400/25 hover:shadow-[0_20px_55px_rgba(59,130,246,0.17)] active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.06] lg:backdrop-blur-2xl ${
          compact ? "rounded-[22px] p-4" : "rounded-[26px] p-5"
        }`}
      >
        <span>
          <span className="mb-1.5 flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-300">
            <HiOutlineQrcode aria-hidden="true" /> ABA PayWay
          </span>
          <span className="block text-sm font-semibold tracking-tight">
            Support the next experiment
          </span>
        </span>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-blue-400/15 bg-blue-500/10 text-xl text-blue-500 transition duration-300 group-hover:rotate-6 group-hover:bg-blue-500/15 dark:text-blue-300">
          <HiOutlineQrcode aria-hidden="true" />
        </span>
      </button>

      <PayWayModal
        isOpen={isOpen}
        onClose={closeModal}
        baseUrl={baseUrl}
        khrCode={khrCode}
        usdCode={usdCode}
      />
    </>
  );
}
