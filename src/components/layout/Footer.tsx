import { HOTEL_CONFIG } from "@/data/hotel.config";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const quickLinks = ["Home", "About", "Rooms", "Services", "Gallery", "Contact"];

  const scrollTo = (id: string) => {
    document.querySelector(`#${id.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl font-semibold mb-3">{HOTEL_CONFIG.brand.name}</h3>
            <p className="font-display italic text-primary-foreground/60 text-lg mb-6">
              {HOTEL_CONFIG.brand.tagline}
            </p>
            <div className="flex gap-4">
              <a href={HOTEL_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                <Instagram size={20} strokeWidth={1.25} />
              </a>
              <a href={HOTEL_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                <Facebook size={20} strokeWidth={1.25} />
              </a>
              <a href={HOTEL_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                <Twitter size={20} strokeWidth={1.25} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground/40 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/60">
                <MapPin size={16} strokeWidth={1.25} className="mt-0.5 shrink-0" />
                {HOTEL_CONFIG.contact.address}
              </li>
              <li>
                <a href={`tel:${HOTEL_CONFIG.contact.phone}`} className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  <Phone size={16} strokeWidth={1.25} />
                  {HOTEL_CONFIG.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${HOTEL_CONFIG.contact.email}`} className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  <Mail size={16} strokeWidth={1.25} />
                  {HOTEL_CONFIG.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground/40 mb-5">
              Newsletter
            </h4>
            <p className="text-sm text-primary-foreground/50 mb-4">
              Receive exclusive offers and travel inspiration.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/15 rounded-lg px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-primary-foreground/30"
              />
              <button
                type="submit"
                className="bg-primary-foreground/15 border border-primary-foreground/20 hover:bg-primary-foreground/25 text-primary-foreground px-4 py-2.5 rounded-lg text-sm transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-14 pt-8 text-center">
          <p className="text-sm text-primary-foreground/30">
            © {new Date().getFullYear()} {HOTEL_CONFIG.brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
