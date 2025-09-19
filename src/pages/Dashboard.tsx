import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Clock, DollarSign, Plus, Download } from "lucide-react";
import { bookings as defaultBookings, users } from "@/data/users";
import { locations } from "@/data/locations";
import { format } from "date-fns";

export default function Dashboard() {
  const location = useLocation();
  const newBooking = location.state?.newBooking;
  
  // Add new booking to the list if it exists
  const [bookings] = useState(() => {
    if (newBooking) {
      return [{
        ...newBooking,
        id: newBooking.bookingId,
        locationId: newBooking.location.id,
        userId: 'user-1', // Current user
        date: format(newBooking.date, 'yyyy-MM-dd'),
        totalHours: Math.max(2, newBooking.totalCost / newBooking.location.hourlyRate),
        totalPrice: newBooking.totalCost,
        eventType: newBooking.eventType,
        guestCount: newBooking.guestCount,
        specialRequests: newBooking.specialRequests,
        createdAt: new Date().toISOString()
      }, ...defaultBookings];
    }
    return defaultBookings;
  });

  const currentUser = users.find(u => u.id === 'user-1'); // Mock current user
  const userBookings = bookings.filter(b => b.userId === currentUser?.id);

  const upcomingBookings = userBookings.filter(b => new Date(b.date) >= new Date());
  const pastBookings = userBookings.filter(b => new Date(b.date) < new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const BookingCard = ({ booking }: { booking: any }) => {
    const venue = locations.find(l => l.id === booking.locationId);
    
    return (
      <Card className="card-hover">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
              <img
                src={venue?.image}
                alt={venue?.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-lg">{venue?.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {venue?.address}
                </div>
                <Badge 
                  variant={getStatusColor(booking.paymentStatus)}
                  className="mt-2"
                >
                  {booking.paymentStatus.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">${booking.totalPrice}</div>
              <div className="text-sm text-muted-foreground">Total Cost</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Date</div>
              <div className="font-medium">{format(new Date(booking.date), 'MMM d, yyyy')}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Time</div>
              <div className="font-medium">{booking.startTime} - {booking.endTime}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Event Type</div>
              <div className="font-medium capitalize">{booking.eventType}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Guests</div>
              <div className="font-medium flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {booking.guestCount}
              </div>
            </div>
          </div>

          {booking.specialRequests && (
            <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
              <div className="text-sm font-medium mb-1">Special Requests</div>
              <div className="text-sm text-muted-foreground">{booking.specialRequests}</div>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Receipt
            </Button>
            {booking.paymentStatus === 'pending' && (
              <Button size="sm" className="bg-gradient-primary">
                Complete Payment
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {currentUser?.name}!</h1>
            <p className="text-muted-foreground">Manage your venue bookings and account</p>
          </div>
          <Button className="bg-gradient-primary btn-shine">
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{userBookings.length}</div>
                  <div className="text-sm text-muted-foreground">Total Bookings</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{upcomingBookings.length}</div>
                  <div className="text-sm text-muted-foreground">Upcoming Events</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary-glow/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary-glow" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    ${userBookings.reduce((sum, b) => sum + b.totalPrice, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Spent</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {new Set(userBookings.map(b => b.locationId)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Venues Visited</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastBookings.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            {upcomingBookings.length > 0 ? (
              <div className="space-y-6">
                {upcomingBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Upcoming Bookings</h3>
                  <p className="text-muted-foreground mb-6">
                    Ready to plan your next event? Browse our premium venues.
                  </p>
                  <Button className="bg-gradient-primary btn-shine">
                    Browse Venues
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-6">
            {pastBookings.length > 0 ? (
              <div className="space-y-6">
                {pastBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Past Bookings</h3>
                  <p className="text-muted-foreground">
                    Your booking history will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}