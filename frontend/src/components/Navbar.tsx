import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold tracking-tight">
            HAKIKI<span className="text-primary"> SCANNER</span>
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Nyumbani
          </Link>
          <Link to="/scan" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Hakiki
          </Link>
          <Link to="/#vipengele" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Vipengele
          </Link>
          <Link to="/#inavyofanya-kazi" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Inavyofanya Kazi
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/scan">
            <Button variant="hero" size="lg">
              Anza Kuhakiki
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
