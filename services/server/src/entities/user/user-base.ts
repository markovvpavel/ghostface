import { OrderBase } from "@/entities/order/order-base";
import { UserRole } from "@/types";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";

@Entity("users")
@TableInheritance({ column: { type: "enum", enum: UserRole, name: "role" } })
export abstract class UserBase {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: UserRole, unique: false })
  role!: UserRole;

  @OneToMany(() => OrderBase, (order) => order.user)
  orders!: OrderBase[];
}
