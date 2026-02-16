import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE_URL = "https://streamed.pk/api";

export async function GET(req, context) {
  const { path } = await context.params;

  if (!path || !Array.isArray(path)) {
    return NextResponse.json(
      { error: "Invalid proxy path" },
      { status: 400 }
    );
  }

  const url = `${BASE_URL}/${path.join("/")}`;

  try {
    const upstream = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",  // Accept all content types
      },
      cache: "no-store",
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      return NextResponse.json(
        { error: text || "Upstream API error" },
        { status: upstream.status }
      );
    }

    // Check if the response is JSON or other content
    const contentType = upstream.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await upstream.json();
      return NextResponse.json(data);
    } else {
      // For images and other binary content, return the response as-is
      const arrayBuffer = await upstream.arrayBuffer();
      return new NextResponse(arrayBuffer, {
        status: upstream.status,
        headers: {
          "Content-Type": contentType || "application/octet-stream",
          "Cache-Control": "public, max-age=3600",  // Optional: cache images for 1 hour
        },
      });
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Proxy fetch failed" },
      { status: 500 }
    );
  }
}