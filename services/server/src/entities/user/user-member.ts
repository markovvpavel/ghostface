import { UserBase } from "./user-base";
import { ChildEntity, Column, OneToMany } from "typeorm";
import { OrderEscrow } from "@/entities/order/order-escrow";
import { OrderProduct } from "@/entities/order/order-product";
import { UserRole } from "@/types";

@ChildEntity(UserRole.MEMBER)
export class UserMember extends UserBase {
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => OrderEscrow, (order) => order.user)
  escrowOrders!: OrderEscrow[];

  @OneToMany(() => OrderProduct, (order) => order.user)
  productOrders!: OrderProduct[];
}
