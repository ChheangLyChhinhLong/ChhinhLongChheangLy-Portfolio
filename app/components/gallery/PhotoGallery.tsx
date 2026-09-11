"use client";

import { useMemo, useState } from "react";
import { BiImages } from "react-icons/bi";
import type { PhotoType } from "@/types";
import { inferPhotoCategory, photoCategories, type PhotoCategory } from "@/app/data/photos";
import PhotoLightbox from "../shared/PhotoLightbox";

export default function PhotoGallery({ photos }: { photos: PhotoType[] }) {
  const [category, setCategory] = useState<PhotoCategory>("All");
  const visiblePhotos = useMemo(() => photos.filter((photo) => category === "All" || (photo.category || inferPhotoCategory(photo.title, photo.location)) === category), [category, photos]);

  return <section aria-label="Photo gallery"><div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-indigo-500/10 text-xl text-indigo-500"><BiImages /></span><div><p className="text-sm font-semibold">Browse the archive</p><p className="text-xs text-zinc-500 dark:text-zinc-400">{visiblePhotos.length} {visiblePhotos.length === 1 ? "frame" : "frames"}</p></div></div><div className="flex gap-2 overflow-x-auto pb-2 touch-scroll" role="tablist" aria-label="Filter photos by category">{photoCategories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={`min-h-[44px] shrink-0 rounded-full px-4 text-xs font-semibold transition active:scale-95 ${category === item ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950" : "border border-black/[0.08] bg-white/40 text-zinc-500 dark:border-white/[0.1] dark:bg-white/[0.05]"}`}>{item}</button>)}</div></div>{visiblePhotos.length ? <PhotoLightbox photos={visiblePhotos} /> : <div className="glass rounded-[28px] border-dashed p-10 text-center"><p className="text-lg font-semibold">No frames in this category yet</p><p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Choose another category or publish a new photo from Sanity Studio.</p><button type="button" onClick={() => setCategory("All")} className="ios-button-primary mt-6">View all photos</button></div>}</section>;
}