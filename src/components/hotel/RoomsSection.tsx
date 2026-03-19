import { motion } from "framer-motion";
import { Users, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { fadeUpVariant, TRANSITION_EASE } from "@/lib/motion";
import { ROOMS } from "@/data/rooms";
import { HOTEL_CONFIG } from "@/data/hotel.config";

const RoomCard = ({ room, index }: { room: typeof ROOMS[0]; index: number }) => {
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: TRANSITION_EASE, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-shadow duration-500 border border-border/50"
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <motion.div
          className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
        >
          <span className="text-price text-2xl font-medium text-primary-foreground">
            {HOTEL_CONFIG.features.currencySymbol}{room.pricePerNight}
          </span>
          <span className="text-primary-foreground/60 text-sm ml-1">/night</span>
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="heading-display text-xl mb-2 text-card-foreground">{room.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{room.description}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
          <span className="flex items-center gap-1.5">
            <Users size={14} strokeWidth={1.25} /> {room.capacity} guests
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize2 size={14} strokeWidth={1.25} /> {room.size}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {room.amenities.slice(0, 3).map((a) => (
            <span key={a} className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">
              {a}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="text-xs text-muted-foreground px-2.5 py-1">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          <Button size="sm" className="flex-1" onClick={scrollToBooking}>
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const RoomsSection = () => {
  return (
    <SectionWrapper id="rooms" subtitle="Accommodations" title="Your Room Awaits">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {ROOMS.map((room, i) => (
          <RoomCard key={room.id} room={room} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default RoomsSection;
