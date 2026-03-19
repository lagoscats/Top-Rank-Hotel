import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { HOTEL_CONFIG } from "@/data/hotel.config";
import { fadeUpVariant, TRANSITION_EASE } from "@/lib/motion";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <SectionWrapper id="contact" subtitle="Get in Touch" title="Contact Us">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Form */}
        <motion.form onSubmit={handleSubmit} {...fadeUpVariant} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="h-12"
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="h-12"
            />
          </div>
          <Input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="h-12"
          />
          <Textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
          />
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            <Send size={16} strokeWidth={1.25} />
            Send Message
          </Button>
        </motion.form>

        {/* Info + Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: TRANSITION_EASE }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center shrink-0">
                <MapPin size={18} strokeWidth={1.25} />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Address</p>
                <p className="text-muted-foreground text-sm">{HOTEL_CONFIG.contact.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center shrink-0">
                <Phone size={18} strokeWidth={1.25} />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Phone</p>
                <a href={`tel:${HOTEL_CONFIG.contact.phone}`} className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  {HOTEL_CONFIG.contact.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center shrink-0">
                <Mail size={18} strokeWidth={1.25} />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Email</p>
                <a href={`mailto:${HOTEL_CONFIG.contact.email}`} className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                  {HOTEL_CONFIG.contact.email}
                </a>
              </div>
            </div>
            <a
              href={`https://wa.me/${HOTEL_CONFIG.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground bg-secondary hover:bg-accent px-5 py-3 rounded-lg transition-colors"
            >
              <MessageCircle size={18} strokeWidth={1.25} />
              Chat on WhatsApp
            </a>
          </div>

          <div className="rounded-xl overflow-hidden border border-border h-64 lg:h-72">
            <iframe
              src={HOTEL_CONFIG.contact.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hotel location"
            />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
