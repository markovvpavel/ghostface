import User from "@/models/User";

export type CreateUserDTO = Pick<User, "email" | "password" | "role">;
export type UpdateUserDTO = Partial<CreateUserDTO>;
