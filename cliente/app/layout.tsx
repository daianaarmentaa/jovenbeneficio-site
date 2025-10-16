import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import 'leaflet/dist/leaflet.css';
import "./globals.css";

// 👇 1. Importa el ThemeProvider que creamos
import { ThemeProvider } from "./providers/theme_providers";

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