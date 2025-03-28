"use client";

import Image from "next/image";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-primary-dark shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center space-x-3">
            <Link href="/" passHref>
              <Image
                src="/wedding-rings.svg"
                alt="Logo de boda"
                width={45}
                height={45}
                className="text-primary cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <Link href="/" passHref>
              <h1 className="text-2xl font-serif font-bold text-neutral-light cursor-pointer hover:text-secondary transition-colors">
                Anto y Seba
              </h1>
            </Link>
          </div>

          {/* Botones de autenticación */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Botón de inicio de sesión

            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-neutral-light bg-primary hover:bg-primary/90 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition-colors">
                  Iniciar Sesión
                </button>
              </SignInButton>
            </SignedOut>

             */}
          </div>
        </div>
      </div>
    </nav>
  );
}
