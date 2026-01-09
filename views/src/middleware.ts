import { NextResponse, NextRequest } from "next/server";
import { getCookieServer } from "@/lib/cookieServer";
import {api} from "@/api/api";

export async function middleware(request: NextRequest) {

    const {pathname} = request.nextUrl;

    // Rotas públicas que não precisam de autenticação
    const publicRoutes = [
        "/",
        "/agendar",
        "/login",
        "/esqueci-senha",
        "/resetar-senha"
    ];

    // Verificar se é uma rota pública
    const isPublicRoute = publicRoutes.some(route => {
        if (route === "/") {
            return pathname === "/";
        }
        // Verifica se o pathname corresponde exatamente à rota ou começa com ela seguida de /
        return pathname === route || pathname.startsWith(route + "/");
    });

    // Permitir rotas do Next.js e rotas públicas
    if(pathname.startsWith("/_next") || pathname.startsWith("/api") || isPublicRoute){
        return NextResponse.next();
    }

    // Todas as outras rotas requerem autenticação
    const token = await getCookieServer();
    
    if(!token){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const isValid = await validateToken(token);
    console.log(isValid);

    if(!isValid){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

async function validateToken(token: string){

    if(!token) return false;
    
    try {
        await api.get("/detail", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return true;
    } catch (error) {
        return false;
    }     
}