"use client";

import { useState, useEffect } from "react";
import { Coffee, ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import products from "../data/products.json";
import Cart from "./components/Cart";
import MenuSection from "./components/MenuSection";
import OrderModal from "./components/OrderModal";
import CategoryCarousel from "./components/CategoryCarousel";

type OrderType = "local" | "domicilio" | null;
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function Home() {
  const [orderType, setOrderType] = useState<OrderType>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");

  const addToCart = (productId: string, productName: string, price: number) => {
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id: productId, name: productName, price, quantity: 1 }]);
    }
    // Haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(
      cart.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleOrderSubmit = async (customerData: { name: string; address: string; reference: string }) => {
    const message = `🧾 Pedido nuevo
Tipo: ${orderType === "local" ? "Local" : "Domicilio"}

Productos:
${cart.map((item) => `- ${item.quantity}x ${item.name}`).join("\n")}

Total: $${getTotal().toLocaleString()}

${orderType === "domicilio" ? `Datos:
Nombre: ${customerData.name}
Dirección: ${customerData.address}
Referencia: ${customerData.reference}` : ""}`;

    try {
      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const data = await response.json();
        // Open WhatsApp with the message
        window.open(data.whatsappUrl, "_blank");
        clearCart();
        setIsOrderModalOpen(false);
        setIsCartOpen(false);
      } else {
        alert("Error al enviar el pedido. Por favor intenta nuevamente.");
      }
    } catch (error) {
      alert("Error al enviar el pedido. Por favor intenta nuevamente.");
    }
  };

  if (!orderType) {
    return (
      <div className="min-h-screen bg-bg paper-texture flex items-center justify-center p-4">
        <div className="bg-card border-sketch rounded-3xl shadow-xl p-6 md:p-8 max-w-md w-full animate-fadeIn">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Bartolomeo</h1>
            <p className="text-text/70 text-sm md:text-base">Selecciona cómo deseas realizar tu pedido</p>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => setOrderType("local")}
              className="w-full py-5 px-6 bg-primary text-white rounded-2xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.95] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <span className="text-2xl">🟢</span>
              <span>Comer en el local</span>
            </button>
            <button
              onClick={() => setOrderType("domicilio")}
              className="w-full py-5 px-6 bg-secondary text-white rounded-2xl font-semibold hover:bg-secondary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.95] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <span className="text-2xl">🟠</span>
              <span>Pedir a domicilio</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg paper-texture pb-8">
      {/* Floating Header */}
      <header className="fixed top-4 left-4 right-4 md:left-auto md:right-auto md:w-[calc(100%-2rem)] max-w-6xl mx-auto z-50">
        <div className="bg-card border-sketch shadow-2xl rounded-2xl px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Coffee className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-primary">Bartolomeo</h1>
                <p className="text-xs md:text-sm text-text/70">
                  {orderType === "local" ? "🟢 Local" : "🟠 Domicilio"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOrderType(null)}
                className="px-3 py-2 text-text/70 hover:text-text hover:bg-bg rounded-lg transition-all text-xs md:text-sm font-medium"
              >
                Cambiar
              </button>
              {/* Desktop Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="hidden md:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-all font-medium shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Carrito</span>
                {cart.length > 0 && (
                  <span className="bg-accent px-2 py-0.5 rounded-lg text-xs font-bold">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
              {/* Mobile Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="md:hidden relative p-2 text-primary hover:bg-primary/10 rounded-xl transition-all"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full text-xs font-bold text-white flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for floating header */}
      <div className="h-24 md:h-28" />

      {/* Category Carousel */}
      <CategoryCarousel
        categories={products.categorias}
        activeCategory={activeCategory}
        onCategorySelect={(categoryId) => {
          setActiveCategory(categoryId);
          document.getElementById(categoryId)?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Menu */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {products.categorias.map((category) => (
          <MenuSection
            key={category.id}
            category={category}
            onAddToCart={addToCart}
          />
        ))}
      </main>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        total={getTotal()}
        onCheckout={() => {
          if (cart.length === 0) {
            alert("El carrito está vacío");
            return;
          }
          if (orderType === "domicilio") {
            setIsOrderModalOpen(true);
          } else {
            handleOrderSubmit({ name: "", address: "", reference: "" });
          }
        }}
        orderType={orderType}
      />

      {/* Order Modal */}
      {orderType === "domicilio" && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          onSubmit={handleOrderSubmit}
        />
      )}
    </div>
  );
}
