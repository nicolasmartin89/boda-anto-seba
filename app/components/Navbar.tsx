"use client";

import Image from "next/image";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function Navbar() {
  return (
    <nav className="bg-secondary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <Image
              src="/wedding-rings.svg"
              alt="Logo de boda"
              width={40}
              height={40}
              className="text-primary"
            />
            <h1 className="ml-3 text-xl font-semibold text-primary">
              Anto y Seba - Nuestra Boda
            </h1>
          </div>
          {/* Botones de autenticación */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              {/* Botón para usuario autenticado */}
              <UserButton />
            </SignedIn>
            <SignedOut>
              {/* Botón para usuario no autenticado */}
              <SignInButton mode="modal">
                <button className="text-sm text-primary bg-transparent border border-primary px-3 py-1 rounded-md hover:bg-primary hover:text-secondary transition">
                  Iniciar sesión
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
