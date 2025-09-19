import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  Building,
  TrendingUp,
  Eye
} from "lucide-react";
import { locations, Location } from "@/data/locations";
import { bookings, users } from "@/data/users";
import { format } from "date-fns";

export default function AdminDashboard() {
  const [venueLocations, setVenueLocations] = useState(locations);
  const [selectedVenue, setSelectedVenue] = useState<Location | null>(null);
  const [isAddingVenue, setIsAddingVenue] = useState(false);
  
  const [venueForm, setVenueForm] = useState({
    name: '',
    description: '',
    hourlyRate: '',
    address: '',
    capacity: '',
    category: '',
    amenities: ''
  });

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const totalBookings = bookings.length;
  const totalUsers = users.filter(u => u.role === 'user').length;

  const resetForm = () => {
    setVenueForm({
      name: '',
      description: '',
      hourlyRate: '',
      address: '',
      capacity: '',
      category: '',
      amenities: ''
    });
    setSelectedVenue(null);
    setIsAddingVenue(false);
  };

  const handleSubmitVenue = () => {
    const amenitiesArray = venueForm.amenities.split(',').map(a => a.trim()).filter(a => a);
    
    const venueData: Location = {
      id: selectedVenue?.id || `venue-${Date.now()}`,
      name: venueForm.name,
      description: venueForm.description,
      hourlyRate: parseInt(venueForm.hourlyRate),
      address: venueForm.address,
      capacity: parseInt(venueForm.capacity),
      amenities: amenitiesArray,
      category: venueForm.category as any,
      image: selectedVenue?.image || '/src/assets/venue-hero.jpg' // Placeholder
    };

    if (selectedVenue) {
      // Update existing venue
      setVenueLocations(prev => prev.map(v => v.id === selectedVenue.id ? venueData : v));
    } else {
      // Add new venue
      setVenueLocations(prev => [...prev, venueData]);
    }

    resetForm();
  };

  const handleEditVenue = (venue: Location) => {
    setSelectedVenue(venue);
    setVenueForm({
      name: venue.name,
      description: venue.description,
      hourlyRate: venue.hourlyRate.toString(),
      address: venue.address,
      capacity: venue.capacity.toString(),
      category: venue.category,
      amenities: venue.amenities.join(', ')
    });
    setIsAddingVenue(true);
  };

  const handleDeleteVenue = (venueId: string) => {
    if (confirm('Are you sure you want to delete this venue?')) {
      setVenueLocations(prev => prev.filter(v => v.id !== venueId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage venues, bookings, and platform analytics</p>
          </div>
          <Badge variant="outline" className="px-4 py-2">
            Administrator Access
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">${totalRevenue}</div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalBookings}</div>
                  <div className="text-sm text-muted-foreground">Total Bookings</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary-glow/10 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-primary-glow" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{venueLocations.length}</div>
                  <div className="text-sm text-muted-foreground">Active Venues</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalUsers}</div>
                  <div className="text-sm text-muted-foreground">Registered Users</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map(booking => {
                      const venue = venueLocations.find(v => v.id === booking.locationId);
                      const user = users.find(u => u.id === booking.userId);
                      
                      return (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user?.name}</div>
                              <div className="text-sm text-muted-foreground">{user?.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{venue?.name}</div>
                              <div className="text-sm text-muted-foreground">{booking.eventType}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{format(new Date(booking.date), 'MMM d, yyyy')}</div>
                              <div className="text-sm text-muted-foreground">
                                {booking.startTime} - {booking.endTime}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(booking.paymentStatus)}>
                              {booking.paymentStatus.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>${booking.totalPrice}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Venues Tab */}
          <TabsContent value="venues">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Venue Management</h2>
                <Dialog open={isAddingVenue} onOpenChange={setIsAddingVenue}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-primary btn-shine">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Venue
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {selectedVenue ? 'Edit Venue' : 'Add New Venue'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Venue Name *</Label>
                          <Input
                            id="name"
                            value={venueForm.name}
                            onChange={(e) => setVenueForm({...venueForm, name: e.target.value})}
                            placeholder="Grand Crystal Ballroom"
                          />
                        </div>
                        <div>
                          <Label htmlFor="hourlyRate">Hourly Rate ($) *</Label>
                          <Input
                            id="hourlyRate"
                            type="number"
                            value={venueForm.hourlyRate}
                            onChange={(e) => setVenueForm({...venueForm, hourlyRate: e.target.value})}
                            placeholder="500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          value={venueForm.address}
                          onChange={(e) => setVenueForm({...venueForm, address: e.target.value})}
                          placeholder="123 Luxury Avenue, Downtown District, NY 10001"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="capacity">Capacity *</Label>
                          <Input
                            id="capacity"
                            type="number"
                            value={venueForm.capacity}
                            onChange={(e) => setVenueForm({...venueForm, capacity: e.target.value})}
                            placeholder="200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Select value={venueForm.category} onValueChange={(value) => setVenueForm({...venueForm, category: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="conference">Conference</SelectItem>
                              <SelectItem value="wedding">Wedding</SelectItem>
                              <SelectItem value="corporate">Corporate</SelectItem>
                              <SelectItem value="party">Party</SelectItem>
                              <SelectItem value="outdoor">Outdoor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={venueForm.description}
                          onChange={(e) => setVenueForm({...venueForm, description: e.target.value})}
                          placeholder="Elegant venue description..."
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                        <Input
                          id="amenities"
                          value={venueForm.amenities}
                          onChange={(e) => setVenueForm({...venueForm, amenities: e.target.value})}
                          placeholder="Crystal Chandeliers, Dance Floor, Stage"
                        />
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleSubmitVenue} className="flex-1 bg-gradient-primary">
                          {selectedVenue ? 'Update Venue' : 'Add Venue'}
                        </Button>
                        <Button variant="outline" onClick={resetForm}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venueLocations.map(venue => (
                  <Card key={venue.id} className="card-hover">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={venue.image}
                        alt={venue.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleEditVenue(venue)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteVenue(venue.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{venue.name}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline" className="capitalize">
                          {venue.category}
                        </Badge>
                        <span className="font-bold text-primary">${venue.hourlyRate}/hr</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        Up to {venue.capacity} guests
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Revenue Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>This Month</span>
                      <span className="font-bold text-primary">${(totalRevenue * 0.6).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Last Month</span>
                      <span className="font-bold">${(totalRevenue * 0.4).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span>Total Revenue</span>
                      <span className="font-bold text-xl text-primary">${totalRevenue}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Venue Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['wedding', 'corporate', 'conference', 'party'].map(category => {
                      const count = venueLocations.filter(v => v.category === category).length;
                      const percentage = (count / venueLocations.length) * 100;
                      
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{category}</span>
                            <span>{count} venues</span>
                          </div>
                          <div className="w-full bg-secondary/50 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}