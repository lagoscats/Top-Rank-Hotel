
-- The "Anyone can create bookings" INSERT policy uses WITH CHECK (true) intentionally
-- because guests submit booking requests without authentication.
-- Adding a rate-limit or captcha at the application level is recommended.
-- No schema change needed - acknowledging this is by design.

-- Add an index for booking lookups
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_check_in ON public.bookings(check_in);
CREATE INDEX idx_rooms_active ON public.rooms(active);
