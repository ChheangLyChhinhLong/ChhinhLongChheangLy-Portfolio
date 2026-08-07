export default function Loading() {
  return (
    <div className="page-shell max-w-3xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="h-11 w-full animate-pulse rounded-2xl bg-zinc-200 dark:bg-primary-bg sm:w-52"></span>
        <div className="grid grid-cols-2 items-center gap-2">
          <span className="w-28 h-11 dark:bg-primary-bg bg-zinc-200 rounded-sm animate-pulse"></span>
          <span className="w-28 h-11 dark:bg-primary-bg bg-zinc-200 rounded-sm animate-pulse"></span>
        </div>
      </div>
      <div className="w-full h-96 mb-8 dark:bg-primary-bg bg-zinc-200 rounded-sm animate-pulse"></div>
      <div className="flex flex-col gap-y-2">
        <span className="w-full h-5 dark:bg-primary-bg bg-zinc-200 rounded-sm animate-pulse"></span>
        <span className="w-full h-5 dark:bg-primary-bg bg-zinc-200 rounded-sm animate-pulse"></span>
      </div>
    </div>
  );
}
