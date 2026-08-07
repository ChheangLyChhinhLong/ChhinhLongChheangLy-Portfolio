import { Metadata } from "next";
import PageHeading from "@/app/components/shared/PageHeading";
import PhotoLightbox from "../components/shared/PhotoLightbox";
import { brandName, siteUrl } from "../data/site";
import { siteConfig } from "@/lib/env";
import { photosQuery } from "@/lib/sanity.query";
import { sanityFetch } from "@/lib/sanity.client";
import type { PhotoType } from "@/types";
import EmptyState from "../components/shared/EmptyState";

export const metadata: Metadata = {
  title: `Photos | ${brandName}`,
  metadataBase: new URL(`${siteUrl}/photos`),
  description: `Explore photos taken by ${brandName}`,
  openGraph: {
    title: `Photos | ${brandName}`,
    url: `${siteUrl}/photos`,
    description: `Explore photos taken by ${brandName}`,
    images: siteConfig.photosOgImage,
  },
};

export default async function Photos() {
  const photos = await sanityFetch<PhotoType[]>({
    query: photosQuery,
    tags: ["photo"],
  });

  return (
    <main className="page-shell">
      <PageHeading
        title="Photos"
        description="A small visual archive of places, ideas, and moments between builds. Tap any frame to bring it forward."
      />
      <section className="my-6 sm:my-8" aria-label="Photo gallery">
        {photos.length > 0 ? (
          <PhotoLightbox photos={photos} />
        ) : (
          <EmptyState
            value="Photos"
            title="The gallery is ready for its first frame"
            message="Upload and publish a photo from the Photos Gallery section in Studio, then it will appear here automatically."
          />
        )}
      </section>
    </main>
  );
}
