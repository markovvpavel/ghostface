import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Order from "@/models/Order";

@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: "user" })
  role!: "user" | "admin";

  // Relationships
  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];
}

export default User;
