import { Metadata } from "next";
import PageHeading from "@/app/components/shared/PageHeading";
import { brandName, siteUrl } from "../data/site";
import { siteConfig } from "@/lib/env";
import { photosQuery } from "@/lib/sanity.query";
import { sanityFetch } from "@/lib/sanity.client";
import type { PhotoType } from "@/types";
import EmptyState from "../components/shared/EmptyState";
import PhotoGallery from "../components/gallery/PhotoGallery";

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
        title="Event & Workshop Gallery"
        description="A visual archive of academic milestones, workshops, technical activities, and project showcases. Filter the moments, then bring any frame forward."
      />
      <section className="my-6 sm:my-8" aria-label="Photo gallery">
        {photos.length > 0 ? (
          <PhotoGallery photos={photos} />
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
