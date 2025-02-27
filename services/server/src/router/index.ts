import { UserRouter } from "@/modules/user/router/user";
import { Router } from "express";

const router = Router();
const userRouter = new UserRouter();

router.get("/alive", async (req, res) => {
  res.status(200).json({ message: `Server is alive: ${new Date()}` });
});

router.use("/users", userRouter.router);

export default router;
