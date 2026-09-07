import type { Metadata, Viewport } from "next";
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
  keywords: ["Monsterville", "Music Universe", "New Release", "Creator Studios", "Space Academy", "Monsterville Magazine", "Store", "Bobino Beats"],
  openGraph: {
    title: "MONSTERVILLE | Digital City & Creative Universe",
    description: "Enter Monsterville. Less UI. More Atmosphere. A cinematic artist world.",
    type: "website",
  },
};

/**
 * Viewport export — controls how the browser renders on mobile:
 * - viewport-fit=cover: extends into Dynamic Island / notch areas
 * - width=device-width, initial-scale=1: disables iOS auto-zoom
 * - theme-color: matches the cinematic black background
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} antialiased`}
    >
      <body className="bg-[#050505] text-[#F5F5F5] selection:bg-white selection:text-black">
        {/* Subtle analog film grain overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
