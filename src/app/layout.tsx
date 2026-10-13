import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  DM_Sans,
  DM_Serif_Display,
  Fraunces,
  Geist,
  IBM_Plex_Sans,
  Inter,
  Instrument_Serif,
  Manrope,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { BRAND_ID, brand, type BrandId } from "@/lib/brand";
import "./globals.css";

// Cada marca usa una fuente de texto (--font-body) y otra de titulares (--font-display).
// Solo se aplican las de la marca activa.
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const geist = Geist({ subsets: ["latin"], variable: "--font-body" });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-display" });

const FONTS: Record<BrandId, string> = {
  default: `${inter.variable} ${instrumentSerif.variable}`,
  nexo: `${manrope.variable} ${spaceGrotesk.variable}`,
  faro: geist.variable,
  tinta: `${plexSans.variable} ${fraunces.variable}`,
  orbita: `${jakarta.variable} ${bricolage.variable}`,
  brote: `${dmSans.variable} ${dmSerif.variable}`,
};

export const metadata: Metadata = {
  title: brand.name,
  description: "Todo-en-uno para agencias y founders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-brand={BRAND_ID === "default" ? undefined : BRAND_ID} className={FONTS[BRAND_ID]}>
      <body className="flex font-sans antialiased">
        <Sidebar />
        <main className="h-screen flex-1 overflow-y-auto">
          <Topbar />
          {children}
        </main>
      </body>
    </html>
  );
}
