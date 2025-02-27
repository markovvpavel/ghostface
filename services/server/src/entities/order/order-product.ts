import { ChildEntity, ManyToOne } from "typeorm";
import { OrderBase } from "@/entities/order/order-base";
import { UserMember } from "../user/user-member";

@ChildEntity()
export class OrderProduct extends OrderBase {
  @ManyToOne(() => UserMember, (user) => user.orders)
  user!: UserMember;
}
