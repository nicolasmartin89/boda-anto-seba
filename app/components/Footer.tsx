import { Heart, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary mt-8 shadow-inner">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-2 text-sm text-muted-foreground">
          <p className="flex items-center">
            Creado con <Heart className="inline text-primary mx-1" size={16} />{" "}
            <a
              href="https://github.com/nicolasmartin89/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline text-primary mx-1"
            >
              <Github size={16} />
            </a>
          </p>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-2">
          <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
