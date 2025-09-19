import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Clock } from "lucide-react";
import { Location } from "@/data/locations";
import { Link } from "react-router-dom";

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Card className="group bg-gradient-card card-hover overflow-hidden shadow-card">
      <div className="relative overflow-hidden h-48">
        <img
          src={location.image}
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="capitalize bg-background/90 backdrop-blur-sm">
            {location.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-background/90 backdrop-blur-sm font-semibold">
            ${location.hourlyRate}/hr
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {location.name}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{location.address}</span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {location.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>Up to {location.capacity}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Min 2 hours</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {location.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {location.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{location.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Link to={`/location/${location.id}`} className="w-full">
          <Button className="w-full btn-shine bg-gradient-primary hover:shadow-elegant">
            View Details & Book
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}