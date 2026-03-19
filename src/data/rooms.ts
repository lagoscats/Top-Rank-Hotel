export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  size: string;
  image: string;
  amenities: string[];
  featured?: boolean;
}

export const ROOMS: Room[] = [
  {
    id: "ocean-suite",
    name: "Ocean Suite",
    description: "Wake to panoramic ocean views from your private balcony. A spacious retreat with king bed and marble bathroom.",
    pricePerNight: 650,
    capacity: 2,
    size: "55 m²",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    amenities: ["Ocean View", "King Bed", "Balcony", "Mini Bar", "Free WiFi"],
    featured: true,
  },
  {
    id: "garden-room",
    name: "Garden Room",
    description: "Nestled among lush gardens, this serene room offers a peaceful escape with natural light and botanical views.",
    pricePerNight: 350,
    capacity: 2,
    size: "35 m²",
    image: "https://images.unsplash.com/photo-1590490360182-c33d7d2a402e?w=800&q=80",
    amenities: ["Garden View", "Queen Bed", "Rainfall Shower", "Free WiFi"],
  },
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    description: "Our finest accommodation. Two bedrooms, a private lounge, and a wraparound terrace overlooking the Pacific.",
    pricePerNight: 1200,
    capacity: 4,
    size: "110 m²",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    amenities: ["Panoramic View", "2 King Beds", "Lounge", "Butler Service", "Jacuzzi"],
    featured: true,
  },
  {
    id: "deluxe-double",
    name: "Deluxe Double",
    description: "Elegantly appointed with two double beds, ideal for families or friends traveling together.",
    pricePerNight: 450,
    capacity: 4,
    size: "45 m²",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    amenities: ["City View", "2 Double Beds", "Desk", "Free WiFi", "Mini Bar"],
  },
  {
    id: "coastal-cabin",
    name: "Coastal Cabin",
    description: "A cozy, intimate space with warm wood finishes and direct beach access for the adventurous soul.",
    pricePerNight: 280,
    capacity: 2,
    size: "28 m²",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    amenities: ["Beach Access", "Queen Bed", "Outdoor Shower", "Free WiFi"],
  },
  {
    id: "penthouse",
    name: "The Penthouse",
    description: "The pinnacle of coastal living. Floor-to-ceiling glass, a private pool, and uninterrupted horizon views.",
    pricePerNight: 2500,
    capacity: 6,
    size: "200 m²",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    amenities: ["Private Pool", "3 Bedrooms", "Chef Kitchen", "Concierge", "Helipad Access"],
    featured: true,
  },
];
