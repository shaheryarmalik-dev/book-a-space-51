import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/ui/hero-section";
import { LocationCard } from "@/components/ui/location-card";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { locations, Location } from "@/data/locations";
import { Search, Filter } from "lucide-react";

const Index = () => {
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "conference", "wedding", "corporate", "party", "outdoor"];

  useEffect(() => {
    let filtered = locations;

    if (searchTerm) {
      filtered = filtered.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(location => location.category === selectedCategory);
    }

    setFilteredLocations(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      {/* Filters Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === "all" ? "All Venues" : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredLocations.length} of {locations.length} venues
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {filteredLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-4">No venues found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or filters
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer */}
      <footer className="bg-gradient-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EventSpace</h3>
              <p className="text-primary-foreground/80">
                Premium venue booking platform for all your event needs. 
                Professional spaces, transparent pricing, instant booking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Browse Venues</li>
                <li>How It Works</li>
                <li>Pricing</li>
                <li>Contact Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>📧 hello@eventspace.com</li>
                <li>📞 +1 (555) 123-VENUE</li>
                <li>📍 New York, NY</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 EventSpace. All rights reserved. | This is placeholder content for demo purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
