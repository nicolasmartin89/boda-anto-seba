"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, isSignedIn } = useUser(); // Hook para obtener información del usuario
  const router = useRouter();

  const handleGalleryClick = () => router.push("/gallery");
  const handleUploadClick = () => router.push("/upload");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-secondary to-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Bienvenidos a nuestra Galería de Fotos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {isSignedIn ? (
            <>
              <p className="mb-6 text-center text-muted-foreground">
                Bienvenido a nuestra galería de fotos, {user?.firstName}! <br />
                Gracias por ser parte de este día tan especial.
              </p>
              <div className="flex flex-col gap-4 w-full">
                <Button
                  className="w-full bg-primary text-secondary hover:bg-primary/90"
                  onClick={handleGalleryClick}
                >
                  Ver Galería
                </Button>
                <Button
                  className="w-full bg-primary text-secondary hover:bg-primary/90"
                  onClick={handleUploadClick}
                >
                  Subir Fotos
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="mb-6 text-center text-muted-foreground">
                Inicia sesión para subir y ver las fotos de nuestra boda.
                ¡Gracias por ser parte de nuestro día especial!
              </p>
              <SignInButton mode="modal">
                <Button className="bg-primary text-secondary hover:bg-primary/90">
                  Iniciar Sesión
                </Button>
              </SignInButton>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
