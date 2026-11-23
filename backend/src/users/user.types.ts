export type UserRole = "customer" | "staff";

export interface User {
  readonly id: number;
  email: string;
  passwordHash: string;
  roles: UserRole[];
  refreshHash?: string;
}
