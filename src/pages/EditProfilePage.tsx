import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, User, Save, Check } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUser();
  const fileRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(profile.photo);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [saving, setSaving] = useState(false);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) { toast.error("Name cannot be empty"); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    updateProfile({ name: name.trim(), email: email.trim(), photo });
    setSaving(false);
    toast.success("Profile updated successfully!");
    navigate("/profile");
  };

  const hasChanges = name !== profile.name || email !== profile.email || photo !== profile.photo;

  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="relative px-4 pt-12 pb-6 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(210, 80%, 42%) 0%, hsl(200, 75%, 55%) 100%)" }}>
        <div className="absolute inset-0" style={{ background: "hsla(210,60%,50%,0.25)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }} />
        <div className="relative z-10 flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/profile")} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsla(0,0%,100%,0.2)" }}>
            <ArrowLeft size={18} color="white" />
          </motion.button>
          <h1 className="text-lg font-bold text-white">Edit Profile</h1>
        </div>
      </div>

      <motion.div className="flex flex-col items-center -mt-8 relative z-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="relative">
          <motion.div className="w-24 h-24 rounded-full overflow-hidden border-4 border-background bg-muted" whileHover={{ scale: 1.05 }}>
            {photo ? (
              <img src={photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><User size={40} className="text-muted-foreground" /></div>
            )}
          </motion.div>
          <motion.button whileTap={{ scale: 0.8 }} onClick={() => fileRef.current?.click()} className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center shadow-lg bg-primary">
            <Camera size={16} className="text-primary-foreground" />
          </motion.button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        <button onClick={() => fileRef.current?.click()} className="text-xs font-medium mt-2 text-primary">Change Photo</button>
      </motion.div>

      <motion.div className="px-5 mt-6 space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm font-medium bg-card text-card-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" placeholder="Enter your name" />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Mobile Number</label>
          <input value={profile.mobile} readOnly className="w-full px-4 py-3 rounded-xl text-sm font-medium bg-muted text-muted-foreground border border-border cursor-not-allowed" />
          <p className="text-[10px] text-muted-foreground mt-1">Contact support to change number</p>
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-4 py-3 rounded-xl text-sm font-medium bg-card text-card-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow" placeholder="Enter email address" />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Member Since</label>
          <input value={profile.memberSince} readOnly className="w-full px-4 py-3 rounded-xl text-sm font-medium bg-muted text-muted-foreground border border-border cursor-not-allowed" />
        </div>
      </motion.div>

      <motion.div className="px-5 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className="w-full py-3.5 rounded-xl text-sm font-bold text-primary-foreground flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-opacity"
          style={{ background: "linear-gradient(135deg, hsl(210, 80%, 42%), hsl(200, 75%, 55%))" }}
        >
          {saving ? (
            <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
          ) : (
            <>{hasChanges ? <Save size={18} /> : <Check size={18} />} {hasChanges ? "Save Changes" : "No Changes"}</>
          )}
        </motion.button>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default EditProfilePage;
