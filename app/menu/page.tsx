"use client";

import { useState } from "react";
import DishList from "./DishList";
import FilterShell from "./FilterShell";
import SearchBox from "./SearchBox";
import type { Dish } from "./dishes";

type PaginatedDishesResponse = {
  dishes: Dish[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export default function MenuPage() {
  const [searchResponse, setSearchResponse] = useState<PaginatedDishesResponse | null>(null);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);

  const handleFilteredDishes = (response: PaginatedDishesResponse | null) => {
    setSearchResponse(response);
  };

  const handleAllDishes = (dishes: Dish[]) => {
    setAllDishes(dishes);
  };

  const dishesToDisplay = searchResponse ? searchResponse.dishes : allDishes;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our menu</h1>
      <SearchBox onFilteredDishes={handleFilteredDishes} allDishes={allDishes} />
      <FilterShell dishes={dishesToDisplay} onAllDishes={handleAllDishes}>
        <DishList dishes={dishesToDisplay} />
      </FilterShell>
    </div>
  );
}
