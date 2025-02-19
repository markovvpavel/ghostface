import app from "./app";
import dotenv from "dotenv";
import "reflect-metadata";
import { initDatabase } from "./core/init";

dotenv.config();

const PORT = process.env.SERVER_PORT;

if (!process.env.SERVER_PORT) {
  throw new Error("Missing required SERVER_PORT environment variable");
}

const main = async () => {
  try {
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

main();
