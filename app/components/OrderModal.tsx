"use client";

import { useState } from "react";
import { X, MapPin, User } from "lucide-react";

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; address: string; reference: string }) => void;
};

export default function OrderModal({ isOpen, onClose, onSubmit }: OrderModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    reference: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      alert("Por favor completa nombre y dirección");
      return;
    }
    onSubmit(formData);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
        <div className="bg-card rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:max-w-md max-h-[90vh] overflow-y-auto animate-slideInBottom md:animate-scaleIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-secondary to-secondary/90 text-white p-5 md:p-6 rounded-t-3xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold">Datos de entrega</h2>
                <p className="text-xs md:text-sm text-white/80">Completa tu información</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-all active:scale-[0.95]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-text mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-secondary" />
                Nombre *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-4 md:py-4 rounded-2xl border-2 border-border focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all text-base"
                placeholder="Tu nombre completo"
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                Dirección *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-4 md:py-4 rounded-2xl border-2 border-border focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all text-base"
                placeholder="Calle y número"
                required
                autoComplete="street-address"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-text/60" />
                Referencia
              </label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                className="w-full px-4 py-4 md:py-4 rounded-2xl border-2 border-border focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all text-base"
                placeholder="Punto de referencia (opcional)"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 md:py-5 bg-gradient-to-r from-accent to-accent/90 text-white rounded-2xl font-bold text-base md:text-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-4"
            >
              Enviar pedido por WhatsApp
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
