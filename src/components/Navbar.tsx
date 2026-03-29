import { Link } from "react-router-dom";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          <Link to="/scanner" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Scanner
          </Link>
          <Link to="/features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Vipengele
          </Link>
          <Link to="/how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Inavyofanya Kazi
          </Link>
        </div>
        <Link to="/scanner">
          <Button variant="hero" size="lg">
            Skani Sasa
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
