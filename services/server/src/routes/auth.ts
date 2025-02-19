import { AuthController } from "@/controllers/auth";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { Router } from "express";

class AuthRouter {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/login", this.authController.login);
    this.router.post("/register", this.authController.register);
    this.router.post("/refresh-token", this.authController.refreshToken);
  }
}

export default new AuthRouter().router;
