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
        <body className="min-h-screen">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
