import Image from "next/image";
import duckImage from "@/public/searching-duck.gif";

type stateType = {
  value?: string;
  icon?: React.ReactNode;
  title?: string;
  message?: string;
};

export default function EmptyState({ value, title, icon, message }: stateType) {
  return (
    <div className="glass flex w-full flex-col items-center rounded-[28px] border-dashed px-6 py-12 text-center">
      <div className="mb-6 text-4xl text-zinc-500">
        {icon || (
          <Image
            width={80}
            height={80}
            src={duckImage}
            alt="Yellow duck searching"
          />
        )}
      </div>
      <h3 className="   font-bold tracking-tight text-xl mb-3">
        {title ?? `No ${value} Found`}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 ml-4 max-w-sm">
        {message ??
          `There are no ${
            value && value.toLowerCase()
          } available at this time. Check back
        again.`}
      </p>
    </div>
  );
}
