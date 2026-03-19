import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOTEL_CONFIG } from "@/data/hotel.config";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/90 backdrop-blur-xl shadow-soft border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button onClick={() => scrollTo("#home")} className="relative z-10">
            <span className={cn(
              "font-display text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-primary-foreground"
            )}>
              {HOTEL_CONFIG.brand.name}
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-foreground/5",
                  isScrolled ? "text-foreground/70 hover:text-foreground" : "text-primary-foreground/80 hover:text-primary-foreground"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${HOTEL_CONFIG.contact.phone}`}
              className={cn(
                "flex items-center gap-2 text-sm transition-colors duration-300",
                isScrolled ? "text-muted-foreground" : "text-primary-foreground/70"
              )}
            >
              <Phone className="w-4 h-4" strokeWidth={1.25} />
              <span className="font-mono text-xs">{HOTEL_CONFIG.contact.phone}</span>
            </a>
            <a
              href="/login"
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                isScrolled ? "text-muted-foreground hover:text-foreground" : "text-primary-foreground/70 hover:text-primary-foreground"
              )}
            >
              Login
            </a>
            <Button
              size="sm"
              onClick={() => scrollTo("#booking")}
              className={cn(
                isScrolled ? "" : "bg-primary-foreground/15 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/25"
              )}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={cn(
              "lg:hidden relative z-10 p-2",
              isScrolled || isMobileOpen ? "text-foreground" : "text-primary-foreground"
            )}
          >
            {isMobileOpen ? <X strokeWidth={1.25} /> : <Menu strokeWidth={1.25} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-3 text-lg font-display text-foreground/80 hover:text-foreground transition-colors border-b border-border/50 last:border-0"
                >
                  {link.label}
                </motion.button>
              ))}
              <Button size="lg" className="mt-4" onClick={() => scrollTo("#booking")}>
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
