// import { Dialect } from "sequelize";

if (
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_PASSWORD ||
  !process.env.POSTGRES_DB
) {
  throw new Error("Missing required PostgreSQL environment variables");
}

// export const dbConfig = {
//   dialect: "postgres" as Dialect,
//   host: "database",
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DB,
//   port: 5432,
//   logging: false,
// };

import Order from "@/models/Order";
import User from "@/models/User";
import { DataSourceOptions } from "typeorm";

export const dbConfig: DataSourceOptions = {
  type: "postgres",
  host: "database",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.NODE_ENV === "development",
  entities: [User, Order],
};
