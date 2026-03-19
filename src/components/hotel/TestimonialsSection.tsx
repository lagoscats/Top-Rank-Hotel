import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { TESTIMONIALS } from "@/data/testimonials";
import { TRANSITION_EASE } from "@/lib/motion";

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const testimonial = TESTIMONIALS[current];

  return (
    <SectionWrapper id="testimonials" subtitle="Guest Voices" title="What They Say" className="bg-secondary/30">
      <div className="max-w-3xl mx-auto text-center">
        <Quote size={40} strokeWidth={1} className="mx-auto mb-8 text-accent" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: TRANSITION_EASE }}
          >
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  strokeWidth={1.25}
                  className={i < testimonial.rating ? "fill-hotel-warm text-hotel-warm" : "text-border"}
                />
              ))}
            </div>
            <p className="heading-display-italic text-xl md:text-2xl text-foreground/80 leading-relaxed mb-8">
              "{testimonial.text}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-accent"
              />
              <div className="text-left">
                <p className="font-body font-medium text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-10">
          <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
            <ChevronLeft size={18} strokeWidth={1.25} />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-foreground w-6" : "bg-border"
                }`}
              />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
            <ChevronRight size={18} strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TestimonialsSection;
