import { ChildEntity, ManyToOne } from "typeorm";
import { OrderBase } from "@/entities/order/order-base";
import { UserMember } from "../user/user-member";

@ChildEntity()
export class OrderEscrow extends OrderBase {
  @ManyToOne(() => UserMember, (user) => user.escrowOrders)
  user!: UserMember;
}
