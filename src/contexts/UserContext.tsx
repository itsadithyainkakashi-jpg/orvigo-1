import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface UserProfile {
  name: string;
  mobile: string;
  email: string;
  photo: string | null;
  memberSince: string;
  tier: "Silver" | "Gold" | "Platinum";
}

export interface Order {
  id: string;
  product: { name: string; price: number; image: string };
  date: string;
  status: "delivered" | "shipped" | "pending" | "cancelled" | "processing";
  qty: number;
  deliveryDate?: string;
}

export interface WalletTxn {
  id: number;
  label: string;
  amount: number;
  type: "credit" | "debit";
  date: string;
  time: string;
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  orders: Order[];
  walletBalance: number;
  transactions: WalletTxn[];
  addMoney: (amount: number, method: string) => void;
  loyaltyPoints: number;
}

const generateOrders = (): Order[] => [
  { id: "ORD-8247", product: { name: "Premium Cotton Shirt", price: 1299, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300" }, date: "Apr 8, 2026", status: "processing", qty: 1, deliveryDate: "Apr 12, 2026" },
  { id: "ORD-8190", product: { name: "Running Shoes Pro", price: 3499, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300" }, date: "Apr 5, 2026", status: "shipped", qty: 1, deliveryDate: "Apr 10, 2026" },
  { id: "ORD-8134", product: { name: "Wireless Earbuds Max", price: 1999, image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=300" }, date: "Apr 2, 2026", status: "delivered", qty: 1 },
  { id: "ORD-8089", product: { name: "Organic Honey (500g)", price: 349, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300" }, date: "Mar 29, 2026", status: "delivered", qty: 2 },
  { id: "ORD-8021", product: { name: "Slim Fit Jeans", price: 1599, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300" }, date: "Mar 24, 2026", status: "delivered", qty: 1 },
  { id: "ORD-7965", product: { name: "Vitamin C Tablets", price: 299, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300" }, date: "Mar 18, 2026", status: "cancelled", qty: 1 },
  { id: "ORD-7910", product: { name: "Basmati Rice (5kg)", price: 650, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300" }, date: "Mar 12, 2026", status: "delivered", qty: 1 },
  { id: "ORD-7844", product: { name: "Smartwatch Band", price: 4999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" }, date: "Mar 5, 2026", status: "delivered", qty: 1 },
];

const generateTxns = (): WalletTxn[] => [
  { id: 1, label: "Added via Google Pay", amount: 1000, type: "credit", date: "Apr 8, 2026", time: "2:45 PM" },
  { id: 2, label: "Order #ORD-8247 Payment", amount: -1299, type: "debit", date: "Apr 8, 2026", time: "11:30 AM" },
  { id: 3, label: "Cashback — Fashion Sale", amount: 130, type: "credit", date: "Apr 5, 2026", time: "6:12 PM" },
  { id: 4, label: "Order #ORD-8190 Payment", amount: -3499, type: "debit", date: "Apr 5, 2026", time: "10:05 AM" },
  { id: 5, label: "Added via PhonePe", amount: 2000, type: "credit", date: "Apr 1, 2026", time: "9:20 AM" },
  { id: 6, label: "Referral Bonus", amount: 200, type: "credit", date: "Mar 28, 2026", time: "3:00 PM" },
  { id: 7, label: "Order #ORD-8134 Payment", amount: -1999, type: "debit", date: "Apr 2, 2026", time: "4:45 PM" },
  { id: 8, label: "Added via Debit Card", amount: 5000, type: "credit", date: "Mar 25, 2026", time: "12:15 PM" },
  { id: 9, label: "Order #ORD-8089 Payment", amount: -698, type: "debit", date: "Mar 29, 2026", time: "8:30 AM" },
  { id: 10, label: "Welcome Bonus", amount: 500, type: "credit", date: "Mar 10, 2026", time: "10:00 AM" },
];

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Aravind Kumar",
    mobile: "+91 98765 43210",
    email: "aravind.kumar@gmail.com",
    photo: null,
    memberSince: "March 2026",
    tier: "Gold",
  });

  const [orders] = useState<Order[]>(generateOrders);
  const [walletBalance, setWalletBalance] = useState(3335);
  const [transactions, setTransactions] = useState<WalletTxn[]>(generateTxns);
  const [loyaltyPoints] = useState(1240);

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setProfile((p) => ({ ...p, ...data }));
  }, []);

  const addMoney = useCallback((amount: number, method: string) => {
    setWalletBalance((b) => b + amount);
    setTransactions((prev) => [
      {
        id: Date.now(),
        label: `Added via ${method}`,
        amount,
        type: "credit",
        date: "Apr 9, 2026",
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      },
      ...prev,
    ]);
  }, []);

  return (
    <UserContext.Provider value={{ profile, updateProfile, orders, walletBalance, transactions, addMoney, loyaltyPoints }}>
      {children}
    </UserContext.Provider>
  );
};
