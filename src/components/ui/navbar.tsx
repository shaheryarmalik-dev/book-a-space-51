import { useState } from "react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { Menu, X, Search, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold text-primary">EventSpace</div>
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search venues..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#venues" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Venues
            </a>
            <a href="#host" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Host
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
              className="hidden sm:inline-flex"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/login')}
              className="bg-primary hover:bg-primary/90 text-white font-medium"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <a href="#venues" className="text-lg font-medium">Venues</a>
                  <a href="#host" className="text-lg font-medium">Host</a>
                  <a href="#contact" className="text-lg font-medium">Contact</a>
                  <Button onClick={() => navigate('/login')} className="justify-start">
                    Login
                  </Button>
                  <Button onClick={() => navigate('/login')} className="justify-start bg-primary">
                    Book Now
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}