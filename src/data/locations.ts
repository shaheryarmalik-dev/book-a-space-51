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

export const locations: Location[] = [
  {
    id: '1',
    name: 'Grand Crystal Ballroom',
    description: 'An elegant ballroom featuring stunning crystal chandeliers, ornate architectural details, and sophisticated décor. Perfect for weddings, galas, and upscale corporate events. The space exudes luxury with its high ceilings and timeless design.',
    hourlyRate: 500,
    address: '123 Luxury Avenue, Downtown District, NY 10001',
    image: '/src/assets/ballroom.jpg',
    capacity: 200,
    amenities: ['Crystal Chandeliers', 'Dance Floor', 'Stage', 'Premium Sound System', 'Catering Kitchen', 'Valet Parking'],
    category: 'wedding'
  },
  {
    id: '2',
    name: 'Executive Conference Center',
    description: 'State-of-the-art conference facility with panoramic city views through floor-to-ceiling windows. Features modern technology integration, ergonomic seating, and professional lighting perfect for board meetings and corporate presentations.',
    hourlyRate: 300,
    address: '456 Business Plaza, Financial District, NY 10002',
    image: '/src/assets/conference-room.jpg',
    capacity: 50,
    amenities: ['4K Projectors', 'Video Conferencing', 'High-Speed WiFi', 'Whiteboard Walls', 'Coffee Station', 'Climate Control'],
    category: 'conference'
  },
  {
    id: '3',
    name: 'Enchanted Garden Pavilion',
    description: 'A magical outdoor venue surrounded by lush landscaping and twinkling string lights. The white pavilion provides an intimate setting for romantic weddings and garden parties with natural beauty as your backdrop.',
    hourlyRate: 400,
    address: '789 Garden Way, Botanical Gardens, NY 10003',
    image: '/src/assets/garden-venue.jpg',
    capacity: 150,
    amenities: ['Garden Setting', 'String Lighting', 'Bridal Suite', 'Outdoor Kitchen', 'Fountain Feature', 'Weather Contingency'],
    category: 'wedding'
  },
  {
    id: '4',
    name: 'Skyline Rooftop Terrace',
    description: 'Contemporary rooftop venue offering breathtaking 360-degree city views. Modern glass railings and ambient lighting create the perfect atmosphere for cocktail receptions, launch parties, and networking events.',
    hourlyRate: 600,
    address: '321 Heights Boulevard, Midtown East, NY 10004',
    image: '/src/assets/rooftop-venue.jpg',
    capacity: 100,
    amenities: ['City Views', 'Glass Railings', 'Bar Setup', 'Lounge Seating', 'Heaters', 'Elevator Access'],
    category: 'party'
  },
  {
    id: '5',
    name: 'Industrial Warehouse Loft',
    description: 'Trendy warehouse space with exposed brick walls, industrial fixtures, and polished concrete floors. The raw urban aesthetic makes it ideal for modern weddings, art exhibitions, and creative corporate events.',
    hourlyRate: 350,
    address: '654 Factory Street, Arts District, NY 10005',
    image: '/src/assets/warehouse.jpg',
    capacity: 180,
    amenities: ['Exposed Brick', 'High Ceilings', 'Loading Dock', 'Industrial Lighting', 'Open Floor Plan', 'Sound System'],
    category: 'corporate'
  },
  {
    id: '6',
    name: 'Heritage Manor Estate',
    description: 'Historic estate venue with classic architecture and manicured grounds. Features original hardwood floors, vintage chandeliers, and multiple reception areas perfect for traditional weddings and formal gatherings.',
    hourlyRate: 450,
    address: '987 Heritage Lane, Historic District, NY 10006',
    image: '/src/assets/venue-hero.jpg',
    capacity: 120,
    amenities: ['Historic Architecture', 'Multiple Rooms', 'Bridal Suite', 'Catering Kitchen', 'Garden Terrace', 'Grand Staircase'],
    category: 'wedding'
  },
  {
    id: '7',
    name: 'Modern Tech Hub',
    description: 'Cutting-edge venue designed for innovation and collaboration. Features smart technology integration, flexible modular furniture, and creative spaces perfect for tech conferences, product launches, and startup events.',
    hourlyRate: 400,
    address: '147 Innovation Drive, Tech Quarter, NY 10007',
    image: '/src/assets/conference-room.jpg',
    capacity: 80,
    amenities: ['Smart Technology', 'Modular Furniture', 'Recording Studio', 'Green Screen Room', 'Fast Charging Stations', 'Collaboration Zones'],
    category: 'conference'
  },
  {
    id: '8',
    name: 'Lakeside Pavilion',
    description: 'Serene waterfront venue with stunning lake views and natural surroundings. The covered pavilion provides weather protection while maintaining the beauty of an outdoor setting for memorable celebrations.',
    hourlyRate: 375,
    address: '258 Lakefront Road, Waterside Park, NY 10008',
    image: '/src/assets/garden-venue.jpg',
    capacity: 140,
    amenities: ['Lake Views', 'Covered Pavilion', 'Dock Access', 'Fire Pit', 'Outdoor Kitchen', 'Scenic Walking Trails'],
    category: 'outdoor'
  },
  {
    id: '9',
    name: 'Metropolitan Art Gallery',
    description: 'Sophisticated gallery space with white walls, track lighting, and polished floors. The minimalist design allows your event to take center stage while providing an elegant backdrop for art shows and upscale receptions.',
    hourlyRate: 550,
    address: '369 Culture Street, Museum District, NY 10009',
    image: '/src/assets/ballroom.jpg',
    capacity: 90,
    amenities: ['Gallery Lighting', 'White Walls', 'Security System', 'Climate Control', 'Installation Equipment', 'Reception Area'],
    category: 'corporate'
  },
  {
    id: '10',
    name: 'Penthouse Sky Lounge',
    description: 'Exclusive penthouse venue with floor-to-ceiling windows and premium city views. Features luxury furnishings, a full bar, and outdoor terrace making it perfect for VIP events and intimate celebrations.',
    hourlyRate: 700,
    address: '741 Elite Tower, Luxury District, NY 10010',
    image: '/src/assets/rooftop-venue.jpg',
    capacity: 60,
    amenities: ['Premium Views', 'Full Bar', 'Luxury Furnishings', 'Outdoor Terrace', 'Private Elevator', 'Concierge Service'],
    category: 'party'
  },
  {
    id: '11',
    name: 'Eclectic Creative Space | Crystals, Buddha, Natural Light – L.A. Gem',
    description: 'A unique creative sanctuary featuring natural crystals, Buddha statues, and abundant natural light. This eclectic space offers a peaceful, spiritual atmosphere perfect for wellness events, creative workshops, and intimate gatherings.',
    hourlyRate: 57,
    address: 'Central LA, Los Ángeles, CA',
    image: '/src/assets/creative-space.jpg',
    capacity: 25,
    amenities: ['Natural Light', 'Crystal Decor', 'Buddha Statues', 'Meditation Space', 'Creative Setup', 'Peaceful Atmosphere'],
    category: 'corporate'
  },
  {
    id: '12',
    name: 'Joshua Tree Oasis',
    description: 'Desert retreat nestled in the mystical Joshua Tree landscape. Perfect for unique outdoor events, spiritual gatherings, and creative retreats with stunning desert views and natural beauty as your backdrop.',
    hourlyRate: 70,
    address: 'Joshua Tree, CA',
    image: '/src/assets/joshua-tree.jpg',
    capacity: 40,
    amenities: ['Desert Views', 'Natural Setting', 'Outdoor Space', 'Stargazing', 'Hiking Access', 'Peaceful Environment'],
    category: 'outdoor'
  },
  {
    id: '13',
    name: 'Eclectic Creative Space | Crystals, Buddha, Natural Light – L.A. Gem (Production)',
    description: 'The production-ready version of our creative sanctuary, equipped with professional lighting and camera-friendly setup. Ideal for film productions, photography shoots, and professional creative content creation.',
    hourlyRate: 60,
    address: 'Central LA, Los Ángeles, CA',
    image: '/src/assets/creative-space-production.jpg',
    capacity: 30,
    amenities: ['Production Lighting', 'Camera Setup', 'Natural Light', 'Crystal Decor', 'Professional Equipment', 'Quiet Environment'],
    category: 'corporate'
  },
  {
    id: '14',
    name: 'Joshua Tree Oasis (Production)',
    description: 'Desert oasis equipped for professional productions with power access and equipment-friendly terrain. Perfect for film shoots, photo sessions, and commercial productions in the iconic Joshua Tree setting.',
    hourlyRate: 70,
    address: 'Joshua Tree, CA',
    image: '/src/assets/joshua-tree-production.jpg',
    capacity: 50,
    amenities: ['Power Access', 'Equipment Setup', 'Desert Views', 'Production Ready', 'Vehicle Access', 'Professional Support'],
    category: 'outdoor'
  }
];