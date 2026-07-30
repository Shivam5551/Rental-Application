// app/api/geocode/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const q = req.nextUrl.searchParams.get("q")?.trim();
    if (!q || q.length < 3) return NextResponse.json([]);

    try {
        const url = new URL("https://nominatim.openstreetmap.org/search");
        url.searchParams.set("format", "json");
        url.searchParams.set("addressdetails", "1");
        url.searchParams.set("limit", "6");
        url.searchParams.set("q", q);

        const res = await fetch(url.toString(), {
            headers: {
                "User-Agent": "repox/1.0 (support@repox.me)",
                "Accept-Language": "en",
            },
            next: { revalidate: 3600 },
        });

        if (!res.ok) throw new Error("geocode failed");
        return NextResponse.json(await res.json());
    } catch {
        return NextResponse.json({ error: "Failed to fetch suggestions" }, { status: 500 });
    }
}
