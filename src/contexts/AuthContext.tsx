import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { onAuthStateChanged, signOut as fbSignOut, type User as FbUser } from "firebase/auth";
import { supabase } from "@/integrations/supabase/client";
import { firebaseAuth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  firebaseUser: FbUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FbUser | null>(null);
  const [sbReady, setSbReady] = useState(false);
  const [fbReady, setFbReady] = useState(false);

  useEffect(() => {
    // Supabase: listener BEFORE getSession
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session: existing } }) => {
      setSession(existing);
      setUser(existing?.user ?? null);
      setSbReady(true);
    });

    // Firebase: keeps phone-auth session for auto-login
    const unsub = onAuthStateChanged(firebaseAuth, (fbUser) => {
      setFirebaseUser(fbUser);
      setFbReady(true);
    });

    return () => {
      subscription.unsubscribe();
      unsub();
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

  const signOut = async () => {
    await Promise.allSettled([supabase.auth.signOut(), fbSignOut(firebaseAuth)]);
  };

  return (
    <AuthContext.Provider value={{ user, session, firebaseUser, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
