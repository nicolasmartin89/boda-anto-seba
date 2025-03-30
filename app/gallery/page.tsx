"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";

type ImageType = {
  key: string;
  url: string;
};

type PaginationState = {
  nextToken: string | null;
  prevTokens: string[];
};

const ADMIN_EMAILS = new Set([
  "anto_puntin@hotmail.com",
  "agopuntin@hotmail.com",
  "elsebamartin3@gmail.com",
  "noralibersier@gmail.com",
  "nicolasmartin89@gmail.com",
  "donadiovictor@gmail.com",
  "wolffbaltazar@gmail.com",
]);

export default function Gallery() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    nextToken: null,
    prevTokens: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  // Verificar si el usuario es admin
  useEffect(() => {
    if (!userId) return;

    const checkAdminStatus = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) return;

        const user = await response.json();
        const userEmail = user.emailAddresses?.[0]?.emailAddress ?? "";

        setIsAdmin(userEmail && ADMIN_EMAILS.has(userEmail));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    checkAdminStatus();
  }, [userId]);

  // Cargar imágenes
  const fetchImages = async (continuationToken: string | null = null) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null); // Resetear error en cada carga

    try {
      const url = `/api/s3/list${
        continuationToken ? `?continuationToken=${continuationToken}` : ""
      }`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("Error al cargar las imágenes");

      const data = await response.json();
      setImages(data.images);
      setPagination((prev) => ({
        nextToken: data.nextContinuationToken || null,
        prevTokens: continuationToken
          ? [...prev.prevTokens, continuationToken]
          : prev.prevTokens,
      }));
    } catch (error) {
      setError("No se pudieron cargar las imágenes.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Carga inicial (ejecutar solo una vez)
  useEffect(() => {
    fetchImages();
  }, []); // <--- Dependencias vacías para evitar llamadas repetidas

  // Eliminar imagen
  const handleDeleteImage = async (imageKey: string) => {
    if (!isAdmin) return;

    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta imagen?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/s3/delete?key=${imageKey}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Hubo un error al eliminar la imagen");

      setImages((prevImages) =>
        prevImages.filter((image) => image.key !== imageKey)
      );
    } catch (error) {
      setError("No se pudo eliminar la imagen.");
      console.error(error);
    }
  };

  // Navegación
  const handleNext = () => {
    if (pagination.nextToken) fetchImages(pagination.nextToken);
  };

  const handlePrevious = () => {
    const newPrevTokens = [...pagination.prevTokens];
    const lastToken = newPrevTokens.pop() || null;
    setPagination((prev) => ({ ...prev, prevTokens: newPrevTokens }));
    fetchImages(lastToken);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Galería de Fotos
      </h1>

      {/* Mostrar errores si existen */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {isLoading ? (
        <p className="text-center text-xl text-gray-600">
          Cargando imágenes...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((image) => (
            <div
              key={image.key}
              className="relative overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 group"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={image.url}
                  alt="Imagen de la boda"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover rounded-xl"
                  quality={75}
                />
              </div>
              {isAdmin && (
                <button
                  onClick={() => handleDeleteImage(image.key)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none opacity-90 group-hover:opacity-100 transition-all duration-300 border-2 border-white shadow-lg"
                  aria-label="Eliminar imagen"
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Botones de navegación */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <button
          onClick={handlePrevious}
          disabled={pagination.prevTokens.length === 0}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          Anterior
        </button>
        <button
          onClick={() => (window.location.href = "/upload")}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300"
        >
          Subir Imágenes
        </button>
        <button
          onClick={handleNext}
          disabled={!pagination.nextToken}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
