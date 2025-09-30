import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.css";


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
    <html lang="en" data-theme="pastel">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
