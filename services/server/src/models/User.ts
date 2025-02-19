// import { DataTypes, Model } from "sequelize";
// import sequelize from "@/core/db";
// import Order from "@/models/Order";

// class User extends Model {
//   public id!: number;
//   public email!: string;
//   public password!: string;
//   public role!: "user" | "admin";
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     role: {
//       type: DataTypes.ENUM("user", "admin"),
//       allowNull: false,
//       defaultValue: "user",
//     },
//   },
//   {
//     sequelize,
//     tableName: "users",
//     timestamps: true,
//   }
// );

// User.hasMany(Order, { foreignKey: "userId", as: "orders" });

// export default User;

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
