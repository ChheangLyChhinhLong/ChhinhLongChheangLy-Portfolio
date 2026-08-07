import SocialLinks from "./SocialLinks";
import type { SocialPlatformId } from "@/lib/social-data";

const publicationPlatforms: SocialPlatformId[] = [
  "devto",
  "hashnode",
  "medium",
  "sanity",
];

export default function Social({ type }: { type: "social" | "publication" }) {
  return type === "publication" ? (
    <SocialLinks
      variant="floating-bar"
      platforms={publicationPlatforms}
      showExtensions
      className="my-10 flex w-fit"
    />
  ) : (
    <SocialLinks variant="floating-bar" className="my-10 flex w-fit" />
  );
}
