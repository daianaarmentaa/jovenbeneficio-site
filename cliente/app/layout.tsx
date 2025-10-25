import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import 'leaflet/dist/leaflet.css';
import "./globals.css";
import { ThemeProvider } from "./providers/theme_providers";
/**
 * Componente RootLayout
 * ---------------------
 * Layout raíz de la aplicación Next.js.
 * Proporciona:
 *   - Estructura HTML y BODY.
 *   - Inicialización del tema desde localStorage.
 *   - Fuente global Poppins.
 *   - Proveedor de temas ThemeProvider para toda la app.
 *
 * @param {Object} props - Props del componente.
 * @param {React.ReactNode} props.children - Contenido anidado dentro del layout.
 * @returns {JSX.Element} Componente JSX que envuelve toda la aplicación.
 * @author Daiana Armenta
 */

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['400','500','600','700']
});

export const metadata: Metadata = {
  title: "AtizApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" suppressHydrationWarning> 
      <body className={`${poppins.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'pastel';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        ></script>
        
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}