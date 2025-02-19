"use client";
import { useState, useEffect } from "react";

type ImageType = {
  key: string;
  url: string;
};

export default function Gallery() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [prevTokens, setPrevTokens] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);

  const fetchImages = async (continuationToken: string | null) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/s3/list${
          continuationToken ? `?continuationToken=${continuationToken}` : ""
        }`
      );
      if (!response.ok) throw new Error("Error al cargar las imágenes");

      const data = await response.json();
      setImages(data.images);
      setNextToken(data.nextContinuationToken || null);

      if (continuationToken) {
        setPrevTokens((prev) => [...prev, continuationToken]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (imageToDelete) {
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
    }
  };

  useEffect(() => {
    fetchImages(null); // Carga inicial
  }, []);

  const handleNext = () => {
    if (nextToken) fetchImages(nextToken);
  };

  const handlePrevious = () => {
    const newPrevTokens = [...prevTokens];
    const lastToken = newPrevTokens.pop() || null;
    setPrevTokens(newPrevTokens);
    fetchImages(lastToken);
  };

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
              className="relative overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="w-full h-full aspect-w-1 aspect-h-1">
                <img
                  src={image.url}
                  alt="Imagen de la boda"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              {/* Botón de eliminación */}
              <button
                onClick={() => {
                  setImageToDelete(image.key);
                  setShowModal(true);
                }}
                className="absolute top-2 right-2 bg-black/80 text-white p-1.5 rounded-full hover:bg-black focus:outline-none"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h2 className="text-xl mb-4">
              ¿Estás seguro de que deseas eliminar esta imagen?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteImage}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botones de navegación y subida */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <button
          onClick={handlePrevious}
          disabled={prevTokens.length === 0}
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
          disabled={!nextToken}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
