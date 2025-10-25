import { Auth0Client } from "@auth0/nextjs-auth0/server";
/**
 * Archivo: auth0.ts
 * 
 * Descripción:
 * Este archivo inicializa un cliente de Auth0 para usarlo en la autenticación
 * de la aplicación Next.js. Permite realizar operaciones de login, logout y
 * gestión de sesiones de manera segura.
 * 
 * Configuración:
 * - scope: Define los permisos solicitados al usuario (tomado de AUTH0_SCOPE en las variables de entorno).
 * - audience: Define la audiencia del token que se solicita (tomado de AUTH0_AUDIENCE en las variables de entorno).
 * 
 * Ejemplo de uso:
 * import { auth0 } from './auth0';
 * const token = await auth0.getAccessToken();
 * 
 * Autora: Daiana Armenta
 */

// Initialize the Auth0 client 
export const auth0 = new Auth0Client({

  authorizationParameters: {
    scope: process.env.AUTH0_SCOPE,
    audience: process.env.AUTH0_AUDIENCE,
  }
});