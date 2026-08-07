"use client";
import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

export default function Accordion({
  id,
  question,
  answer,
}: {
  id: string;
  question: string;
  answer: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={`grid gap-y-2 border-b dark:border-zinc-800 border-zinc-200 my-4 duration-200 ${active === id ? "grid-rows-full pb-4" : "grid-rows-fit pb-0"}`}
    >
      <button
        type="button"
        className="flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-x-2 py-2 text-left selection:bg-transparent"
        onClick={() => setActive(active === id ? null : id)}
        aria-expanded={active === id}
        aria-controls={`${id}-answer`}
      >
        <h3 className="text-lg mb-1 dark:text-white text-zinc-700">
          {question}
        </h3>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm duration-100 dark:bg-primary-bg bg-secondary-bg">
          {active === id ? <BiMinus /> : <BiPlus />}
        </span>
      </button>
      <p id={`${id}-answer`} className="dark:text-zinc-400 text-zinc-600 overflow-hidden">
        {answer}
      </p>
    </div>
  );
}
