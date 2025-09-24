import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar } from "lucide-react";

export function TestimonialsSection() {
  const client = {
    name: "Orel",
    memberSince: "2022",
    responseRating: "Excellent",
    reviews: 6,
    profileImage: "/src/assets/client-orel.jpg", // Placeholder for uploaded image
    listings: [
      "Artsy & Modern Apt with attached Film Studio",
      "West LA Film & Photography Studio", 
      "Joshua Tree Paradise",
      "Vintage Cuban Elegance: Luxurious Latin Kitchen Bar"
    ],
    testimonials: [
      "Professional and friendly host with amazing attention to detail",
      "High-quality spaces that exceeded our expectations",
      "Responsive communication and seamless booking process"
    ]
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Host
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet our trusted partners who provide exceptional venues and experiences
          </p>
        </div>

        <Card className="bg-gradient-card card-hover shadow-card max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {client.name.charAt(0)}
                </div>
              </div>

              {/* Client Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{client.name}</h3>
                    <div className="flex items-center gap-4 text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Member since {client.memberSince}</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {client.responseRating}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="text-2xl font-bold text-primary">{client.reviews}</div>
                    <div className="text-sm text-muted-foreground">Positive Reviews</div>
                  </div>
                </div>

                {/* Featured Listings */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Featured Venues</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {client.listings.map((listing, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{listing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">What Clients Say</h4>
                  <div className="space-y-2">
                    {client.testimonials.map((testimonial, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-primary fill-current mt-0.5" />
                        <p className="text-sm text-muted-foreground italic">"{testimonial}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profile Link */}
                <div className="mt-6">
                  <a 
                    href="#" 
                    className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                  >
                    View Giggster Profile →
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}