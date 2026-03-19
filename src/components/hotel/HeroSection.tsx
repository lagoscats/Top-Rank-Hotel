import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOTEL_CONFIG } from "@/data/hotel.config";
import { TRANSITION_EASE } from "@/lib/motion";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80",
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % HERO_IMAGES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + HERO_IMAGES.length) % HERO_IMAGES.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
      {/* Image Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: TRANSITION_EASE }}
          className="absolute inset-0"
        >
          <img
            src={HERO_IMAGES[current]}
            alt={`${HOTEL_CONFIG.brand.name} hotel view`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: TRANSITION_EASE, delay: 0.3 }}
            className="max-w-3xl"
          >
            <span className="heading-display-italic text-primary-foreground/70 text-lg md:text-xl block mb-4">
              Welcome to
            </span>
            <h1 className="heading-display text-primary-foreground text-5xl md:text-7xl lg:text-8xl mb-6">
              {HOTEL_CONFIG.brand.name}
            </h1>
            <p className="heading-display-italic text-primary-foreground/80 text-xl md:text-2xl mb-10 max-w-lg">
              {HOTEL_CONFIG.brand.tagline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" onClick={() => scrollTo("#booking")}>
                Book a Room
              </Button>
              <Button variant="hero-outline" size="xl" onClick={() => scrollTo("#rooms")}>
                View Rooms
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground/40 transition-colors backdrop-blur-sm"
        >
          <ChevronLeft size={18} strokeWidth={1.25} />
        </button>
        <div className="flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-8 h-0.5 rounded-full transition-all duration-500 ${
                i === current ? "bg-primary-foreground" : "bg-primary-foreground/30"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground/40 transition-colors backdrop-blur-sm"
        >
          <ChevronRight size={18} strokeWidth={1.25} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
