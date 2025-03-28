"use client";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Head from "next/head";
import { esES } from "@clerk/localizations";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es">
        <body className="min-h-screen">
          <Head>
            <title>Galería de Recuerdos - Boda Anto & Seba</title>
            <meta
              name="Boda Anto & Seba"
              content="Galería de fotos de la boda de Anto y Seba."
            />
            <link rel="icon" type="image/png" href="/favicon.png" />
          </Head>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
