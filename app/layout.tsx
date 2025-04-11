// app/layout.tsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { esES } from "@clerk/localizations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galería de Recuerdos - Boda Anto & Seba",
  description: "Galería de fotos de la boda de Anto y Seba.",
  keywords: ["boda", "Anto y Seba", "galería de fotos", "recuerdos", "amor"],
  authors: [{ name: "Anto & Seba" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Galería de Recuerdos - Boda Anto & Seba",
    description: "Revive los momentos especiales de la boda de Anto y Seba.",
    type: "website",
    url: "https://boda-anto-seba.vercel.app/",
    
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es">
        <body className="min-h-screen">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
