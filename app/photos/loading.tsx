export default function PhotosLoading() {
  return (
    <main className="page-shell" aria-busy="true" aria-label="Loading photo gallery">
      <div className="mb-10 max-w-2xl space-y-4">
        <div className="h-4 w-32 animate-pulse rounded-full bg-zinc-300 dark:bg-zinc-800" />
        <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-zinc-300 dark:bg-zinc-800" />
        <div className="h-5 w-full max-w-xl animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-900" />
      </div>
      <div className="mb-7 flex gap-2 overflow-hidden">
        {[1, 2, 3, 4].map((item) => <div key={item} className="h-11 w-28 shrink-0 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-900" />)}
      </div>
      <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
        {["h-56", "h-72", "h-64", "h-80", "h-60", "h-72", "h-56", "h-80"].map((height, index) => <div key={index} className={`${height} mb-3 animate-pulse break-inside-avoid rounded-2xl bg-zinc-200 dark:bg-zinc-900 md:mb-4 md:rounded-3xl`} />)}
      </div>
    </main>
  );
}
