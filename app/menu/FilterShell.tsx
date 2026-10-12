"use client";

import { useState } from "react";
import type { Dish } from "./dishes";

type FilterShellProps = {
  children: React.ReactNode;
  dishes: Dish[];
};

export default function FilterShell({ children, dishes }: FilterShellProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = ["All", ...new Set(dishes.map((dish) => dish.category))];

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
