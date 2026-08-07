"use client";

import { useState } from "react";
import { BiCopy } from "react-icons/bi";
import { RiCheckboxCircleFill } from "react-icons/ri";

export default function Clipoboard({ content }: { content: string }) {
  const [status, setStatus] = useState(false);

  function handleClipboard() {
    navigator.clipboard.writeText(content);
    setStatus(true);

    setTimeout(() => {
      setStatus((status) => !status);
    }, 1500);
  }

  return (
    <button
      type="button"
      onClick={handleClipboard}
      className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-black/[0.05] active:scale-90 dark:hover:bg-white/[0.08]"
      aria-label={status ? "Copied to clipboard" : "Copy code to clipboard"}
    >
      {!status ? (
        <BiCopy />
      ) : (
        <RiCheckboxCircleFill className="text-secondary-color transition" />
      )}
    </button>
  );
}
