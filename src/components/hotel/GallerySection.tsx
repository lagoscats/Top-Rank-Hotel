import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { GALLERY_IMAGES, type GalleryImage } from "@/data/gallery";
import { TRANSITION_EASE } from "@/lib/motion";

const CATEGORIES = ["all", "rooms", "dining", "spa", "exterior", "events"] as const;

const GallerySection = () => {
  const [filter, setFilter] = useState<string>("all");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const filtered = filter === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === filter);

  return (
    <SectionWrapper id="gallery" subtitle="Visual Journey" title="Gallery">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm capitalize transition-all duration-300 ${
              filter === cat
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((img) => (
            <motion.button
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: TRANSITION_EASE }}
              onClick={() => setLightbox(img)}
              className="aspect-square rounded-xl overflow-hidden group relative"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={28} strokeWidth={1.25} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};

export default GallerySection;
