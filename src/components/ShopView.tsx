"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  edition: string;
  image: string;
  description: string;
}

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: "tee-worldwide",
    name: "MONSTERVILLE WORLDWIDE TEE",
    price: 65,
    edition: "01 // WASHED HEAVYWEIGHT",
    image: "/assets/shop/worldwide_tee.jpg",
    description: "480GSM custom organic combed cotton with raw drop-shoulder silhouette.",
  },
  {
    id: "hoodie-sanctuary",
    name: "SANCTUARY CINEMATIC HOODIE",
    price: 120,
    edition: "02 // RAW FRENCH TERRY",
    image: "/assets/shop/hoodie_merch.jpg",
    description: "Double-layered hood with internal audio channel. Tonal embroidered branding.",
  },
  {
    id: "vinyl-boxset",
    name: "NEW RELEASE 12\" BOXSET",
    price: 85,
    edition: "03 // LIMITED 500 COPIES",
    image: "/assets/music/destiny_artwork.jpg",
    description: "Triple gatefold 180g virgin marble vinyl. Includes 35mm photo zine.",
  },
];

interface ShopViewProps {
  onBack: () => void;
}

export default function ShopView({ onBack }: ShopViewProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("L");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const product = PRODUCTS[activeIdx];

  const addToBag = () => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size: selectedSize, quantity: 1 }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === id && item.size === size))
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[100svh] bg-[#050505] flex flex-col select-none overflow-hidden"
    >
      {/* Top Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pt-safe shrink-0 py-3 sm:py-4 flex justify-between items-center font-mono-micro text-white/50 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
          <span className="tracking-[0.3em]">CHAPTER 07 // STORE</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="font-mono-micro text-white/80 hover:text-white py-1.5 px-3 border border-white/20 hover:border-white tracking-[0.2em] text-[9px] transition-colors flex items-center gap-1.5 rounded-full bg-black/40 cursor-pointer"
          >
            <span>BAG</span>
            <span className="text-white font-bold">[{totalItems}]</span>
          </button>
          <button
            onClick={onBack}
            className="text-white hover:text-white/70 px-3 py-1.5 border border-white/20 hover:border-white rounded-full transition-colors cursor-pointer tracking-[0.2em]"
          >
            [ HUB ✕ ]
          </button>
        </div>
      </div>

      {/* Center Product Showcase */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-10 gap-2 sm:gap-3 min-h-0">
        {/* Product Image */}
        <div
          className="relative bg-[#090909] border border-white/10 rounded-[4px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          style={{ width: "min(60vw, 34dvh, 260px)", aspectRatio: "1/1" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${product.image}')` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-2 left-2 font-mono-micro text-[7px] text-white/70 px-1.5 py-0.5 bg-black/80 border border-white/10">
            {product.edition}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col items-center gap-0.5 text-center">
          <h3
            className="font-display text-white tracking-tight"
            style={{ fontSize: "clamp(14px, 4vw, 22px)" }}
          >
            {product.name}
          </h3>
          <span className="font-mono-micro text-white/90" style={{ fontSize: "clamp(10px, 3vw, 15px)" }}>
            ${product.price} USD
          </span>
        </div>

        {/* Size Selector */}
        <div className="flex items-center gap-1.5 font-mono-micro">
          {["S", "M", "L", "XL"].map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className={`w-9 h-9 flex items-center justify-center border text-[9px] tracking-wider transition-all duration-200 cursor-pointer ${
                selectedSize === sz
                  ? "bg-white text-black border-white font-bold"
                  : "bg-transparent text-white/60 border-white/20 hover:border-white hover:text-white"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* Add to Bag */}
        <button
          onClick={addToBag}
          className="w-full max-w-[260px] py-3 bg-white text-black hover:bg-white/80 font-mono-micro tracking-[0.25em] transition-all duration-300 font-bold select-none cursor-pointer"
          style={{ fontSize: "clamp(8px, 2.5vw, 10px)" }}
        >
          ADD TO BAG — ${product.price} USD
        </button>

        {/* Product Switcher Dots */}
        <div className="flex items-center gap-2">
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeIdx === i ? "w-5 bg-white" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
              aria-label={`Select product ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 w-full px-5 sm:px-10 pb-safe shrink-0 py-3 flex justify-between items-center font-mono-micro text-[9px] sm:text-[10px] text-white/40 border-t border-white/10">
        <span>WORLDWIDE DISPATCH</span>
        <span className="text-white/60">LIMITED ARCHIVAL RUN</span>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99998]"
            />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-0 left-0 right-0 sm:left-auto sm:right-0 sm:top-0 h-[75svh] sm:h-[100svh] w-full sm:w-[400px] bg-[#0A0A0A] border-t sm:border-t-0 sm:border-l border-white/15 z-[99999] p-5 flex flex-col gap-4 rounded-t-2xl sm:rounded-none"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="font-mono-micro text-[10px] sm:text-xs tracking-[0.25em] text-white">
                  BAG ({totalItems})
                </span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="font-mono-micro text-white/50 hover:text-white text-[9px] cursor-pointer"
                >
                  [ CLOSE ✕ ]
                </button>
              </div>

              <div className="flex-1 overflow-y-auto flex flex-col gap-3">
                {cart.length === 0 ? (
                  <div className="h-full flex items-center justify-center font-mono-micro text-[10px] text-white/30 tracking-[0.3em]">
                    BAG EMPTY
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.size}-${idx}`}
                      className="flex gap-3 items-center border-b border-white/5 pb-3"
                    >
                      <div className="w-12 h-12 bg-black border border-white/10 overflow-hidden flex-none">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left flex flex-col">
                        <span className="font-display text-[10px] text-white truncate">
                          {item.product.name}
                        </span>
                        <span className="font-mono-micro text-[8px] text-white/50">
                          {item.size} • QTY: {item.quantity}
                        </span>
                        <span className="font-mono-micro text-[9px] text-white mt-0.5">
                          ${item.product.price}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="text-white/40 hover:text-white font-mono-micro text-[9px] cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-white/10 pt-3 flex flex-col gap-2 pb-safe">
                  <div className="flex justify-between font-mono-micro text-[10px] sm:text-xs text-white">
                    <span>SUBTOTAL</span>
                    <span>${subtotal} USD</span>
                  </div>
                  <button
                    onClick={() => alert("Monsterville Checkout: Transmitting order.")}
                    className="w-full py-3 bg-white text-black hover:bg-white/80 font-mono-micro text-[10px] tracking-[0.3em] font-bold cursor-pointer"
                  >
                    CHECKOUT →
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
