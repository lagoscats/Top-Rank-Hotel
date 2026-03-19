import { ReactNode, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { LayoutDashboard, BedDouble, CalendarCheck, LogOut, ArrowLeft, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { HOTEL_CONFIG } from "@/data/hotel.config";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Rooms", path: "/admin/rooms", icon: BedDouble },
  { label: "Bookings", path: "/admin/bookings", icon: CalendarCheck },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold mb-2 text-foreground">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You need admin privileges to access this area.</p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-border">
        <h2 className="font-display text-lg font-semibold text-card-foreground">{HOTEL_CONFIG.brand.name}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Admin Dashboard</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.path}
            onClick={() => { navigate(item.path); setSidebarOpen(false); }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <item.icon size={18} strokeWidth={1.5} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-border space-y-1">
        <div className="px-3 py-2 mb-2">
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <button
          onClick={() => { navigate("/"); setSidebarOpen(false); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={1.5} /> Back to Site
        </button>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <LogOut size={18} strokeWidth={1.5} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-card border-r border-border flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col z-50 shadow-elevated">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-muted-foreground hover:text-foreground">
            <Menu size={20} />
          </button>
          <h2 className="font-display text-sm font-semibold text-card-foreground">{HOTEL_CONFIG.brand.name}</h2>
          <div className="w-9" />
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
