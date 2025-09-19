import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { locations } from "@/data/locations";
import { MapPin, Users, Clock, Calendar as CalendarIcon, DollarSign, Star, ArrowLeft, Check } from "lucide-react";
import { format } from "date-fns";

export default function LocationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = locations.find(l => l.id === id);

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [eventType, setEventType] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  if (!location) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Venue Not Found</h1>
          <Button onClick={() => navigate('/')}>Back to Venues</Button>
        </div>
      </div>
    );
  }

  const calculateCost = () => {
    if (startTime && endTime && location) {
      const start = new Date(`2024-01-01T${startTime}`);
      const end = new Date(`2024-01-01T${endTime}`);
      const hours = Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60));
      const cost = Math.max(2, hours) * location.hourlyRate; // Minimum 2 hours
      setTotalCost(cost);
    }
  };

  const handleBooking = () => {
    if (!selectedDate || !startTime || !endTime || !guestCount || !eventType) {
      alert("Please fill in all required fields");
      return;
    }
    
    navigate('/booking', {
      state: {
        location,
        date: selectedDate,
        startTime,
        endTime,
        guestCount: parseInt(guestCount),
        eventType,
        specialRequests,
        totalCost
      }
    });
  };

  useState(() => {
    calculateCost();
  });

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={location.image}
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Venues
          </Button>
          <h1 className="text-4xl font-bold mb-2">{location.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{location.address}</span>
            </div>
            <Badge variant="secondary" className="capitalize">
              {location.category}
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {location.description}
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities & Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {location.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Venue Details */}
            <Card>
              <CardHeader>
                <CardTitle>Venue Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">Capacity</div>
                    <div className="text-sm text-muted-foreground">Up to {location.capacity} guests</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">Hourly Rate</div>
                    <div className="text-sm text-muted-foreground">${location.hourlyRate}/hour</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">Minimum</div>
                    <div className="text-sm text-muted-foreground">2 hours booking</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Book This Venue
                </CardTitle>
                <div className="text-2xl font-bold text-primary">
                  ${location.hourlyRate} <span className="text-sm font-normal text-muted-foreground">per hour</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div>
                  <Label>Select Date *</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border mt-2"
                  />
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-time">Start Time *</Label>
                    <Select value={startTime} onValueChange={(value) => {
                      setStartTime(value);
                      setTimeout(calculateCost, 100);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Start" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="end-time">End Time *</Label>
                    <Select value={endTime} onValueChange={(value) => {
                      setEndTime(value);
                      setTimeout(calculateCost, 100);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="End" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Guest Count */}
                <div>
                  <Label htmlFor="guests">Number of Guests *</Label>
                  <Input
                    id="guests"
                    type="number"
                    placeholder="How many guests?"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    max={location.capacity}
                  />
                </div>

                {/* Event Type */}
                <div>
                  <Label htmlFor="event-type">Event Type *</Label>
                  <Select value={eventType} onValueChange={setEventType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="party">Private Party</SelectItem>
                      <SelectItem value="meeting">Business Meeting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Special Requests */}
                <div>
                  <Label htmlFor="requests">Special Requests</Label>
                  <Textarea
                    id="requests"
                    placeholder="Any special requirements or requests..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={3}
                  />
                </div>

                <Separator />

                {/* Cost Summary */}
                {totalCost > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Duration</span>
                      <span>{Math.max(2, totalCost / location.hourlyRate)} hours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rate</span>
                      <span>${location.hourlyRate}/hour</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total Cost</span>
                      <span className="text-primary">${totalCost}</span>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleBooking}
                  className="w-full bg-gradient-primary hover:shadow-elegant btn-shine"
                  size="lg"
                >
                  Continue to Payment
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * This is a demo booking system with placeholder data
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}