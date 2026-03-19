import { motion } from "framer-motion";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { fadeUpVariant, TRANSITION_EASE } from "@/lib/motion";
import { HOTEL_CONFIG } from "@/data/hotel.config";

const AboutSection = () => {
  return (
    <SectionWrapper id="about" subtitle="Our Story" title="A Tradition of Hospitality">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div {...fadeUpVariant} className="space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            For over {HOTEL_CONFIG.stats.yearsOfService} years, {HOTEL_CONFIG.brand.name} has been
            a sanctuary for travelers seeking more than a place to stay. Perched along the
            Malibu coastline, our hotel embodies the art of understated luxury.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Every detail — from the locally sourced linens to the curated art throughout
            our halls — reflects our philosophy: true hospitality is invisible. You won't
            notice the service until you realize everything has already been taken care of.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="border-l-2 border-accent pl-4">
              <span className="heading-display text-3xl text-foreground">{HOTEL_CONFIG.stats.yearsOfService}+</span>
              <p className="text-sm text-muted-foreground mt-1">Years of Excellence</p>
            </div>
            <div className="border-l-2 border-accent pl-4">
              <span className="heading-display text-3xl text-foreground">98%</span>
              <p className="text-sm text-muted-foreground mt-1">Guest Satisfaction</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: TRANSITION_EASE }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
              alt={`${HOTEL_CONFIG.brand.name} lobby`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-accent/50 rounded-2xl -z-10" />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
