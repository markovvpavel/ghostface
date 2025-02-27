import { OrderBase } from "@/entities/order/order-base";
import { OrderEscrow } from "@/entities/order/order-escrow";
import { OrderProduct } from "@/entities/order/order-product";
import { UserAdmin } from "@/entities/user/user-admin";
import { UserBase } from "@/entities/user/user-base";
import { UserGuest } from "@/entities/user/user-guest";
import { UserMember } from "@/entities/user/user-member";
import { DataSourceOptions } from "typeorm";

if (
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_PASSWORD ||
  !process.env.POSTGRES_DB
) {
  throw new Error("Missing required PostgreSQL environment variables");
}

export const dbConfig: DataSourceOptions = {
  type: "postgres",
  host: "database",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.NODE_ENV === "development",
  entities: [
    OrderBase,
    OrderEscrow,
    OrderProduct,
    UserAdmin,
    UserBase,
    UserGuest,
    UserMember,
  ],
};
