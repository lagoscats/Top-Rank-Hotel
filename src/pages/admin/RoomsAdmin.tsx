import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

type Room = Tables<"rooms">;

const emptyRoom: Partial<TablesInsert<"rooms">> = {
  name: "", slug: "", description: "", price_per_night: 0, capacity: 2, size: "", image_url: "", amenities: [], featured: false, active: true,
};

const RoomsAdmin = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editing, setEditing] = useState<Partial<TablesInsert<"rooms">> | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const fetchRooms = async () => {
    const { data } = await supabase.from("rooms").select("*").order("created_at", { ascending: false });
    if (data) setRooms(data);
  };

  useEffect(() => { fetchRooms(); }, []);

  const filtered = rooms.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    if (!editing?.name || !editing?.slug) {
      toast({ title: "Name and slug are required", variant: "destructive" });
      return;
    }
    if (editId) {
      const { error } = await supabase.from("rooms").update(editing).eq("id", editId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("rooms").insert(editing as TablesInsert<"rooms">);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: editId ? "Room updated" : "Room created" });
    setOpen(false); setEditing(null); setEditId(null);
    fetchRooms();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("rooms").delete().eq("id", deleteId);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Room deleted" });
    setDeleteId(null);
    fetchRooms();
  };

  const openCreate = () => { setEditing({ ...emptyRoom }); setEditId(null); setOpen(true); };
  const openEdit = (room: Room) => { setEditing({ ...room }); setEditId(room.id); setOpen(true); };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold text-foreground">Rooms</h1>
            <p className="text-muted-foreground text-sm mt-1">{rooms.length} total rooms</p>
          </div>
          <Button onClick={openCreate}><Plus size={16} /> Add Room</Button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price/Night</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{room.name}</p>
                      <p className="text-xs text-muted-foreground">{room.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${room.price_per_night}</TableCell>
                  <TableCell>{room.capacity} guests</TableCell>
                  <TableCell>
                    <div className="flex gap-1.5">
                      {room.featured && <Badge variant="secondary" className="text-xs">Featured</Badge>}
                      <Badge variant={room.active ? "default" : "outline"} className="text-xs">
                        {room.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(room)}>
                      <Pencil size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteId(room.id)} className="text-destructive hover:text-destructive">
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    {search ? "No rooms match your search." : "No rooms yet. Click \"Add Room\" to create one."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Room Form Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">{editId ? "Edit Room" : "Add Room"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label>Room Name *</Label>
                <Input placeholder="e.g. Ocean Suite" value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Slug *</Label>
                <Input placeholder="e.g. ocean-suite" value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Input placeholder="Brief room description" value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Price/Night ($)</Label>
                  <Input type="number" value={editing.price_per_night ?? 0} onChange={(e) => setEditing({ ...editing, price_per_night: Number(e.target.value) })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Capacity</Label>
                  <Input type="number" value={editing.capacity ?? 2} onChange={(e) => setEditing({ ...editing, capacity: Number(e.target.value) })} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Size</Label>
                <Input placeholder="e.g. 55 m²" value={editing.size ?? ""} onChange={(e) => setEditing({ ...editing, size: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Image URL</Label>
                <Input placeholder="https://..." value={editing.image_url ?? ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Amenities</Label>
                <Input placeholder="WiFi, Pool, Spa (comma-separated)" value={(editing.amenities ?? []).join(", ")} onChange={(e) => setEditing({ ...editing, amenities: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={!!editing.featured} onCheckedChange={(v) => setEditing({ ...editing, featured: v === true })} />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={editing.active !== false} onCheckedChange={(v) => setEditing({ ...editing, active: v === true })} />
                  Active
                </label>
              </div>
              <Button onClick={handleSave} className="w-full">{editId ? "Update Room" : "Create Room"}</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this room?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the room and remove it from any bookings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default RoomsAdmin;
