import { UserController } from "@/controllers/user";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { Router } from "express";

class UserRouter {
  public router: Router;
  private usersController: UserController;

  constructor() {
    this.router = Router();
    this.usersController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      authMiddleware(["admin"]),
      this.usersController.getAllUsers
    );
    this.router.put("/:id", this.usersController.updateUser);
    this.router.delete("/:id", this.usersController.deleteUser);
  }
}

export default new UserRouter().router;
