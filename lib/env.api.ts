const DEFAULT_PROJECT_ID = "n20lvw6w";
const DEFAULT_DATASET = "production";
const DEFAULT_API_VERSION = "2025-02-19";

function publicValue(
  value: string | undefined,
  fallback: string,
  name: string,
  pattern: RegExp,
) {
  const resolvedValue = value?.trim() || fallback;

  if (!pattern.test(resolvedValue)) {
    throw new Error(`Invalid Environment Variable: ${name}`);
  }

  return resolvedValue;
}

export const projectId = publicValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  DEFAULT_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  /^[a-z0-9-]+$/,
);

export const dataset = publicValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  DEFAULT_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
  /^[a-zA-Z0-9_-]+$/,
);

export const apiVersion = publicValue(
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  DEFAULT_API_VERSION,
  "NEXT_PUBLIC_SANITY_API_VERSION",
  /^\d{4}-\d{2}-\d{2}$/,
);

export const mode = process.env.NODE_ENV;
