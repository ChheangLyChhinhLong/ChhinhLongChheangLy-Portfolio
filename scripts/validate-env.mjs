const errors = [];
const warnings = [];

const read = (name, fallback = "") => process.env[name]?.trim() || fallback;

const assertPattern = (name, value, pattern, message) => {
  if (!pattern.test(value)) errors.push(`${name}: ${message}`);
};

const assertUrl = (name, value) => {
  try {
    new URL(value);
  } catch {
    errors.push(`${name}: must be an absolute URL`);
  }
};

const projectId = read("NEXT_PUBLIC_SANITY_PROJECT_ID", "n20lvw6w");
const dataset = read("NEXT_PUBLIC_SANITY_DATASET", "production");
const apiVersion = read("NEXT_PUBLIC_SANITY_API_VERSION", "2025-02-19");
const siteUrl = read(
  "NEXT_PUBLIC_SITE_URL",
  "https://chhinhlongdev.vercel.app",
);
const revalidateSeconds = read("SANITY_REVALIDATE_SECONDS", "3600");

assertPattern(
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  projectId,
  /^[a-z0-9-]+$/,
  "must contain only lowercase letters, numbers, or hyphens",
);
assertPattern(
  "NEXT_PUBLIC_SANITY_DATASET",
  dataset,
  /^[a-zA-Z0-9_-]+$/,
  "contains unsupported characters",
);
assertPattern(
  "NEXT_PUBLIC_SANITY_API_VERSION",
  apiVersion,
  /^\d{4}-\d{2}-\d{2}$/,
  "must use YYYY-MM-DD format",
);
assertPattern(
  "SANITY_REVALIDATE_SECONDS",
  revalidateSeconds,
  /^[1-9]\d*$/,
  "must be a positive integer",
);
assertUrl("NEXT_PUBLIC_SITE_URL", siteUrl);

if (!read("SANITY_ACCESS_TOKEN")) {
  warnings.push(
    "SANITY_ACCESS_TOKEN is unset; builds will use public Sanity access.",
  );
}

if (!read("SANITY_HOOK_SECRET")) {
  warnings.push(
    "SANITY_HOOK_SECRET is unset; webhook revalidation will return HTTP 503.",
  );
}

for (const warning of warnings) console.warn(`Environment warning: ${warning}`);

if (errors.length > 0) {
  for (const error of errors) console.error(`Environment error: ${error}`);
  process.exit(1);
}

console.log("Environment validation passed.");
