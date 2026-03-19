import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { ROOMS as STATIC_ROOMS } from "@/data/rooms";
import { HOTEL_CONFIG } from "@/data/hotel.config";
import { fadeUpVariant } from "@/lib/motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const BookingSection = () => {
  const { toast } = useToast();
  const [agreed, setAgreed] = useState(false);
  const [dbRooms, setDbRooms] = useState<Tables<"rooms">[]>([]);
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: "",
    room: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    supabase.from("rooms").select("*").eq("active", true).then(({ data }) => {
      if (data && data.length > 0) setDbRooms(data);
    });
  }, []);

  // Use DB rooms if available, otherwise fall back to static data
  const rooms = dbRooms.length > 0
    ? dbRooms.map(r => ({ id: r.id, name: r.name, pricePerNight: r.price_per_night }))
    : STATIC_ROOMS.map(r => ({ id: r.id, name: r.name, pricePerNight: r.pricePerNight }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({ title: "Please agree to Terms", description: "You must accept the Terms of Service to continue.", variant: "destructive" });
      return;
    }

    const selectedRoom = rooms.find(r => r.id === form.room);
    const checkIn = new Date(form.checkIn);
    const checkOut = new Date(form.checkOut);
    const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    const totalPrice = selectedRoom ? selectedRoom.pricePerNight * nights : null;

    const { error } = await supabase.from("bookings").insert({
      room_id: dbRooms.length > 0 ? form.room : null,
      guest_name: form.name,
      guest_email: form.email,
      guest_phone: form.phone || null,
      check_in: form.checkIn,
      check_out: form.checkOut,
      num_guests: Number(form.guests) || 1,
      total_price: totalPrice,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    toast({
      title: "Booking Request Received!",
      description: "We'll confirm your reservation via email within 2 hours.",
    });
    setForm({ checkIn: "", checkOut: "", guests: "", room: "", name: "", email: "", phone: "" });
    setAgreed(false);
  };

  return (
    <SectionWrapper id="booking" subtitle="Reserve Your Stay" title="Book a Room" className="bg-primary/[0.03]">
      <motion.div {...fadeUpVariant} className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-background rounded-2xl p-6 md:p-10 shadow-medium border border-border/50 space-y-6">
          {/* Dates & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-2">
                <CalendarDays size={14} strokeWidth={1.25} /> Check-in
              </label>
              <Input
                type="date"
                value={form.checkIn}
                onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                required
                className="h-12"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-2">
                <CalendarDays size={14} strokeWidth={1.25} /> Check-out
              </label>
              <Input
                type="date"
                value={form.checkOut}
                onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                required
                className="h-12"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-2">
                <Users size={14} strokeWidth={1.25} /> Guests
              </label>
              <Select value={form.guests} onValueChange={(v) => setForm({ ...form, guests: v })}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "Guest" : "Guests"}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Room Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Room Type</label>
            <Select value={form.room} onValueChange={(v) => setForm({ ...form, room: v })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select a room" />
              </SelectTrigger>
              <SelectContent>
                {rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.name} — {HOTEL_CONFIG.features.currencySymbol}{room.pricePerNight}/night
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Guest Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="h-12"
            />
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="h-12"
            />
            <Input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="h-12"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(v) => setAgreed(v === true)}
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          {/* Submit */}
          <Button type="submit" size="lg" className="w-full">
            <CreditCard size={16} strokeWidth={1.25} />
            Confirm Reservation
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Payment will be processed securely after confirmation.
          </p>
        </form>
      </motion.div>
    </SectionWrapper>
  );
};

export default BookingSection;
