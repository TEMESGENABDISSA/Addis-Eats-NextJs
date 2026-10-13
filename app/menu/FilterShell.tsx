"use client";

import { useState, useEffect } from "react";
import type { Dish } from "./dishes";

type FilterShellProps = {
  children: React.ReactNode;
  dishes: Dish[];
  onAllDishes?: (dishes: Dish[]) => void;
};

export default function FilterShell({ children, dishes, onAllDishes }: FilterShellProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = ["All", ...new Set(dishes.map((dish) => dish.category))];

  // Notify parent of all dishes when dishes prop changes
  useEffect(() => {
    if (onAllDishes) {
      onAllDishes(dishes);
    }
  }, [dishes, onAllDishes]);

  return (
    <div>
      <div className="my-4 flex gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded px-3 py-1 text-sm ${
              selectedCategory === category
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
