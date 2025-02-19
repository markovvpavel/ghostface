// import { DataTypes, Model } from "sequelize";
// import sequelize from "@/core/db";
// import User from "@/models/User";

// class Order extends Model {
//   public id!: number;
//   public userId!: number;
//   public status!: string;
//   public expiresAt!: Date;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// Order.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "users",
//         key: "id",
//       },
//       onDelete: "CASCADE",
//     },
//     status: { type: DataTypes.STRING, defaultValue: "active" },
//     expiresAt: { type: DataTypes.DATE, allowNull: false },
//   },
//   { sequelize, tableName: "orders", timestamps: true }
// );

// Order.belongsTo(User, { foreignKey: "userId", as: "user" });

// export default Order;

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import User from "@/models/User";

@Entity("orders")
class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column({ default: "active" })
  status!: string;

  @Column()
  expiresAt!: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;
}

export default Order;
