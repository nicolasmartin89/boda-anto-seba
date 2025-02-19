"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Upload() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (!files) return;

    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Comprime y redimensiona la imagen
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // Tamaño máximo de 1MB
          maxWidthOrHeight: 1080, // Resolución máxima de 1080px
        });

        // Convierte la imagen comprimida a Base64
        const base64Content = await getBase64(compressedFile);

        const response = await fetch("/api/s3", {
          method: "POST",
          body: JSON.stringify({
            fileName: `${Date.now()}_${file.name}`,
            folder: "wedding-gallery",
            fileContent: base64Content.split(",")[1], // Extrae solo la parte Base64
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Error al subir la imagen");
        }
      }

      alert("¡Imágenes subidas con éxito!");
      router.push("/gallery");
    } catch (error) {
      console.error("Error al subir imágenes:", error);
      alert("Hubo un error al subir las imágenes. Intenta nuevamente.");
    } finally {
      setIsUploading(false);
    }
  };

  // Convierte un archivo a Base64
  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-secondary to-neutral">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Subir Imágenes
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Selecciona las fotos que quieres compartir en la categoría{" "}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="picture">Seleccionar imágenes</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={isUploading}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <Button
            onClick={handleUpload}
            disabled={!files || isUploading}
            className="w-full px-6 py-3 bg-primary text-white text-lg rounded-lg hover:bg-primary-dark transition"
          >
            {isUploading ? "Subiendo..." : "Subir Imágenes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
