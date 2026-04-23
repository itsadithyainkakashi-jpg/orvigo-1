import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Moon, Sun, Globe, Bell, Shield, Info, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState<"en" | "ta">("en");

  const labels = {
    en: { title: "Settings", darkMode: "Dark Mode", darkDesc: "Switch to dark theme", notif: "Notifications", notifDesc: "Push notifications", lang: "Language", langDesc: "App language", privacy: "Privacy & Security", about: "About Orvigo" },
    ta: { title: "அமைப்புகள்", darkMode: "இருண்ட பயன்முறை", darkDesc: "இருண்ட தீம் மாற்று", notif: "அறிவிப்புகள்", notifDesc: "புஷ் அறிவிப்புகள்", lang: "மொழி", langDesc: "பயன்பாட்டு மொழி", privacy: "தனியுரிமை & பாதுகாப்பு", about: "Orvigo பற்றி" },
  };
  const t = labels[language];

  const handleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    toast.success(next ? "Dark mode enabled" : "Light mode enabled");
  };

  const handleLang = () => {
    const next = language === "en" ? "ta" : "en";
    setLanguage(next as "en" | "ta");
    toast.success(next === "en" ? "Language: English" : "மொழி: தமிழ்");
  };

  return (
    <div className="min-h-screen pb-24 bg-background transition-colors duration-300">
      {/* Header */}
      <div className="relative px-4 pt-12 pb-5 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(210,80%,42%), hsl(200,75%,55%))" }}>
        <div className="absolute inset-0" style={{ background: "hsla(210,60%,50%,0.25)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }} />
        <div className="relative z-10 flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/profile")} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsla(0,0%,100%,0.2)" }}>
            <ArrowLeft size={18} color="white" />
          </motion.button>
          <h1 className="text-lg font-bold text-white">{t.title}</h1>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {/* Dark Mode */}
        <motion.div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3" whileTap={{ scale: 0.98 }} onClick={handleDarkMode}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: darkMode ? "hsl(250,60%,92%)" : "hsl(40,90%,92%)" }}>
            {darkMode ? <Moon size={18} style={{ color: "hsl(250,60%,50%)" }} /> : <Sun size={18} style={{ color: "hsl(40,90%,50%)" }} />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-card-foreground">{t.darkMode}</p>
            <p className="text-[11px] text-muted-foreground">{t.darkDesc}</p>
          </div>
          <div className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors duration-300 ${darkMode ? "bg-primary" : "bg-muted"}`}>
            <motion.div className="w-5 h-5 rounded-full bg-white shadow-sm" animate={{ x: darkMode ? 20 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
          </div>
        </motion.div>

        {/* Language */}
        <motion.div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3" whileTap={{ scale: 0.98 }} onClick={handleLang}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(210,80%,92%)" }}>
            <Globe size={18} style={{ color: "hsl(210,80%,45%)" }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-card-foreground">{t.lang}</p>
            <p className="text-[11px] text-muted-foreground">{t.langDesc}</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
            {language === "en" ? "EN" : "தமிழ்"}
          </span>
        </motion.div>

        {/* Notifications */}
        <motion.div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3" whileTap={{ scale: 0.98 }} onClick={() => { setNotifications(!notifications); toast.success(notifications ? "Notifications off" : "Notifications on"); }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(25,90%,92%)" }}>
            <Bell size={18} style={{ color: "hsl(25,90%,50%)" }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-card-foreground">{t.notif}</p>
            <p className="text-[11px] text-muted-foreground">{t.notifDesc}</p>
          </div>
          <div className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors duration-300 ${notifications ? "bg-primary" : "bg-muted"}`}>
            <motion.div className="w-5 h-5 rounded-full bg-white shadow-sm" animate={{ x: notifications ? 20 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.button className="w-full bg-card rounded-2xl border border-border p-4 flex items-center gap-3" whileTap={{ scale: 0.98 }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(145,60%,92%)" }}>
            <Shield size={18} style={{ color: "hsl(145,55%,38%)" }} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-card-foreground">{t.privacy}</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </motion.button>

        {/* About */}
        <motion.button className="w-full bg-card rounded-2xl border border-border p-4 flex items-center gap-3" whileTap={{ scale: 0.98 }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(210,30%,92%)" }}>
            <Info size={18} style={{ color: "hsl(210,30%,45%)" }} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-card-foreground">{t.about}</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
};

export default SettingsPage;
