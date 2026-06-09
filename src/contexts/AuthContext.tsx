import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { onAuthStateChanged, signOut as fbSignOut, type User as FbUser } from "firebase/auth";
import { supabase } from "@/integrations/supabase/client";
import { firebaseAuth } from "@/lib/firebase";

export interface DemoUser {
  id: string;
  kind: "phone" | "email" | "google" | "guest";
  identifier: string; // phone, email, or "guest"
  name: string;
}

const DEMO_KEY = "orvigo_demo_user";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  firebaseUser: FbUser | null;
  demoUser: DemoUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signInDemo: (profile: Omit<DemoUser, "id">) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const readDemo = (): DemoUser | null => {
  try {
    const raw = localStorage.getItem(DEMO_KEY);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FbUser | null>(null);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(() => readDemo());
  const [sbReady, setSbReady] = useState(false);
  const [fbReady, setFbReady] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session: existing } }) => {
      setSession(existing);
      setUser(existing?.user ?? null);
      setSbReady(true);
    }).catch(() => setSbReady(true));

    const unsub = onAuthStateChanged(firebaseAuth, (fbUser) => {
      setFirebaseUser(fbUser);
      setFbReady(true);
    });

    // Sync demo session across tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === DEMO_KEY) setDemoUser(readDemo());
    };
    window.addEventListener("storage", onStorage);

    return () => {
      subscription.unsubscribe();
      unsub();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const loading = !sbReady || !fbReady;

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/home`,
        data: { name },
      },
    });
    return { error };
  };

  const signInDemo = (profile: Omit<DemoUser, "id">) => {
    const u: DemoUser = { id: `demo_${Date.now()}`, ...profile };
    localStorage.setItem(DEMO_KEY, JSON.stringify(u));
    setDemoUser(u);
  };

  const signOut = async () => {
    localStorage.removeItem(DEMO_KEY);
    setDemoUser(null);
    await Promise.allSettled([supabase.auth.signOut(), fbSignOut(firebaseAuth)]);
  };

  return (
    <AuthContext.Provider value={{ user, session, firebaseUser, demoUser, loading, signIn, signUp, signInDemo, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
