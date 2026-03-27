import { NextResponse, NextRequest } from "next/server";
import { getCookieServer } from "@/lib/cookieServer";

export async function middleware(request: NextRequest) {

    const {pathname} = request.nextUrl;

    // Rotas públicas que não precisam de autenticação
    const publicRoutes = [
        "/",
        "/agendar",
        "/login",
        "/esqueci-senha",
        "/resetar-senha",
        "/sem-permissao",
        "/solicitar-doacao",
        "/lotes-disponiveis",
        "/pacientes/novo"
    ];

    // Verificar se é uma rota pública
    const isPublicRoute = publicRoutes.some(route => {
        if (route === "/") {
            return pathname === "/";
        }
        // Verifica se o pathname corresponde exatamente à rota ou começa com ela seguida de /
        return pathname === route || pathname.startsWith(route + "/");
    });

    // Permitir arquivos estáticos (imagens, fontes, etc.)
    const staticFileExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.avif', '.css', '.js', '.woff', '.woff2', '.ttf', '.eot'];
    const isStaticFile = staticFileExtensions.some(ext => pathname.toLowerCase().endsWith(ext));
    
    // Permitir rotas do Next.js, arquivos estáticos, API e rotas públicas
    if(pathname.startsWith("/_next") || pathname.startsWith("/api") || isPublicRoute || isStaticFile){
        return NextResponse.next();
    }

    // Todas as outras rotas requerem autenticação
    const token = await getCookieServer();
    
    if(!token){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const isValid = validateToken(token);

    if(!isValid){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

function validateToken(token: string){

    if(!token) return false;
    
    try {
        const payload = parseJwtPayload(token);
        if (!payload) return false;
        if (typeof payload.exp !== "number") return false;
        const now = Math.floor(Date.now() / 1000);
        return payload.exp > now;
    } catch (error) {
        return false;
    }     
}

function parseJwtPayload(token: string): Record<string, unknown> | null {
    const tokenParts = token.split(".");
    if (tokenParts.length < 2) return null;

    const payloadBase64Url = tokenParts[1];
    const base64 = payloadBase64Url.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const json = atob(paddedBase64);

    return JSON.parse(json) as Record<string, unknown>;
}