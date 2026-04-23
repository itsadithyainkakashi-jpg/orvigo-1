import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ImagePlus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COLLECTIONS, type StoreCategory, type StoreCollection } from "@/lib/storeMeta";
import { toast } from "sonner";

const AdminUploadPage = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: roleLoading } = useIsAdmin();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<StoreCategory>("mens");
  const [collection, setCollection] = useState<StoreCollection>("new_arrivals");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFile = (f: File | null) => {
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name || !price) {
      toast.error("Please fill name, price, and select an image");
      return;
    }
    setSubmitting(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `products/${Date.now()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("product-images")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
      const imageUrl = pub.publicUrl;

      const { error: insErr } = await supabase.from("products").insert({
        name,
        price: Number(price),
        original_price: originalPrice ? Number(originalPrice) : null,
        description: description || null,
        category,
        collection,
        image_url: imageUrl,
        sizes: ["S", "M", "L", "XL"],
      });
      if (insErr) throw insErr;

      toast.success("Product uploaded");
      setName("");
      setPrice("");
      setOriginalPrice("");
      setDescription("");
      handleFile(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Checking access...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center gap-3">
        <p className="text-foreground font-medium">Admins only</p>
        <p className="text-sm text-muted-foreground">
          You need the admin role to upload products.
        </p>
        <Button variant="outline" onClick={() => navigate("/home")}>
          Go home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12" style={{ background: "hsl(var(--background))" }}>
      <header className="sticky top-0 z-10 flex items-center gap-2 p-4 glass-card-strong">
        <button onClick={() => navigate(-1)} aria-label="Back" className="p-2 -ml-2">
          <ChevronLeft className="text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Upload Product</h1>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
        <label
          htmlFor="prod-image"
          className="flex flex-col items-center justify-center aspect-square w-full rounded-2xl glass-card cursor-pointer overflow-hidden"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImagePlus size={32} />
              <span className="text-sm">Tap to choose image</span>
            </div>
          )}
        </label>
        <input
          id="prod-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orig">MRP (optional)</Label>
            <Input
              id="orig"
              type="number"
              inputMode="decimal"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as StoreCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mens">Mens</SelectItem>
                <SelectItem value="womens">Womens</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Collection</Label>
            <Select
              value={collection}
              onValueChange={(v) => setCollection(v as StoreCollection)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLLECTIONS.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="animate-spin mr-2" size={16} /> Uploading...
            </>
          ) : (
            "Upload Product"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AdminUploadPage;
