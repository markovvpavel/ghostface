import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "@/routes";
import { json } from "body-parser";
import { rateLimiting } from "@/middlewares/rateLimiting";
import { errorHandler } from "@/middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(helmet());
app.use(json());

app.use("/api", routes);
// app.use(rateLimiting);
app.use(errorHandler);

export default app;
