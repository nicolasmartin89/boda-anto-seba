"use client";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
