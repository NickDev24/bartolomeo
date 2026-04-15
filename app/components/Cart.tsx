"use client";

import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  total: number;
  onCheckout: () => void;
  orderType: "local" | "domicilio";
};

export default function Cart({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  onClear,
  total,
  onCheckout,
  orderType,
}: CartProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-card shadow-2xl z-50 flex flex-col animate-slideInRight">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-4 md:p-5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <h2 className="text-lg md:text-xl font-bold">Tu Carrito</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all active:scale-[0.95]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-text/50">
              <div className="w-20 h-20 bg-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-10 h-10 text-primary/40" />
              </div>
              <p className="text-lg font-medium text-text/60">El carrito está vacío</p>
              <p className="text-sm mt-2">Agrega productos para comenzar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 md:p-5 shadow-md hover:shadow-lg transition-all animate-scaleIn"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 pr-2">
                      <h3 className="font-semibold text-text text-base md:text-lg leading-tight">{item.name}</h3>
                      <p className="text-primary font-bold mt-2 text-lg">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all active:scale-[0.95]"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-bg hover:bg-bg/80 flex items-center justify-center transition-all active:scale-[0.95] shadow-sm"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center font-bold text-lg md:text-xl text-text">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-primary text-white hover:bg-primary/90 flex items-center justify-center transition-all active:scale-[0.95] shadow-md"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t-2 border-border p-4 md:p-5 space-y-4 bg-card">
            <div className="flex justify-between items-center">
              <button
                onClick={onClear}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-[0.95]"
              >
                Vaciar carrito
              </button>
              <div className="text-right">
                <p className="text-sm text-text/60 font-medium">Total</p>
                <p className="text-3xl font-bold text-primary">
                  ${total.toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-4 md:py-5 bg-gradient-to-r from-accent to-accent/90 text-white rounded-2xl font-bold text-base md:text-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {orderType === "domicilio" ? "Completar datos y enviar" : "Enviar pedido"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
