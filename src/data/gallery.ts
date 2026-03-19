export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "rooms" | "dining" | "spa" | "exterior" | "events";
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", alt: "Hotel exterior at sunset", category: "exterior" },
  { id: "2", src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80", alt: "Luxury ocean suite bedroom", category: "rooms" },
  { id: "3", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Fine dining restaurant", category: "dining" },
  { id: "4", src: "https://images.unsplash.com/photo-1540555700478-4be289fbec6a?w=800&q=80", alt: "Infinity pool overlooking ocean", category: "exterior" },
  { id: "5", src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", alt: "Spa treatment room", category: "spa" },
  { id: "6", src: "https://images.unsplash.com/photo-1590490360182-c33d7d2a402e?w=800&q=80", alt: "Garden room interior", category: "rooms" },
  { id: "7", src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", alt: "Beachside event setup", category: "events" },
  { id: "8", src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", alt: "Hotel lobby at night", category: "exterior" },
  { id: "9", src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", alt: "Rooftop bar view", category: "dining" },
  { id: "10", src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", alt: "Presidential suite", category: "rooms" },
  { id: "11", src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80", alt: "Spa pool area", category: "spa" },
  { id: "12", src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", alt: "Wedding ceremony setup", category: "events" },
];
