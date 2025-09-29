export interface Location {
  id: string;
  name: string;
  description: string;
  hourlyRate: number;
  address: string;
  image: string;
  capacity: number;
  amenities: string[];
  category: 'conference' | 'wedding' | 'corporate' | 'party' | 'outdoor';
}

// Premium featured venues only (Giggster-inspired)
export const locations: Location[] = [
  {
    id: '1',
    name: 'Downtown Loft - NYC',
    description: 'Modern & Sunny downtown loft with floor-to-ceiling windows, exposed brick, and contemporary furnishings. Perfect for intimate events, photo shoots, and creative gatherings in the heart of Manhattan.',
    hourlyRate: 500,
    address: 'SoHo, New York, NY',
    image: '/src/assets/warehouse.jpg',
    capacity: 50,
    amenities: ['Natural Light', 'Exposed Brick', 'Modern Furnishings', 'City Views', 'Photography Setup', 'Sound System'],
    category: 'corporate'
  },
  {
    id: '2',
    name: 'Rustic Barn - LA',
    description: 'Rustic Charm meets modern amenities in this beautifully restored barn venue. Featuring exposed wooden beams, vintage chandeliers, and stunning countryside views perfect for weddings and special celebrations.',
    hourlyRate: 400,
    address: 'Malibu, Los Angeles, CA',
    image: '/src/assets/ballroom.jpg',
    capacity: 80,
    amenities: ['Rustic Decor', 'Vintage Chandeliers', 'Countryside Views', 'Bridal Suite', 'Catering Kitchen', 'Parking'],
    category: 'wedding'
  },
  {
    id: '3',
    name: 'Gallery Space - SF',
    description: 'Artistic Vibes flow through this contemporary gallery space with white walls, professional lighting, and polished concrete floors. Ideal for art exhibitions, product launches, and sophisticated events.',
    hourlyRate: 600,
    address: 'Mission District, San Francisco, CA',
    image: '/src/assets/conference-room.jpg',
    capacity: 40,
    amenities: ['Gallery Lighting', 'White Walls', 'Art Installation', 'Professional Setup', 'Climate Control', 'Security'],
    category: 'corporate'
  },
  {
    id: '4',
    name: 'Pool Venue - Miami',
    description: 'Tropical Oasis featuring a stunning infinity pool, palm trees, and ocean views. This luxury venue offers the perfect Miami vibe for pool parties, brand activations, and exclusive events.',
    hourlyRate: 450,
    address: 'South Beach, Miami, FL',
    image: '/src/assets/rooftop-venue.jpg',
    capacity: 60,
    amenities: ['Infinity Pool', 'Ocean Views', 'Palm Trees', 'Bar Service', 'Luxury Loungers', 'Valet Parking'],
    category: 'party'
  }
];