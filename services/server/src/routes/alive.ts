import { Router } from "express";

class AliveRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", async (req, res) => {
      res.status(200).json({ message: `Server is alive: ${new Date()}` });
    });
  }
}

export default new AliveRouter().router;
