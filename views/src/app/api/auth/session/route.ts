import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

function internalApiBase(): string {
    return process.env.API_INTERNAL_URL?.replace(/\/$/, "") || "http://127.0.0.1:3333";
}

export async function POST(req: NextRequest) {
    const body = await req.text();
    const res = await fetch(`${internalApiBase()}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
    });
    const text = await res.text();
    let data: { token?: string; error?: string };
    try {
        data = JSON.parse(text) as { token?: string; error?: string };
    } catch {
        return NextResponse.json({ error: text || "Resposta inválida da API" }, { status: res.status || 502 });
    }
    if (!res.ok) {
        return NextResponse.json(data, { status: res.status });
    }
    const token = data.token;
    if (!token) {
        return NextResponse.json({ error: "Token ausente na resposta" }, { status: 502 });
    }
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
    });
    return NextResponse.json({ ok: true });
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    return NextResponse.json({ ok: true });
}
