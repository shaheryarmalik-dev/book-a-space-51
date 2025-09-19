import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Lock, Calendar, MapPin, Users, Clock } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const bookingData = location.state;

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    phone: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Booking Data Not Found</h1>
          <Button onClick={() => navigate('/')}>Back to Venues</Button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    // Validate form
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || 
        !paymentData.cardholderName || !paymentData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Simulate payment success
      toast({
        title: "Payment Successful! 🎉",
        description: "Your booking has been confirmed. Check your email for details.",
      });

      // Navigate to success page or dashboard
      navigate('/dashboard', { 
        state: { 
          newBooking: {
            ...bookingData,
            paymentStatus: 'paid',
            bookingId: `BK-${Date.now()}`
          }
        }
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Venue
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Venue Info */}
                <div className="flex gap-4">
                  <img
                    src={bookingData.location.image}
                    alt={bookingData.location.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{bookingData.location.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {bookingData.location.address}
                    </div>
                    <Badge variant="outline" className="mt-2 capitalize">
                      {bookingData.location.category}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Event Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Event Details</h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Date</div>
                      <div className="font-medium">{format(bookingData.date, 'EEEE, MMMM d, yyyy')}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Time</div>
                      <div className="font-medium">{bookingData.startTime} - {bookingData.endTime}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Event Type</div>
                      <div className="font-medium capitalize">{bookingData.eventType}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Guests</div>
                      <div className="font-medium flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {bookingData.guestCount}
                      </div>
                    </div>
                  </div>

                  {bookingData.specialRequests && (
                    <div>
                      <div className="text-muted-foreground text-sm">Special Requests</div>
                      <div className="text-sm bg-secondary/50 p-3 rounded-lg mt-1">
                        {bookingData.specialRequests}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Cost Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Cost Breakdown</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Venue rate ({Math.max(2, bookingData.totalCost / bookingData.location.hourlyRate)} hours)</span>
                      <span>${bookingData.totalCost}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Service fee</span>
                      <span>$0 (Demo)</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Taxes</span>
                      <span>$0 (Demo)</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">${bookingData.totalCost}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Secure payment powered by Stripe (Demo Mode)
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Contact Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={paymentData.email}
                        onChange={(e) => setPaymentData({...paymentData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={paymentData.phone}
                        onChange={(e) => setPaymentData({...paymentData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Payment Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Payment Details</h4>
                  
                  <div>
                    <Label htmlFor="cardholder">Cardholder Name *</Label>
                    <Input
                      id="cardholder"
                      placeholder="John Doe"
                      value={paymentData.cardholderName}
                      onChange={(e) => setPaymentData({...paymentData, cardholderName: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="card-number">Card Number *</Label>
                    <Input
                      id="card-number"
                      placeholder="4242 4242 4242 4242 (Demo)"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date *</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Security Notice */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                {/* Terms */}
                <div className="text-xs text-muted-foreground">
                  By proceeding with this booking, you agree to our Terms of Service and 
                  understand this is a demo booking with placeholder payment processing.
                </div>

                {/* Submit Button */}
                <Button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-primary hover:shadow-elegant btn-shine"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Complete Booking - ${bookingData.totalCost}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Demo Mode: No real payment will be processed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}