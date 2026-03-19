import { useEffect, useState } from "react";
import { BedDouble, CalendarCheck, Clock, CheckCircle, DollarSign, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Booking = Tables<"bookings"> & { rooms: { name: string } | null };

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
};

const Dashboard = () => {
  const [stats, setStats] = useState({ rooms: 0, bookings: 0, pending: 0, confirmed: 0, revenue: 0, guests: 0 });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [roomsRes, bookingsRes, pendingRes, confirmedRes, revenueRes, recentRes] = await Promise.all([
        supabase.from("rooms").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "confirmed"),
        supabase.from("bookings").select("total_price, num_guests").in("status", ["confirmed", "completed"]),
        supabase.from("bookings").select("*, rooms(name)").order("created_at", { ascending: false }).limit(5),
      ]);

      const totalRevenue = (revenueRes.data ?? []).reduce((sum, b) => sum + (b.total_price ?? 0), 0);
      const totalGuests = (revenueRes.data ?? []).reduce((sum, b) => sum + (b.num_guests ?? 0), 0);

      setStats({
        rooms: roomsRes.count ?? 0,
        bookings: bookingsRes.count ?? 0,
        pending: pendingRes.count ?? 0,
        confirmed: confirmedRes.count ?? 0,
        revenue: totalRevenue,
        guests: totalGuests,
      });
      setRecentBookings((recentRes.data as Booking[]) ?? []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const cards = [
    { label: "Total Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Bookings", value: stats.bookings, icon: CalendarCheck, color: "text-primary", bg: "bg-primary/5" },
    { label: "Pending", value: stats.pending, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Confirmed", value: stats.confirmed, icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Rooms", value: stats.rooms, icon: BedDouble, color: "text-primary", bg: "bg-primary/5" },
    { label: "Total Guests", value: stats.guests, icon: Users, color: "text-accent-foreground", bg: "bg-accent/30" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Overview of your hotel operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Card key={card.label} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{card.label}</p>
                    <p className="text-2xl font-semibold text-card-foreground">
                      {loading ? "—" : card.value}
                    </p>
                  </div>
                  <div className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center`}>
                    <card.icon size={20} className={card.color} strokeWidth={1.5} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-display">Recent Bookings</CardTitle>
              <a href="/admin/bookings" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                View all <ArrowUpRight size={14} />
              </a>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground text-sm py-6 text-center">Loading...</p>
            ) : recentBookings.length === 0 ? (
              <p className="text-muted-foreground text-sm py-6 text-center">No bookings yet.</p>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((b) => (
                  <div key={b.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-medium text-primary">
                          {b.guest_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-card-foreground truncate">{b.guest_name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {b.rooms?.name ?? "No room"} · {b.check_in} → {b.check_out}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      {b.total_price && (
                        <span className="text-sm font-medium text-card-foreground">${b.total_price}</span>
                      )}
                      <Badge variant="outline" className={`text-xs ${statusColors[b.status] ?? ""}`}>
                        {b.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
