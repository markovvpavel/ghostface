import { UserBase } from "@/entities/user/user-base";

export type JwtPayload = Pick<UserBase, "id" | "role">;

export type JwtTokenPair = { accessToken: string; refreshToken: string };

export enum UserRole {
  ADMIN = "admin",
  GUEST = "guest",
  MEMBER = "member",
}
