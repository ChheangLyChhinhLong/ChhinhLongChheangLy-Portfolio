"use client";

import { useTheme } from "next-themes";
import Giscus from "@giscus/react";
import { siteConfig } from "@/lib/env";

export default function Comments() {
  const theme = useTheme();
  const giscusTheme =
    theme.theme === "light"
      ? "light"
      : theme.theme === "dark"
      ? "transparent_dark"
      : "dark";

  return (
    <Giscus
      id="comments"
      repo={siteConfig.giscusRepo as `${string}/${string}`}
      repoId={siteConfig.giscusRepositoryId}
      category={siteConfig.giscusCategory}
      categoryId={siteConfig.giscusCategoryId}
      mapping="title"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={giscusTheme}
      lang="en"
      loading="lazy"
    />
  );
}
