"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

type ImageType = {
  key: string;
  url: string;
};

export default function Gallery() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [pagination, setPagination] = useState({
    nextToken: null as string | null,
    prevTokens: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { userId } = useAuth();

  // Verificar si el usuario es admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/users/${userId}`);
        if (response.ok) {
          const user = await response.json();
          setIsAdmin(
            user.emailAddresses[0]?.emailAddress === "nicolasmartin89@gmail.com"
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    checkAdminStatus();
  }, [userId]);

  // Cargar imágenes
  const fetchImages = async (continuationToken: string | null = null) => {
    setIsLoading(true);
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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar imagen
  const handleDeleteImage = async () => {
    if (!imageToDelete || !isAdmin) return;

    try {
      const response = await fetch(`/api/s3/delete?key=${imageToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setImages((prevImages) =>
          prevImages.filter((image) => image.key !== imageToDelete)
        );
        setShowModal(false);
        alert("Imagen eliminada exitosamente");
      } else {
        alert("Hubo un error al eliminar la imagen");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al eliminar la imagen");
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

  // Carga inicial
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Galería de Fotos
      </h1>

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
                  onClick={() => {
                    setImageToDelete(image.key);
                    setShowModal(true);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none opacity-90 group-hover:opacity-100 transition-all duration-300 border-2 border-white shadow-lg"
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md border border-gray-200 shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              ¿Estás seguro de que deseas eliminar esta imagen?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteImage}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition-all duration-200"
              >
                Eliminar
              </button>
            </div>
          </div>
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
