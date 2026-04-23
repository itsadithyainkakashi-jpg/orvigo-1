import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, ArrowRight, Sparkles, Tag, Flame } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import banner1 from "@/assets/banner-premium-1.jpg";
import banner2 from "@/assets/banner-premium-2.jpg";
import banner3 from "@/assets/banner-premium-3.jpg";

import foodBurger from "@/assets/food-burger.jpg";
import foodPizza from "@/assets/food-pizza.jpg";
import foodBiryani from "@/assets/food-biryani.jpg";
import foodSushi from "@/assets/food-sushi.jpg";

import catShirts from "@/assets/cat-shirts.jpg";
import catTshirts from "@/assets/cat-tshirts.jpg";
import catDresses from "@/assets/cat-dresses.jpg";
import catJeans from "@/assets/cat-jeans.jpg";

import groceryFruits from "@/assets/grocery-fruits.jpg";
import groceryVegetables from "@/assets/grocery-vegetables.jpg";
import groceryEssentials from "@/assets/grocery-essentials.jpg";
import groceryDairy from "@/assets/grocery-dairy.jpg";

import featuredSneaker from "@/assets/featured-sneaker.jpg";
import featuredWatch from "@/assets/featured-watch.jpg";
import featuredBag from "@/assets/featured-bag.jpg";
import featuredSunglasses from "@/assets/featured-sunglasses.jpg";

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="px-4 mb-3 flex items-end justify-between">
    <div>
      <h2 className="text-lg font-extrabold text-foreground tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>
      )}
    </div>
  </div>
);

/* ---------------- 1. Premium Banner Carousel ---------------- */
const banners = [
  { image: banner1, title: "Premium Collection", subtitle: "Flat 50% Offer", cta: "/men" },
  { image: banner2, title: "Sneaker Drop", subtitle: "Up to 40% Off", cta: "/store/mens/new_arrivals" },
  { image: banner3, title: "Luxury Accessories", subtitle: "New Season", cta: "/women" },
];

const PremiumBanners = () => {
  const navigate = useNavigate();
  const plugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));

  return (
    <section className="mt-8">
      <div className="px-4">
        <Carousel opts={{ loop: true }} plugins={[plugin.current]}>
          <CarouselContent>
            {banners.map((b, i) => (
              <CarouselItem key={i}>
                <motion.button
                  onClick={() => navigate(b.cta)}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full h-44 rounded-3xl overflow-hidden glass-card-strong text-left"
                  style={{ boxShadow: "0 20px 40px hsla(220, 50%, 4%, 0.5)" }}
                >
                  <img
                    src={b.image}
                    alt={b.title}
                    loading="lazy"
                    width={1280}
                    height={640}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, hsla(220, 50%, 4%, 0.85) 0%, hsla(220, 50%, 4%, 0.4) 60%, hsla(220, 50%, 4%, 0.1) 100%)",
                    }}
                  />
                  <div className="absolute inset-0 p-5 flex flex-col justify-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-semibold">
                      {b.subtitle}
                    </p>
                    <h3
                      className="text-2xl font-extrabold text-white mt-1 uppercase"
                      style={{ textShadow: "0 4px 16px hsla(0,0%,0%,0.6)" }}
                    >
                      {b.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 self-start px-3.5 py-1.5 rounded-full text-[11px] font-bold text-foreground bg-white">
                      Shop Now <ArrowRight size={12} />
                    </span>
                  </div>
                </motion.button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

/* ---------------- 2. Food Delivery ---------------- */
const restaurants = [
  { image: foodBurger, name: "Burger Factory", rating: 4.5, time: "20 min" },
  { image: foodPizza, name: "Napoli Pizza", rating: 4.7, time: "25 min" },
  { image: foodBiryani, name: "Biryani House", rating: 4.6, time: "30 min" },
  { image: foodSushi, name: "Tokyo Sushi", rating: 4.8, time: "35 min" },
];

const FoodSection = () => {
  const navigate = useNavigate();
  return (
    <section className="mt-8">
      <SectionTitle title="Food Delivery" subtitle="Hot meals at your door" />
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
        {restaurants.map((r, i) => (
          <motion.button
            key={i}
            onClick={() => navigate("/food")}
            whileTap={{ scale: 0.97 }}
            className="shrink-0 w-44 rounded-2xl overflow-hidden glass-card text-left"
          >
            <img
              src={r.image}
              alt={r.name}
              loading="lazy"
              width={800}
              height={800}
              className="w-full h-28 object-cover"
            />
            <div className="p-3">
              <p className="text-sm font-bold text-foreground truncate">{r.name}</p>
              <div className="flex items-center justify-between mt-1.5 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star size={11} className="fill-yellow-400 text-yellow-400" />
                  {r.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {r.time}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

/* ---------------- 3. Fashion Collection (Men + Women mix) ---------------- */
const fashionCats = [
  { image: catShirts, title: "Shirts", to: "/store/mens/classic" },
  { image: catTshirts, title: "T-Shirts", to: "/store/mens/new_arrivals" },
  { image: catDresses, title: "Dresses", to: "/store/womens/dresses" },
  { image: catJeans, title: "Jeans", to: "/store/womens/jeans" },
];

const FashionSection = () => {
  const navigate = useNavigate();
  return (
    <section className="mt-8">
      <SectionTitle title="Fashion Collection" subtitle="Men & Women picks" />
      <div className="px-4 grid grid-cols-2 gap-3">
        {fashionCats.map((c, i) => (
          <motion.button
            key={i}
            onClick={() => navigate(c.to)}
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -2 }}
            className="relative aspect-square rounded-2xl overflow-hidden glass-card text-left"
          >
            <img
              src={c.image}
              alt={c.title}
              loading="lazy"
              width={800}
              height={800}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, hsla(220, 50%, 8%, 0.05) 40%, hsla(220, 50%, 4%, 0.85) 100%)",
              }}
            />
            <div className="absolute bottom-0 inset-x-0 p-3">
              <p className="text-base font-extrabold text-white uppercase tracking-wide">
                {c.title}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

/* ---------------- 4. Daily Grocery ---------------- */
const groceryItems = [
  { image: groceryFruits, title: "Fresh Fruits" },
  { image: groceryVegetables, title: "Vegetables" },
  { image: groceryEssentials, title: "Essentials" },
  { image: groceryDairy, title: "Dairy & Eggs" },
];

const GrocerySection = () => {
  const navigate = useNavigate();
  return (
    <section className="mt-8">
      <SectionTitle title="Daily Grocery" subtitle="Fresh & delivered fast" />
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
        {groceryItems.map((g, i) => (
          <motion.button
            key={i}
            onClick={() => navigate("/grocery")}
            whileTap={{ scale: 0.97 }}
            className="shrink-0 w-36 rounded-2xl overflow-hidden glass-card text-left"
          >
            <img
              src={g.image}
              alt={g.title}
              loading="lazy"
              width={800}
              height={800}
              className="w-full h-28 object-cover"
            />
            <p className="px-3 py-2 text-xs font-bold text-foreground">{g.title}</p>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

/* ---------------- 5. Special Offers ---------------- */
const offers = [
  { icon: Tag, title: "Buy 1 Get 1", caption: "On selected fashion", hue: "25 95% 55%" },
  { icon: Flame, title: "Today's Deals", caption: "Up to 60% off", hue: "0 85% 60%" },
  { icon: Sparkles, title: "Limited Offer", caption: "Ends midnight", hue: "270 85% 65%" },
];

const OffersSection = () => (
  <section className="mt-8">
    <SectionTitle title="Special Offers" subtitle="Don't miss out" />
    <div className="px-4 flex flex-col gap-3">
      {offers.map((o, i) => {
        const Icon = o.icon;
        return (
          <motion.div
            key={i}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-2xl glass-card-strong p-4 flex items-center gap-4 cursor-pointer"
            style={{
              boxShadow: `0 10px 30px hsla(${o.hue} / 0.25)`,
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: `linear-gradient(135deg, hsl(${o.hue}), hsl(${o.hue} / 0.6))`,
                boxShadow: `0 6px 20px hsla(${o.hue} / 0.5)`,
              }}
            >
              <Icon size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-extrabold text-foreground">{o.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{o.caption}</p>
            </div>
            <ArrowRight size={16} className="text-muted-foreground" />
          </motion.div>
        );
      })}
    </div>
  </section>
);

/* ---------------- 6. Featured Products ---------------- */
const featured = [
  { image: featuredSneaker, name: "Leather Sneaker", price: "₹3,499" },
  { image: featuredWatch, name: "Classic Watch", price: "₹5,999" },
  { image: featuredBag, name: "Leather Backpack", price: "₹2,799" },
  { image: featuredSunglasses, name: "Black Shades", price: "₹1,499" },
];

const FeaturedSection = () => {
  const navigate = useNavigate();
  return (
    <section className="mt-8">
      <SectionTitle title="Featured Products" subtitle="Trending right now" />
      <div className="px-4 grid grid-cols-2 gap-3">
        {featured.map((p, i) => (
          <motion.button
            key={i}
            onClick={() => navigate("/men")}
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -2 }}
            className="rounded-2xl overflow-hidden glass-card text-left"
          >
            <div className="aspect-square bg-muted/20">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-foreground truncate">{p.name}</p>
              <p className="text-sm font-extrabold mt-1" style={{ color: "hsl(25 95% 55%)" }}>
                {p.price}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

/* ---------------- Composite ---------------- */
const HomeExtras = () => (
  <>
    <PremiumBanners />
    <FoodSection />
    <FashionSection />
    <GrocerySection />
    <OffersSection />
    <FeaturedSection />
  </>
);

export default HomeExtras;
