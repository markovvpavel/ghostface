import { UserAdmin } from "@/entities/user/user-admin";

export type CreateAdminDTO = Pick<UserAdmin, "email" | "password">;
