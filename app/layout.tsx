import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Space_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart/CartContext";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "700", "800"],
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Switchback — Mechanical Enrichment Puzzle for Dogs",
  description: "Press, rotate, slide. A machined mechanical puzzle that rewards your dog’s curiosity. Switchback.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} ${spaceMono.variable}`}>
      <body className="antialiased">
        <div className="relative isolation">
          <div className="noise" />
          <CartProvider>
            <SiteHeader />
            <main className="relative z-10">{children}</main>
            <SiteFooter />
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
