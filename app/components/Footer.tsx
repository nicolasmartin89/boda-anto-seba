import { Heart, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary shadow-md mt-8">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <span className="text-muted-foreground">Creado con amor</span>
          <Heart className="text-primary mx-2" size={16} />
          <a
            href="https://github.com/nicolasmartin89"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
