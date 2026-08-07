import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";
import { siteUrl } from "../../data/site";

export default function RefLink({
  href,
  children,
  className,
  target = "_blank",
}: {
  href: Url;
  children?: React.ReactNode;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
}) {
  const hrefValue = String(href);
  const referral = encodeURIComponent(new URL(siteUrl).hostname);
  const separator = hrefValue.includes("?") ? "&" : "?";

  return (
    <Link
      href={`${hrefValue}${separator}ref=${referral}`}
      rel="noopener"
      target={target}
      className={className}
    >
      {children}
    </Link>
  );
}
