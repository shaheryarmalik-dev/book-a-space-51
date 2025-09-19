export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  phone?: string;
  company?: string;
}

export interface Booking {
  id: string;
  locationId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  eventType: string;
  guestCount: number;
  specialRequests?: string;
  createdAt: string;
}

// Placeholder users for demo
export const users: User[] = [
  {
    id: 'admin-1',
    email: 'admin@eventbooking.com',
    name: 'Sarah Johnson',
    role: 'admin',
    phone: '+1 (555) 123-4567',
    company: 'Event Booking Platform'
  },
  {
    id: 'user-1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'user',
    phone: '+1 (555) 987-6543',
    company: 'Tech Innovations Inc.'
  },
  {
    id: 'user-2',
    email: 'emily.chen@example.com',
    name: 'Emily Chen',
    role: 'user',
    phone: '+1 (555) 456-7890',
    company: 'Creative Solutions Ltd.'
  }
];

// Placeholder bookings for demo
export const bookings: Booking[] = [
  {
    id: 'booking-1',
    locationId: '1',
    userId: 'user-1',
    date: '2024-10-15',
    startTime: '18:00',
    endTime: '23:00',
    totalHours: 5,
    totalPrice: 2500,
    paymentStatus: 'paid',
    eventType: 'Wedding Reception',
    guestCount: 150,
    specialRequests: 'Need vegetarian catering options and live music setup',
    createdAt: '2024-09-20T10:30:00Z'
  },
  {
    id: 'booking-2',
    locationId: '2',
    userId: 'user-2',
    date: '2024-10-08',
    startTime: '09:00',
    endTime: '17:00',
    totalHours: 8,
    totalPrice: 2400,
    paymentStatus: 'paid',
    eventType: 'Corporate Conference',
    guestCount: 45,
    specialRequests: 'Video recording required for remote attendees',
    createdAt: '2024-09-18T14:15:00Z'
  },
  {
    id: 'booking-3',
    locationId: '4',
    userId: 'user-1',
    date: '2024-10-25',
    startTime: '19:00',
    endTime: '22:00',
    totalHours: 3,
    totalPrice: 1800,
    paymentStatus: 'pending',
    eventType: 'Product Launch',
    guestCount: 80,
    specialRequests: 'Photography and cocktail service needed',
    createdAt: '2024-09-22T16:45:00Z'
  }
];