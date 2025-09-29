import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { HeroSlider } from "@/components/ui/hero-slider";
import { LocationCard } from "@/components/ui/location-card";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { ContactSection } from "@/components/ui/contact-section";
import { Button } from "@/components/ui/button";
import { locations } from "@/data/locations";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSlider />
      
      {/* Premium Venues Section */}
      <section id="venues" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Premium Featured Venues
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked exceptional spaces for unforgettable events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {locations.map((location) => (
              <div key={location.id} className="group">
                <LocationCard location={location} />
              </div>
            ))}
          </div>

          {/* Search Filters */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-card p-6">
              <h3 className="text-lg font-semibold mb-4">Find Your Perfect Venue</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select className="p-3 border border-input rounded-md focus:ring-2 focus:ring-primary">
                  <option>Location</option>
                  <option>NYC</option>
                  <option>LA</option>
                  <option>SF</option>
                  <option>Miami</option>
                </select>
                <select className="p-3 border border-input rounded-md focus:ring-2 focus:ring-primary">
                  <option>Event Type</option>
                  <option>Event</option>
                  <option>Photo</option>
                  <option>Filming</option>
                </select>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Search Venues
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      <ContactSection />

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
                <li><a href="#venues" className="hover:text-white transition-colors">Browse Venues</a></li>
                <li><a href="#host" className="hover:text-white transition-colors">Host Your Venue</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact Support</a></li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>📧 hello@eventspace.com</li>
                <li>📞 +1 (555) 123-4567</li>
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
}