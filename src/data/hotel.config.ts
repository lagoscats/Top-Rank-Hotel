export const HOTEL_CONFIG = {
  brand: {
    name: "Top Rank Hotel",
    tagline: "Sanctuary between the tides",
    logo: "/brand/logo.svg",
  },
  contact: {
    phone: "+1 (555) 012-3456",
    email: "stay@toprank.com",
    address: "1B Hillview Ave, Independence Layout, Enugu 400102, Enugu",
    whatsapp: "+15550123456",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.215!2d-118.7798!3d34.0259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAxJzMzLjIiTiAxMTjCsDQ2Jzc4LjkiVw!5e0!3m2!1sen!2sus!4v1",
  },
  social: {
    instagram: "https://instagram.com/lhorizon",
    facebook: "https://facebook.com/lhorizon",
    twitter: "https://twitter.com/lhorizon",
    tripadvisor: "https://tripadvisor.com/lhorizon",
  },
  features: {
    hasBooking: true,
    hasReviews: true,
    currency: "USD",
    currencySymbol: "$",
  },
  stats: {
    rooms: 120,
    yearsOfService: 25,
    happyGuests: 15000,
    eventsHosted: 500,
  },
  seo: {
    title: "Top Rank Hotel — Sanctuary Between the Tides | Top Rank Hotel",
    description: "Experience unparalleled luxury at Top Rank Hotel. A coastal sanctuary in Malibu offering world-class rooms, dining, and ocean views. Book your escape today.",
  },
} as const;

export type HotelConfig = typeof HOTEL_CONFIG;
