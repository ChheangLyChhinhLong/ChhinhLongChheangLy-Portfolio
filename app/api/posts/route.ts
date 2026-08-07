import { NextRequest, NextResponse } from "next/server";
import { getBlogPostsPage } from "@/lib/blog-posts";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const parsedStart = Number.parseInt(searchParams.get("start") || "0", 10);
  const parsedLimit = Number.parseInt(searchParams.get("limit") || "3", 10);
  const start = Number.isFinite(parsedStart) ? Math.max(0, parsedStart) : 0;
  const limit = Number.isFinite(parsedLimit)
    ? Math.min(12, Math.max(1, parsedLimit))
    : 3;

  try {
    const page = await getBlogPostsPage(start, limit);
    return NextResponse.json(page);
  } catch (error) {
    console.error("Failed to fetch paginated blog posts", error);
    return NextResponse.json(
      { error: "Unable to load more posts right now." },
      { status: 500 },
    );
  }
}
