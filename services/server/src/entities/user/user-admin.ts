import { UserRole } from "@/types";
import { UserBase } from "./user-base";
import { ChildEntity, Column } from "typeorm";

@ChildEntity(UserRole.ADMIN)
export class UserAdmin extends UserBase {
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
