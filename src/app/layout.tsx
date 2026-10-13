import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

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
    <html lang="es">
      <body className="flex antialiased">
        <Sidebar />
        <main className="h-screen flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
