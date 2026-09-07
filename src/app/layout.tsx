import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MONSTERVILLE | Digital City & Creative Universe",
  description:
    "MONSTERVILLE is a digital city, music universe, and creative world. An immersive audiovisual experience.",
  keywords: ["Monsterville", "Music Universe", "Destiny", "Creative Studio", "Film Archive"],
  openGraph: {
    title: "MONSTERVILLE | Digital City & Creative Universe",
    description: "Enter Monsterville. Less UI. More Atmosphere. A cinematic artist world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} h-full antialiased custom-cursor-active selection:bg-white selection:text-black`}
    >
      <body className="min-h-full bg-[#050505] text-[#F5F5F5] overflow-x-hidden font-sans">
        {/* Subtle analog film grain overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

