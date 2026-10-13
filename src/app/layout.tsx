import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Agency SaaS",
  description: "Todo-en-uno para agencias y founders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${instrumentSerif.variable}`}>
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
