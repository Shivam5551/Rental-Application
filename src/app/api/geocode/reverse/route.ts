// app/api/geocode/reverse/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const lat = req.nextUrl.searchParams.get("lat");
    const lon = req.nextUrl.searchParams.get("lon");
    if (!lat || !lon) {
        return NextResponse.json({ error: "lat & lon required" }, { status: 400 });
    }

    try {
        const url = new URL("https://nominatim.openstreetmap.org/reverse");
        url.searchParams.set("format", "json");
        url.searchParams.set("addressdetails", "1");
        url.searchParams.set("lat", lat);
        url.searchParams.set("lon", lon);

        const res = await fetch(url.toString(), {
            headers: {
                "User-Agent": "repox/1.0 (support@repox.me)",
                "Accept-Language": "en",
            },
        });

        if (!res.ok) throw new Error("reverse geocode failed");
        return NextResponse.json(await res.json());
    } catch {
        return NextResponse.json({ error: "Failed to detect location" }, { status: 500 });
    }
}
