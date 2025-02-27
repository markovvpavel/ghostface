import { DataSource } from "typeorm";
import { dbConfig } from "@/config/db";

class Database {
  private static instance: DataSource;

  private constructor() {}

  static getInstance(): DataSource {
    if (!Database.instance) {
      Database.instance = new DataSource(dbConfig);
      console.log("Database connected");
    }
    return Database.instance;
  }
}

export default Database.getInstance();
