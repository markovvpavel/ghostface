import { ChildEntity } from "typeorm";
import { UserBase } from "@/entities/user/user-base";
import { UserRole } from "@/types";

@ChildEntity(UserRole.GUEST)
export class UserGuest extends UserBase {}
