import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
}

const SectionWrapper = ({ children, className, id, title, subtitle }: SectionWrapperProps) => {
  return (
    <section id={id} className={cn("section-padding", className)}>
      <div className="container mx-auto max-w-7xl">
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-14 md:mb-20"
            {...fadeUpVariant}
          >
            {subtitle && (
              <span className="heading-display-italic text-lg md:text-xl text-muted-foreground block mb-3">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="heading-display text-3xl md:text-5xl lg:text-6xl text-foreground">
                {title}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
