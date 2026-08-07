"use client";

import {
  BiLogoTwitter,
  BiLogoLinkedinSquare,
  BiLogoFacebookSquare,
  BiLogoWhatsapp,
} from "react-icons/bi";
import { siteUrl } from "../../data/site";

type props = {
  title: string;
  slug: string;
  description: string;
};

export default function SharePost({ title, slug, description }: props) {
  const postUrl = `${siteUrl}/blog/${slug}`;
  const encodedPostUrl = encodeURIComponent(postUrl);
  const options = [
    {
      icon: BiLogoTwitter,
      name: "Twitter",
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Thank you @ChhinhLong for writing this post.\n\n${title}\n\n${postUrl}`)}`,
    },
    {
      icon: BiLogoLinkedinSquare,
      name: "LinkedIn",
      shareUrl: `https://linkedin.com/sharing/share-offsite/?url=${encodedPostUrl}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
    },
    {
      icon: BiLogoFacebookSquare,
      name: "Facebook",
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedPostUrl}`,
    },
    {
      icon: BiLogoWhatsapp,
      name: "WhatsApp",
      shareUrl: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Read this amazing article by ChhinhLong\n\n${title}\n\n${postUrl}`)}`,
    },
  ];

  const openPopup = (url: string) => {
    window.open(
      url,
      "Social Share",
      "width=600,height=600,resizable=yes,scrollbars=yes,status=yes"
    );
  };

  return (
    <section className="border-b dark:border-zinc-800 border-zinc-200 pb-10">
      <h3 className="text-xl font-semibold tracking-tight mb-4">Share Post</h3>

      <div className="flex flex-wrap items-center gap-2 tracking-tight">
        {options.map((data, id) => (
          <button
            key={id}
            onClick={() => openPopup(data.shareUrl)}
            title={`Share to ${data.name}`}
            aria-label={`Share to ${data.name}`}
            className="w-12 h-12 p-2 grid place-content-center text-2xl dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 rounded-md"
          >
            <data.icon aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
