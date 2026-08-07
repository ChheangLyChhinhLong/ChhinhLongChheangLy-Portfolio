import { MouseEventHandler } from "react";

export default function YearButton({
  year,
  currentYear,
  onClick,
}: {
  year: number;
  currentYear: number | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`glass min-h-[44px] rounded-full px-4 py-2 text-center text-sm font-medium transition duration-200 active:scale-95 ${
        year === currentYear
          ? "border-transparent bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400"
          : "text-zinc-600 dark:text-zinc-300"
      }`}
      title={`View Graph for the year ${year}`}
    >
      {year}
    </button>
  );
}
