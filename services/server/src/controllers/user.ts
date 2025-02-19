import dataSource from "@/core/db";
import { UserService } from "@/services/user";
import { BaseController } from "./base";
import { UserRepository } from "@/repositories/user";

export class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    const userRepository = new UserRepository(dataSource);
    this.userService = new UserService(userRepository);
  }

  public getAllUsers = this.handleRequest(async (req, res) => {
    const users = await this.userService.getAllUsers();
    res.status(200).json({ users });
  });

  public updateUser = this.handleRequest(async (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;
    await this.userService.updateUser(id, data);
    res.status(200).json({ message: "User was updated" });
  });

  public deleteUser = this.handleRequest(async (req, res) => {
    const id = Number(req.params.id);
    await this.userService.deleteUser(id);
    res.status(200).json({ message: "User was deleted" });
  });
}
