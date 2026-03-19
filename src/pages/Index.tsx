import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hotel/HeroSection";
import AboutSection from "@/components/hotel/AboutSection";
import RoomsSection from "@/components/hotel/RoomsSection";
import ServicesSection from "@/components/hotel/ServicesSection";
import StatsSection from "@/components/hotel/StatsSection";
import GallerySection from "@/components/hotel/GallerySection";
import TestimonialsSection from "@/components/hotel/TestimonialsSection";
import ContactSection from "@/components/hotel/ContactSection";
import BookingSection from "@/components/hotel/BookingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <RoomsSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <BookingSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
