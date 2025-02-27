import { Router } from "express";
import { UserController } from "@/modules/user/controller/user";
import { roleMiddleware } from "@/middlewares/roleMiddleware";
import { UserRole } from "@/types";

export class UserRouter {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.userController.getAllUsers);
    this.router.get("/:id", this.userController.getUserById);
    this.router.delete("/:id", this.userController.deleteUser);
    this.router.post("/guest", this.userController.authenticateGuest);
    this.router.post(
      "/guest/convert-guest-to-member",
      roleMiddleware([UserRole.GUEST]),
      this.userController.registerMember
    );
    this.router.post("/member/login", this.userController.loginMember);
    this.router.post("/member/register", this.userController.registerMember);
  }
}
