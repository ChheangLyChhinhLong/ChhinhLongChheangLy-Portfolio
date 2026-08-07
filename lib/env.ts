export type PublicSiteConfig = {
  fullName: string;
  brandName: string;
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  studioName: string;
  siteOgImage: string;
  blogOgImage: string;
  projectsOgImage: string;
  photosOgImage: string;
  resumeUrl: string;
  googleSiteVerification: string;
  umamiWebsiteId: string;
  umamiScriptUrl: string;
  giscusRepo: string;
  giscusRepositoryId: string;
  giscusCategory: string;
  giscusCategoryId: string;
  githubUsername: string;
  githubJoinYear: number;
};

const value = (input: string | undefined, fallback: string) => input?.trim() || fallback;
const socialValue = (input: string | undefined, fallback = "") =>
  input === undefined ? fallback : input.trim();

function absoluteUrl(
  input: string | undefined,
  fallback: string,
  name: string,
) {
  const resolvedValue = value(input, fallback).replace(/\/$/, "");

  try {
    return new URL(resolvedValue).toString().replace(/\/$/, "");
  } catch {
    throw new Error(`Invalid Environment Variable: ${name} must be a URL`);
  }
}

function yearValue(input: string | undefined) {
  const parsedValue = Number(input);
  const currentYear = new Date().getFullYear();

  return Number.isInteger(parsedValue) && parsedValue >= 2008 && parsedValue <= currentYear
    ? parsedValue
    : currentYear;
}

export const siteConfig: PublicSiteConfig = {
  fullName: value(process.env.NEXT_PUBLIC_DEV_FULL_NAME, "ChhinhLong ChheangLy"),
  brandName: value(process.env.NEXT_PUBLIC_DEV_BRAND_NAME, "ChhinhLong"),
  siteName: value(process.env.NEXT_PUBLIC_SITE_NAME, "ChhinhLong"),
  siteTitle: value(process.env.NEXT_PUBLIC_SITE_TITLE, "ChhinhLong | Developer"),
  siteDescription: value(process.env.NEXT_PUBLIC_SITE_DESCRIPTION, "ChhinhLong ChheangLy is a developer portfolio and technical blog."),
  siteUrl: absoluteUrl(
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://chhinhlongdev.vercel.app",
    "NEXT_PUBLIC_SITE_URL",
  ),
  studioName: value(process.env.NEXT_PUBLIC_SANITY_STUDIO_NAME, "ChhinhLongDev"),
  siteOgImage: value(process.env.NEXT_PUBLIC_SITE_OG_IMAGE, "/site.png"),
  blogOgImage: value(process.env.NEXT_PUBLIC_BLOG_OG_IMAGE, "/site.png"),
  projectsOgImage: value(process.env.NEXT_PUBLIC_PROJECTS_OG_IMAGE, "/project.png"),
  photosOgImage: value(process.env.NEXT_PUBLIC_PHOTOS_OG_IMAGE, "/site.png"),
  resumeUrl: value(process.env.NEXT_PUBLIC_RESUME_URL, ""),
  googleSiteVerification: value(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION, ""),
  umamiWebsiteId: value(process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID, ""),
  umamiScriptUrl: absoluteUrl(
    process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL,
    "https://cloud.umami.is/script.js",
    "NEXT_PUBLIC_UMAMI_SCRIPT_URL",
  ),
  giscusRepo: value(process.env.NEXT_PUBLIC_GISCUS_REPO, "ChhinhLong/ChhinhLongDev-Discussions"),
  giscusRepositoryId: value(process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID, ""),
  giscusCategory: value(process.env.NEXT_PUBLIC_GISCUS_CATEGORY, "Announcements"),
  giscusCategoryId: value(process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID, ""),
  githubUsername: value(process.env.NEXT_PUBLIC_GITHUB_USERNAME, "ChhinhLong"),
  githubJoinYear: yearValue(process.env.NEXT_PUBLIC_GITHUB_JOIN_YEAR),
};

export const { fullName, brandName, siteName, siteTitle, siteDescription, siteUrl, studioName } = siteConfig;

export const socialConfig = {
  github: socialValue(
    process.env.NEXT_PUBLIC_SOCIAL_GITHUB_USERNAME,
    "chheanglychhinhlong",
  ),
  x: socialValue(process.env.NEXT_PUBLIC_SOCIAL_X_USERNAME, "chldevs"),
  linkedin: socialValue(
    process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_USERNAME,
    "chhinhlongchheangly",
  ),
  facebook: socialValue(
    process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_USERNAME,
    "chldevs",
  ),
  telegram: socialValue(
    process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM_USERNAME,
    "chhinhlong",
  ),
  email: socialValue(
    process.env.NEXT_PUBLIC_SOCIAL_EMAIL_USERNAME,
    "chhinhlong.dev@gmail.com",
  ),
  tiktok: socialValue(
    process.env.NEXT_PUBLIC_SOCIAL_TIKTOK_USERNAME,
    "chldevs",
  ),
  instagram: socialValue(
    process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_USERNAME,
    "chhinhlongdev",
  ),
  youtube: socialValue(
    process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_USERNAME,
    "chldevs",
  ),
  sanity: socialValue(process.env.NEXT_PUBLIC_SOCIAL_SANITY_USERNAME),
  spotify: socialValue(process.env.NEXT_PUBLIC_SOCIAL_SPOTIFY_USERNAME),
  appleMusic: socialValue(
    process.env.NEXT_PUBLIC_SOCIAL_APPLE_MUSIC_USERNAME,
  ),
  devto: socialValue(process.env.NEXT_PUBLIC_SOCIAL_DEVTO_USERNAME),
  hashnode: socialValue(process.env.NEXT_PUBLIC_SOCIAL_HASHNODE_USERNAME),
  medium: socialValue(process.env.NEXT_PUBLIC_SOCIAL_MEDIUM_USERNAME),
  discord: socialValue(process.env.NEXT_PUBLIC_SOCIAL_DISCORD_USERNAME),
  payway: socialValue(process.env.NEXT_PUBLIC_SOCIAL_PAYWAY_URL),
};
