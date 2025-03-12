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
import { Input } from "@/components/ui/input";
import { UploadCloud, Trash2 } from "lucide-react";

export default function Upload() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-neutral-50">
      <Card className="w-full max-w-md bg-white shadow-xl rounded-lg border border-neutral-100">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary-dark">
            Subir Imágenes
          </CardTitle>
          <CardDescription className="text-center text-neutral-600">
            Selecciona las fotos que quieres compartir en la galería de la boda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center cursor-pointer hover:bg-neutral-50 transition-colors"
            onClick={() => document.getElementById("picture")?.click()}
          >
            <UploadCloud className="w-10 h-10 mx-auto text-neutral-400 mb-4" />
            <p className="text-neutral-600 font-semibold">
              Haz click aquí para subir tus imágenes...
            </p>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
            />
          </div>

          {/* Previsualización de imágenes */}
          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-700">
                Imágenes seleccionadas:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Previsualización ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botón de subida */}
          <Button
            onClick={handleUpload}
            disabled={files.length === 0 || isUploading}
            className="w-full px-6 py-3 bg-primary text-white text-lg rounded-lg hover:bg-primary-dark transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {isUploading ? "Subiendo..." : "Subir Imágenes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
