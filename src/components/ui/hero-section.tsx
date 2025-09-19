import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import heroImage from "@/assets/venue-hero.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Elegant event venue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-accent to-yellow-300 bg-clip-text text-transparent">
              Event Venue
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Book premium venues for weddings, conferences, parties, and corporate events. 
            Professional spaces with transparent pricing and instant booking.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="glass rounded-2xl p-6 shadow-elegant">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search venues by name, location, or type..."
                    className="pl-10 h-12 border-border/50 bg-background/80"
                  />
                </div>
                <Button size="lg" className="h-12 px-8 bg-gradient-primary hover:shadow-elegant btn-shine">
                  Search Venues
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="glass rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="h-6 w-6 text-accent mr-2" />
                <span className="text-2xl font-bold">10+</span>
              </div>
              <p className="text-sm text-gray-200">Premium Locations</p>
            </div>
            
            <div className="glass rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-6 w-6 text-accent mr-2" />
                <span className="text-2xl font-bold">24/7</span>
              </div>
              <p className="text-sm text-gray-200">Instant Booking</p>
            </div>
            
            <div className="glass rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-accent mr-2" />
                <span className="text-2xl font-bold">500+</span>
              </div>
              <p className="text-sm text-gray-200">Happy Events</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 animate-float opacity-20">
        <div className="w-20 h-20 bg-accent/30 rounded-full" />
      </div>
      <div className="absolute top-20 right-20 animate-float opacity-20" style={{ animationDelay: '1s' }}>
        <div className="w-16 h-16 bg-primary-glow/30 rounded-full" />
      </div>
    </section>
  );
}