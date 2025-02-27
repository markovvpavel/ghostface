import { Queue, Worker } from "bullmq";
import { redisConfig } from "@/config/redis";

export const orderQueue = new Queue("order-expiration", {
  connection: redisConfig,
});

export async function scheduleOrderExpiration(
  orderId: number,
  expiresAt: Date
) {
  const delay = expiresAt.getTime() - Date.now();
  if (delay > 0) {
    const job = await orderQueue.add("expireOrder", { orderId }, { delay });
    console.log(
      `✅ Job added: ${job.id} for Order ${orderId}, expires in ${
        delay / 1000
      }s`
    );
  }
}

const worker = new Worker(
  "order-expiration",
  async (job) => {
    console.log(
      `🔔 Processing Job ID: ${job.id}, Order ID: ${job.data.orderId}`
    );

    // const order = await Order.findByPk(job.data.orderId);
    // if (order && order.status === "active") {
    //   await order.update({ status: "expired" });
    //   console.log(`✅ Order ${order.id} expired.`);
    // }
  },
  { connection: redisConfig }
);

worker.on("completed", (job) => console.log(`🎉 Job ${job.id} completed.`));
worker.on("failed", (job, err) =>
  console.error(`❌ Job ${job?.id} failed:`, err)
);
