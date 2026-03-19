import { motion } from "framer-motion";
import { Wifi, Waves, UtensilsCrossed, WashingMachine, Building2, Car, Dumbbell, Coffee } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { TRANSITION_EASE } from "@/lib/motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SERVICES = [
  { icon: Wifi, label: "Free WiFi", description: "High-speed connectivity throughout the property" },
  { icon: Waves, label: "Swimming Pool", description: "Heated infinity pool with ocean views" },
  { icon: UtensilsCrossed, label: "Fine Dining", description: "Farm-to-table cuisine by award-winning chefs" },
  { icon: WashingMachine, label: "Laundry", description: "Same-day laundry and dry cleaning service" },
  { icon: Building2, label: "Conference Hall", description: "State-of-the-art meeting rooms for up to 200 guests" },
  { icon: Car, label: "Valet Parking", description: "Complimentary valet with electric vehicle charging" },
  { icon: Dumbbell, label: "Fitness Center", description: "24/7 gym with personal training available" },
  { icon: Coffee, label: "Café & Bar", description: "Artisan coffee bar and cocktail lounge" },
];

const ServicesSection = () => {
  return (
    <SectionWrapper id="services" subtitle="What We Offer" title="Services & Amenities" className="bg-secondary/30">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {SERVICES.map((service, i) => (
          <Tooltip key={service.label}>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: TRANSITION_EASE, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-6 md:p-8 text-center hover-lift cursor-default border border-border/50 group"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/50 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                  <service.icon size={22} strokeWidth={1.25} className="text-foreground/70" />
                </div>
                <h3 className="font-body text-sm font-medium text-foreground">{service.label}</h3>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{service.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ServicesSection;
