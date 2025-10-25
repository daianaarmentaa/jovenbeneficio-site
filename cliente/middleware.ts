import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";


/**
 * Middleware que protege rutas y maneja redirecciones basadas en la sesión de Auth0.
 * ------------------------------------------------------------------------------
 * - Si el usuario tiene sesión y accede a "/", se redirige a "/home".
 * - Permite libre acceso a las rutas de autenticación ("/auth") y la raíz ("/").
 * - Si el usuario no tiene sesión, redirige a "/".
 * - Todas las demás rutas pasan por la verificación de Auth0.
 *
 * @param {NextRequest} request - Objeto de la petición entrante
 * @returns {Promise<NextResponse>} Respuesta HTTP con redirección o acceso permitido
 * @author Daiana Armenta
 */

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request);
  const session = await auth0.getSession(request);

  if(request.nextUrl.pathname === "/" && session){
    return NextResponse.redirect(new URL("/home", request.nextUrl.origin))
  }

  if (request.nextUrl.pathname.startsWith("/auth") || request.nextUrl.pathname === "/") {
    return authRes;
  }

  if (!session) {

    return NextResponse.redirect(
      new URL("/", request.nextUrl.origin)
    );
  }

  return authRes;
  
}

export const config = {
  matcher: [
    "/",
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};