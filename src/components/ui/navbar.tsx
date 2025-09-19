import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, LogIn, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user');

  const navItems = [
    { name: 'Venues', href: '/' },
    { name: 'My Bookings', href: '/dashboard' },
    ...(userRole === 'admin' ? [{ name: 'Admin', href: '/admin' }] : []),
  ];

  const NavContent = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className="text-foreground hover:text-primary transition-colors font-medium"
        >
          {item.name}
        </Link>
      ))}
      
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Link>
          </Button>
        )}
      </div>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold gradient-text">EventSpace</span>
              <span className="text-xs text-muted-foreground">Premium Venue Booking</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavContent />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <NavContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}