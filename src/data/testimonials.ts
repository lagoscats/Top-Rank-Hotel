export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Elena Vasquez",
    location: "Barcelona, Spain",
    rating: 5,
    text: "An unforgettable stay. The attention to detail is extraordinary — from the welcome amenities to the sunset dinner on the terrace. This is hospitality at its finest.",
    date: "2025-11-15",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: "2",
    name: "James Chen",
    location: "Singapore",
    rating: 5,
    text: "We've stayed at luxury hotels around the world, and L'Horizon stands apart. The Ocean Suite views alone are worth the trip. Staff anticipated every need before we asked.",
    date: "2025-10-22",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    id: "3",
    name: "Amara Osei",
    location: "London, UK",
    rating: 5,
    text: "Pure magic. The coastal cabin felt like our own private world. We extended our stay twice. Already planning our return.",
    date: "2025-09-08",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
  {
    id: "4",
    name: "Marco Bellini",
    location: "Milan, Italy",
    rating: 4,
    text: "Beautiful property with impeccable design sensibility. The restaurant deserves its own accolades. A true sanctuary.",
    date: "2025-08-30",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
];
