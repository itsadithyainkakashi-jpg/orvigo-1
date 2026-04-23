import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const RootRedirect = () => {
  const { user, firebaseUser, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }
  return <Navigate to={user || firebaseUser ? "/home" : "/login"} replace />;
};

export default RootRedirect;
