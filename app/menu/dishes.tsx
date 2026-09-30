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

export function getDish(id: string): Dish | undefined {
  return dishes.find((dish) => dish.id === id);
}
