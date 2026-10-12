export type Dish = {
  id: string;
  name: string;
  category: string;
  price: number;
};

export const dishes: Dish[] = [
  { id: "kitfo", name: "Kitfo", category: "Meat", price: 350 },
  { id: "shiro", name: "Shiro", category: "Vegetarian", price: 180 },
  { id: "doro-wat", name: "Doro Wat", category: "Meat", price: 320 },
  { id: "firfir", name: "Firfir", category: "Vegetarian", price: 160 },
];

// Simulate async data fetch (in a real app, this would query a database)
export async function getDishes(): Promise<Dish[]> {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return dishes;
}

export async function getDish(id: string): Promise<Dish | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return dishes.find((dish) => dish.id === id);
}
