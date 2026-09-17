"use client";

import React from "react";

interface BlogCategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  counts?: Record<string, number>;
}

export default function BlogCategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  counts = {},
}: BlogCategoryFilterProps) {
  return (
    <div className="mobile-fade-up flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
        const count = counts[cat];

        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
              isActive
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-[1.02]"
                : "bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 border border-slate-200/60"
            }`}
          >
            <span>{cat}</span>
            {typeof count === "number" && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
