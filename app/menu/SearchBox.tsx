"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useDebounce } from "@/lib/useDebounce";
import type { Dish } from "./dishes";

type PaginatedDishesResponse = {
  dishes: Dish[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

type SearchBoxProps = {
  onFilteredDishes: (response: PaginatedDishesResponse | null) => void;
  allDishes: Dish[];
};

export default function SearchBox({ onFilteredDishes, allDishes }: SearchBoxProps) {
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const debounced = useDebounce(term, 300);

  const { data, isLoading } = useSWR<PaginatedDishesResponse>(
    debounced ? `/api/dishes?q=${debounced}&page=${page}` : null,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  // Reset to page 1 when search term changes
  useEffect(() => {
    setPage(1);
  }, [debounced]);

  // When search results change, notify parent
  useEffect(() => {
    if (data !== undefined) {
      onFilteredDishes(data);
    } else if (!debounced) {
      // No search term, show all dishes (unpaginated from parent)
      onFilteredDishes(null);
    }
  }, [data, debounced, onFilteredDishes]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search dishes..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isLoading && (
        <p className="text-sm text-gray-500 mt-1">Searching...</p>
      )}
      {data && data.totalPages > 1 && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {page} of {data.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
