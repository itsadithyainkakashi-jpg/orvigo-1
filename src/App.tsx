import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import { UserProvider } from "@/contexts/UserContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import RootRedirect from "@/components/RootRedirect";
import OtpLoginPage from "./pages/OtpLoginPage.tsx";
import Index from "./pages/Index.tsx";
import Home from "./pages/Home.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import CategoriesPage from "./pages/CategoriesPage.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import CartPage from "./pages/CartPage.tsx";
import PaymentPage from "./pages/PaymentPage.tsx";
import OrderSuccess from "./pages/OrderSuccess.tsx";
import FashionPage from "./pages/FashionPage.tsx";
import FoodPage from "./pages/FoodPage.tsx";
import GroceryPage from "./pages/GroceryPage.tsx";
import MedicinePage from "./pages/MedicinePage.tsx";
import ShoppingPage from "./pages/ShoppingPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import EditProfilePage from "./pages/EditProfilePage.tsx";
import OrderHistoryPage from "./pages/OrderHistoryPage.tsx";
import WalletPage from "./pages/WalletPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import WishlistPage from "./pages/WishlistPage.tsx";
import OrderTrackingPage from "./pages/OrderTrackingPage.tsx";
import SearchResultsPage from "./pages/SearchResultsPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import StoreCategoriesPage from "./pages/StoreCategoriesPage.tsx";
import StoreCollectionsPage from "./pages/StoreCollectionsPage.tsx";
import StoreProductsPage from "./pages/StoreProductsPage.tsx";
import AdminUploadPage from "./pages/AdminUploadPage.tsx";

const queryClient = new QueryClient();

const Protected = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
      <AuthProvider>
      <CartProvider>
      <WishlistProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/splash" element={<Index />} />
            <Route path="/login" element={<OtpLoginPage />} />

            <Route path="/home" element={<Protected><Home /></Protected>} />
            <Route path="/categories" element={<Protected><CategoriesPage /></Protected>} />
            <Route path="/categories/filter" element={<Protected><CategoryPage /></Protected>} />
            <Route path="/fashion" element={<Protected><FashionPage /></Protected>} />
            <Route path="/food" element={<Protected><FoodPage /></Protected>} />
            <Route path="/grocery" element={<Protected><GroceryPage /></Protected>} />
            <Route path="/medicine" element={<Protected><MedicinePage /></Protected>} />
            <Route path="/shopping" element={<Protected><ShoppingPage /></Protected>} />
            <Route path="/product/:id" element={<Protected><ProductDetail /></Protected>} />
            <Route path="/cart" element={<Protected><CartPage /></Protected>} />
            <Route path="/payment" element={<Protected><PaymentPage /></Protected>} />
            <Route path="/order-success" element={<Protected><OrderSuccess /></Protected>} />
            <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
            <Route path="/profile/edit" element={<Protected><EditProfilePage /></Protected>} />
            <Route path="/profile/orders" element={<Protected><OrderHistoryPage /></Protected>} />
            <Route path="/profile/wallet" element={<Protected><WalletPage /></Protected>} />
            <Route path="/profile/settings" element={<Protected><SettingsPage /></Protected>} />
            <Route path="/wishlist" element={<Protected><WishlistPage /></Protected>} />
            <Route path="/order-tracking/:orderId" element={<Protected><OrderTrackingPage /></Protected>} />
            <Route path="/order-tracking" element={<Protected><OrderTrackingPage /></Protected>} />
            <Route path="/search" element={<Protected><SearchResultsPage /></Protected>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </UserProvider>
      </WishlistProvider>
      </CartProvider>
      </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
