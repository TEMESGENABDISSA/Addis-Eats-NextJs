export const ROLES = ["customer", "courier", "restaurant", "staff"] as const;
export type UserRole = (typeof ROLES)[number];

export interface User {
  readonly id: number;
  email: string;
  passwordHash: string;
  roles: UserRole[];
  restaurantId?: number; // for restaurant role
  refreshHash?: string;
}
