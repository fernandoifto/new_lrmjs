import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

function internalApiBase(): string {
    return process.env.API_INTERNAL_URL?.replace(/\/$/, "") || "http://127.0.0.1:3333";
}

const SKIP_HEADER = new Set([
    "host",
    "connection",
    "content-length",
    "cookie",
    "transfer-encoding",
]);

async function proxy(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
    const { path } = await ctx.params;
    const pathStr = path.join("/");
    const u = new URL(req.url);
    const target = `${internalApiBase()}/${pathStr}${u.search}`;

    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value ?? "";

    const headers = new Headers();
    req.headers.forEach((value, key) => {
        if (SKIP_HEADER.has(key.toLowerCase())) {
            return;
        }
        headers.set(key, value);
    });
    if (session) {
        headers.set("Authorization", `Bearer ${session}`);
    }

    const init: RequestInit = {
        method: req.method,
        headers,
        redirect: "manual",
    };
    if (req.method !== "GET" && req.method !== "HEAD") {
        init.body = await req.arrayBuffer();
    }

    const res = await fetch(target, init);
    const resHeaders = new Headers(res.headers);
    return new NextResponse(await res.arrayBuffer(), {
        status: res.status,
        statusText: res.statusText,
        headers: resHeaders,
    });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
