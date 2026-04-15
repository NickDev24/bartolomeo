"use client";

import { getCategoryIcon } from "./CategoryIcons";

type Category = {
  id: string;
  nombre: string;
  icono: string;
};

type CategoryCarouselProps = {
  categories: Category[];
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
};

export default function CategoryCarousel({
  categories,
  activeCategory,
  onCategorySelect,
}: CategoryCarouselProps) {
  return (
    <div className="sticky top-24 md:top-28 z-30 bg-bg/95 backdrop-blur-sm border-b-2 border-border py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {categories.map((category, index) => {
            const isActive = activeCategory === category.id;
            const Icon = getCategoryIcon(category.icono);
            
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`
                  flex flex-col items-center gap-2 min-w-[80px] snap-center
                  transition-all duration-300
                  ${isActive ? 'scale-110' : 'scale-100 opacity-70 hover:opacity-100'}
                  active:scale-95
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`
                    w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isActive 
                      ? 'bg-primary text-white shadow-lg scale-110 animate-bounce-slow' 
                      : 'bg-card text-primary shadow-md hover:shadow-lg'
                    }
                  `}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10">
                    {Icon}
                  </div>
                </div>
                <span
                  className={`
                    text-xs md:text-sm font-medium whitespace-nowrap
                    transition-colors duration-300
                    ${isActive ? 'text-primary font-bold' : 'text-text/70'}
                  `}
                >
                  {category.nombre}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
