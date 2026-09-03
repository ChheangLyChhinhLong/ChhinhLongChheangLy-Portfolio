import { sanityHookSecret } from "@/lib/server-env";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 10; // កំណត់ maxDuration ត្រង់នេះសម្រាប់ Vercel Serverless Function

export async function POST(req: NextRequest) {
  if (!sanityHookSecret) {
    console.error("SANITY_HOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Revalidation webhook is not configured." },
      { status: 503 },
    );
  }

  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, sanityHookSecret);

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    revalidateTag(body._type);
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: unknown) {
    console.error(error);
    return new Response(
      error instanceof Error ? error.message : "Unable to revalidate content",
      { status: 500 },
    );
  }
}