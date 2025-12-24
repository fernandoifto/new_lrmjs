import { NextResponse, NextRequest } from "next/server";
import { getCookieServer } from "@/lib/cookieServer";
import {api} from "@/api/api";

export async function middleware(request: NextRequest) {

    const {pathname} = request.nextUrl;

    if(pathname.startsWith("/_next") || pathname === "/"){
        return NextResponse.next();
    }

   const token = await getCookieServer();
    
    if(pathname.startsWith("/dashboard")){
        if(!token){
            return NextResponse.redirect(new URL("/", request.url));
        }

        const isValid = await validateToken(token);
        console.log(isValid);

        if(!isValid){
            return NextResponse.redirect(new URL("/", request.url));
        }
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