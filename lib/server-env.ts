import "server-only";

function optionalValue(value: string | undefined) {
  const resolvedValue = value?.trim();
  return resolvedValue || undefined;
}

function positiveInteger(value: string | undefined, fallback: number) {
  if (!value?.trim()) return fallback;

  const parsedValue = Number(value);
  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    throw new Error(
      "Invalid Environment Variable: SANITY_REVALIDATE_SECONDS must be a positive integer",
    );
  }

  return parsedValue;
}

export const sanityAccessToken = optionalValue(
  process.env.SANITY_ACCESS_TOKEN,
);
export const sanityHookSecret = optionalValue(process.env.SANITY_HOOK_SECRET);
export const sanityRevalidateSeconds = positiveInteger(
  process.env.SANITY_REVALIDATE_SECONDS,
  3600,
);

export const paywayConfig = {
  baseUrl: optionalValue(process.env.PAYWAY_BASE_URL),
  khrCode: optionalValue(process.env.PAYWAY_KHR_CODE),
  usdCode: optionalValue(process.env.PAYWAY_USD_CODE),
};
