import { scheduleOrderExpiration } from "@/queues/orderQueue";
import { OrderService } from "@/services/order";
import { BaseController } from "./base";
import { Request } from "express";

export class OrderController extends BaseController {
  private orderService: OrderService;

  constructor() {
    super();
    this.orderService = new OrderService();
  }

  public getAllOrders = this.handleRequest(async (req, res) => {
    const orders = await this.orderService.getAllOrders();
    res.status(200).json({ orders });
  });

  public createOrder = this.handleRequest(
    async (req: Request<{}, {}, { status: string }>, res) => {
      // const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
      const expiresAt = new Date(Date.now() + 5 * 1000);
      const order = await this.orderService.createOrder({ expiresAt });
      await scheduleOrderExpiration(order.id, expiresAt);
      res.status(201).json(order);
    }
  );

  public deleteOrder = this.handleRequest(async (req, res) => {
    const { id } = req.params;
    const result = await this.orderService.deleteOrder(id);

    if (!result) {
      res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  });
}
