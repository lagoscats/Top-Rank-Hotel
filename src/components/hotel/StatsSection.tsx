import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Hotel, Calendar, Heart, PartyPopper } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { HOTEL_CONFIG } from "@/data/hotel.config";
import { TRANSITION_EASE } from "@/lib/motion";

const STATS = [
  { icon: Hotel, value: HOTEL_CONFIG.stats.rooms, suffix: "+", label: "Luxury Rooms" },
  { icon: Calendar, value: HOTEL_CONFIG.stats.yearsOfService, suffix: "+", label: "Years of Service" },
  { icon: Heart, value: HOTEL_CONFIG.stats.happyGuests, suffix: "+", label: "Happy Guests" },
  { icon: PartyPopper, value: HOTEL_CONFIG.stats.eventsHosted, suffix: "+", label: "Events Hosted" },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-price text-4xl md:text-5xl font-medium text-foreground">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <SectionWrapper className="bg-secondary/30">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: TRANSITION_EASE, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <stat.icon size={28} strokeWidth={1.25} className="mx-auto mb-4 text-muted-foreground" />
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default StatsSection;
