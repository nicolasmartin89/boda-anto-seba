import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center">
        ¿Qué quieres hacer hoy?
      </h1>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
        <Link href="/gallery">
          <button className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg shadow hover:bg-green-600 transition">
            Ver Galería
          </button>
        </Link>
        <Link href="/upload">
          <button className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow hover:bg-blue-600 transition">
            Subir Fotos
          </button>
        </Link>
      </div>
    </div>
  );
}
