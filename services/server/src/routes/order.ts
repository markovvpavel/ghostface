import { OrderController } from "@/controllers/order";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { Router } from "express";

class OrderRouter {
  public router: Router;
  private orderController: OrderController;

  constructor() {
    this.router = Router();
    this.orderController = new OrderController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", authMiddleware(["admin"]), this.orderController.getAllOrders);
    this.router.post("/", this.orderController.createOrder);
    this.router.delete("/:id", this.orderController.deleteOrder);
  }
}

export default new OrderRouter().router;
