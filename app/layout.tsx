import "@/app/styles/globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { incognito } from "./assets/font/font";
import { gitlabmono } from "./assets/font/font";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import { Providers } from "./providers";
import { siteConfig, socialConfig } from "@/lib/env";
import BackgroundMesh from "./components/global/BackgroundMesh";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

const options = {
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
  url: siteConfig.siteUrl,
  ogImage: siteConfig.siteOgImage,
};

export const metadata: Metadata = {
  title: options.title,
  metadataBase: new URL(options.url),
  description: options.description,
  applicationName: siteConfig.siteName,
  authors: [{ name: siteConfig.fullName }],
  creator: siteConfig.fullName,
  openGraph: {
    title: options.title,
    url: options.url,
    siteName: siteConfig.siteName,
    locale: "en-US",
    type: "website",
    description: options.description,
    images: options.ogImage,
  },
  alternates: {
    canonical: options.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    creator: `@${socialConfig.x}`,
    images: [siteConfig.siteOgImage],
  },
  other: {
    ...(siteConfig.googleSiteVerification ? { "google-site-verification": siteConfig.googleSiteVerification } : {}),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    url: siteConfig.siteUrl,
    jobTitle: "Developer",
    description: siteConfig.siteDescription,
    sameAs: [`https://github.com/${socialConfig.github}`, `https://x.com/${socialConfig.x}`, `https://linkedin.com/in/${socialConfig.linkedin}`],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${incognito.variable} ${inter.className} ${gitlabmono.variable} relative overflow-x-hidden bg-[#f4f6fb] pb-24 text-zinc-800 antialiased selection:bg-indigo-400/30 dark:bg-[#09090b] dark:text-zinc-100 dark:selection:bg-white/20 lg:pb-0`}
      >
        <Providers>
          <BackgroundMesh />
          <Header />
          {children}
          <Footer />
        </Providers>
        <Script
          defer
          src={siteConfig.umamiScriptUrl}
          data-website-id={siteConfig.umamiWebsiteId}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
