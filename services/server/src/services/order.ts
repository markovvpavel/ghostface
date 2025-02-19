import Order from "@/models/Order";

type OrderData = Pick<Order, "expiresAt">;

export class OrderService {
  public async getAllOrders(): Promise<Order[]> {
    // return await Order.findAll();
    return [];
  }

  public async getOrderById(id: string): Promise<Order | null> {
    // return await Order.findByPk(id);
    return null;
  }

  public async createOrder(data: OrderData): Promise<Order> {
    // return await Order.create(data);
    return new Order();
  }

  public async deleteOrder(id: string): Promise<boolean> {
    // const order = await Order.findByPk(id);
    // if (!order) return false;
    // await order.destroy();
    return true;
  }
}
