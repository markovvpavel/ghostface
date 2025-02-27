import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import { UserBase } from "@/entities/user/user-base";

@Entity("orders")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class OrderBase {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column({ type: "varchar" })
  status!: string;

  @Column({ type: "timestamp", nullable: true })
  expiresAt!: Date | null;

  @ManyToOne(() => UserBase, (user) => user.orders, { nullable: false })
  user!: UserBase;
}
