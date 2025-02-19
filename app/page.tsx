"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const handleGalleryClick = () => router.push("/gallery");
  const handleUploadClick = () => router.push("/upload");

  return (
    <section className="flex flex-col items-center justify-center bg-gradient-to-b from-neutral-light to-neutral px-4 pt-10 pb-6">
      {/* Card */}
      <Card className="w-full max-w-md shadow-lg rounded-lg mb-4">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-serif font-bold text-primary mb-1">
            Galería de Recuerdos
          </h1>
          <p className="text-sm text-muted-foreground">
            Queremos que compartas con nosotros los momentos de esta noche, que
            va a ser inolvidable.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 p-6">
          {isSignedIn ? (
            <>
              <p className="text-base text-muted-foreground text-center">
                ¡Hola, {user?.firstName}! ¿Listo para explorar o contribuir?
              </p>
              <div className="flex flex-col gap-4 w-full">
                <Button
                  className="w-full bg-primary text-neutral-light hover:bg-primary/90 transition"
                  onClick={handleGalleryClick}
                >
                  Ver Galería
                </Button>
                <Button
                  className="w-full bg-secondary text-neutral-light hover:bg-secondary/90 transition"
                  onClick={handleUploadClick}
                >
                  Subir Fotos
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-base text-muted-foreground text-center">
                Inicia sesión para ser parte de nuestra galería.
              </p>
              <SignInButton mode="modal">
                <Button className="w-full bg-primary text-neutral-light hover:bg-primary/90 transition">
                  Iniciar Sesión
                </Button>
              </SignInButton>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
