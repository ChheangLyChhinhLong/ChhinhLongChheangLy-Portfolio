import type { IconType } from "react-icons";
import { FaSquareXTwitter } from "react-icons/fa6";
import {
  SiApplemusic,
  SiDevdotto,
  SiDiscord,
  SiFacebook,
  SiGithub,
  SiGmail,
  SiHashnode,
  SiInstagram,
  SiLinkedin,
  SiMedium,
  SiSanity,
  SiSpotify,
  SiTelegram,
  SiTiktok,
  SiYoutube,
} from "react-icons/si";
import { HiOutlineCreditCard } from "react-icons/hi";
import { socialConfig } from "@/lib/env";

export type SocialPlatformId =
  | "github"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "x"
  | "telegram"
  | "email"
  | "sanity"
  | "spotify"
  | "apple-music"
  | "devto"
  | "hashnode"
  | "medium"
  | "discord"
  | "payway";

export type SocialCategory = "primary" | "creator" | "support";

export type SocialLink = {
  id: SocialPlatformId;
  name: string;
  username: string;
  displayUsername: string;
  url: string;
  icon: IconType;
  color: string;
  glow: string;
  category: SocialCategory;
};

type SocialDefinition = Omit<SocialLink, "displayUsername" | "url"> & {
  buildUrl: (username: string) => string;
};

const stripAt = (username: string) => username.trim().replace(/^@/, "");

const profileUrl = (
  username: string,
  buildUrl: (cleanUsername: string) => string,
) => {
  const value = username.trim();
  return /^https?:\/\//i.test(value) ? value : buildUrl(stripAt(value));
};

const definitions: SocialDefinition[] = [
  {
    id: "github",
    name: "GitHub",
    username: socialConfig.github,
    buildUrl: (username) => `https://github.com/${username}`,
    icon: SiGithub,
    color: "#6e5494",
    glow: "radial-gradient(circle, rgba(110,84,148,0.6), transparent 68%)",
    category: "primary",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    username: socialConfig.linkedin,
    buildUrl: (username) => `https://linkedin.com/in/${username}`,
    icon: SiLinkedin,
    color: "#0A66C2",
    glow: "radial-gradient(circle, rgba(10,102,194,0.62), transparent 68%)",
    category: "primary",
  },
  {
    id: "facebook",
    name: "Facebook",
    username: socialConfig.facebook,
    buildUrl: (username) => `https://facebook.com/${username}`,
    icon: SiFacebook,
    color: "#1877F2",
    glow: "radial-gradient(circle, rgba(24,119,242,0.6), transparent 68%)",
    category: "primary",
  },
  {
    id: "instagram",
    name: "Instagram",
    username: socialConfig.instagram,
    buildUrl: (username) => `https://instagram.com/${username}`,
    icon: SiInstagram,
    color: "#E4405F",
    glow:
      "conic-gradient(from 180deg, #515BD4, #8134AF, #DD2A7B, #F58529, #FEDA77, #515BD4)",
    category: "primary",
  },
  {
    id: "youtube",
    name: "YouTube",
    username: socialConfig.youtube,
    buildUrl: (username) => `https://youtube.com/@${username}`,
    icon: SiYoutube,
    color: "#FF0000",
    glow: "radial-gradient(circle, rgba(255,0,0,0.58), transparent 68%)",
    category: "primary",
  },
  {
    id: "tiktok",
    name: "TikTok",
    username: socialConfig.tiktok,
    buildUrl: (username) => `https://tiktok.com/@${username}`,
    icon: SiTiktok,
    color: "#25F4EE",
    glow:
      "linear-gradient(135deg, rgba(37,244,238,0.62), rgba(254,44,85,0.62))",
    category: "primary",
  },
  {
    id: "x",
    name: "X",
    username: socialConfig.x,
    buildUrl: (username) => `https://x.com/${username}`,
    icon: FaSquareXTwitter,
    color: "#71717A",
    glow: "radial-gradient(circle, rgba(113,113,122,0.62), transparent 68%)",
    category: "primary",
  },
  {
    id: "telegram",
    name: "Telegram",
    username: socialConfig.telegram,
    buildUrl: (username) => `https://t.me/${username}`,
    icon: SiTelegram,
    color: "#26A5E4",
    glow: "radial-gradient(circle, rgba(38,165,228,0.62), transparent 68%)",
    category: "primary",
  },
  {
    id: "email",
    name: "Email",
    username: socialConfig.email,
    buildUrl: (username) => `mailto:${username}`,
    icon: SiGmail,
    color: "#EA4335",
    glow: "radial-gradient(circle, rgba(234,67,53,0.58), transparent 68%)",
    category: "primary",
  },
  {
    id: "sanity",
    name: "Sanity",
    username: socialConfig.sanity,
    buildUrl: (username) =>
      `https://www.sanity.io/exchange/community/${username}`,
    icon: SiSanity,
    color: "#F03E2F",
    glow: "radial-gradient(circle, rgba(240,62,47,0.58), transparent 68%)",
    category: "creator",
  },
  {
    id: "spotify",
    name: "Spotify",
    username: socialConfig.spotify,
    buildUrl: (username) => `https://open.spotify.com/user/${username}`,
    icon: SiSpotify,
    color: "#1DB954",
    glow: "radial-gradient(circle, rgba(29,185,84,0.58), transparent 68%)",
    category: "creator",
  },
  {
    id: "apple-music",
    name: "Apple Music",
    username: socialConfig.appleMusic,
    buildUrl: (username) => `https://music.apple.com/profile/${username}`,
    icon: SiApplemusic,
    color: "#FA243C",
    glow: "radial-gradient(circle, rgba(250,36,60,0.58), transparent 68%)",
    category: "creator",
  },
  {
    id: "devto",
    name: "Dev.to",
    username: socialConfig.devto,
    buildUrl: (username) => `https://dev.to/${username}`,
    icon: SiDevdotto,
    color: "#71717A",
    glow: "radial-gradient(circle, rgba(113,113,122,0.62), transparent 68%)",
    category: "creator",
  },
  {
    id: "hashnode",
    name: "Hashnode",
    username: socialConfig.hashnode,
    buildUrl: (username) => `https://${username}.hashnode.dev`,
    icon: SiHashnode,
    color: "#2962FF",
    glow: "radial-gradient(circle, rgba(41,98,255,0.6), transparent 68%)",
    category: "creator",
  },
  {
    id: "medium",
    name: "Medium",
    username: socialConfig.medium,
    buildUrl: (username) => `https://medium.com/@${username}`,
    icon: SiMedium,
    color: "#71717A",
    glow: "radial-gradient(circle, rgba(113,113,122,0.62), transparent 68%)",
    category: "creator",
  },
  {
    id: "discord",
    name: "Discord",
    username: socialConfig.discord,
    buildUrl: (username) => `https://discord.gg/${username}`,
    icon: SiDiscord,
    color: "#5865F2",
    glow: "radial-gradient(circle, rgba(88,101,242,0.6), transparent 68%)",
    category: "creator",
  },
  {
    id: "payway",
    name: "ABA PayWay",
    username: socialConfig.payway,
    buildUrl: (username) => `https://link.payway.com.kh/${username}`,
    icon: HiOutlineCreditCard,
    color: "#005BAC",
    glow: "radial-gradient(circle, rgba(0,91,172,0.58), transparent 68%)",
    category: "support",
  },
];

export const socialLinks: SocialLink[] = definitions
  .filter((item) => item.username.trim().length > 0)
  .map(({ buildUrl, ...item }) => ({
    ...item,
    displayUsername:
      item.id === "email"
        ? item.username.trim()
        : /^https?:\/\//i.test(item.username)
          ? "Open profile"
          : `@${stripAt(item.username)}`,
    url: profileUrl(item.username, buildUrl),
  }));

export function getSocialLinks(platforms?: SocialPlatformId[]) {
  if (!platforms) return socialLinks;

  const requestedPlatforms = new Set(platforms);
  return socialLinks.filter((item) => requestedPlatforms.has(item.id));
}
