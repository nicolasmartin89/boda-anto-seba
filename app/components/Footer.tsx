import { Heart, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary py-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="flex justify-center items-center text-sm text-neutral-800">
          Creado con <Heart className="inline text-black mx-1" size={16} />
          <a
            href="https://github.com/nicolasmartin89/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline mx-1 hover:text-accent transition-colors"
          >
            <Github
              className="text-black hover:text-black"
              size={16}
              style={{ stroke: "black" }} // Forzar el color del ícono
            />
          </a>
        </p>
        <p className="text-xs text-neutral-800 mt-2">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
