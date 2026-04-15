"use client";

import { Plus } from "lucide-react";

type Product = {
  nombre: string;
  precio: number;
};

type Category = {
  id: string;
  nombre: string;
  icono: string;
  productos: Product[];
};

type MenuSectionProps = {
  category: Category;
  onAddToCart: (id: string, name: string, price: number) => void;
};

export default function MenuSection({ category, onAddToCart }: MenuSectionProps) {
  return (
    <section id={category.id} className="mb-10 md:mb-12 scroll-mt-40 md:scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <span className="text-xl">🍽️</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary">{category.nombre}</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {category.productos.map((product, index) => (
          <div
            key={`${category.id}-${index}`}
            className="bg-card border-sketch rounded-xl p-3 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fadeIn overflow-hidden"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Placeholder Image - Smaller on mobile */}
            <div className="aspect-square bg-gradient-to-br from-bg to-bg/80 rounded-xl mb-3 flex items-center justify-center overflow-hidden border border-border">
              <div className="text-center p-2">
                <span className="text-3xl md:text-5xl mb-2 block">🍽️</span>
                <p className="text-[10px] md:text-sm font-medium text-primary/60">Bartolomeo</p>
              </div>
            </div>

            <h3 className="font-semibold text-text mb-2 md:mb-3 text-xs md:text-lg leading-tight line-clamp-2">{product.nombre}</h3>

            <div className="flex items-center justify-between gap-2">
              <p className="text-sm md:text-2xl font-bold text-primary">
                ${product.precio.toLocaleString()}
              </p>
              <button
                onClick={() => onAddToCart(`${category.id}-${index}`, product.nombre, product.precio)}
                className="px-3 py-2 md:px-5 md:py-3 bg-primary text-white rounded-lg md:rounded-xl text-xs md:text-base font-semibold hover:bg-primary/90 transition-all duration-200 active:scale-[0.95] flex items-center gap-1 md:gap-2 shadow-md hover:shadow-lg flex-shrink-0"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden md:inline">Agregar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
