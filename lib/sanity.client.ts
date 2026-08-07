import "server-only";
import { createClient, type ClientConfig, type QueryParams } from "next-sanity";
import { projectId, dataset, apiVersion, mode } from "@/lib/env.api";
import {
  sanityAccessToken,
  sanityRevalidateSeconds,
} from "@/lib/server-env";

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: mode === "development" ? true : false,
  ignoreBrowserTokenWarning: true,
  token: sanityAccessToken,
  perspective: "published",
};

const client = createClient(config);

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(
    query,
    qParams,
    mode === "development"
      ? { cache: "no-store" }
      : {
          next: { tags, revalidate: sanityRevalidateSeconds },
        },
  );
}
