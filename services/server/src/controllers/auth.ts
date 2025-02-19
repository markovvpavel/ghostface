import dataSource from "@/core/db";
import User from "@/models/User";
import { PasswordService } from "@/services/password";
import { UserService } from "@/services/user";
import { BaseController } from "./base";
import { Request } from "express";
import { JwtService } from "@/services/jwt";
import { UserRepository } from "@/repositories/user";

export class AuthController extends BaseController {
  private jwtService: JwtService;
  private passwordService: PasswordService;
  private userService: UserService;

  constructor() {
    super();
    this.jwtService = new JwtService();
    this.passwordService = new PasswordService();

    const userRepository = new UserRepository(dataSource);
    this.userService = new UserService(userRepository);
  }

  public login = this.handleRequest(
    async (req: Request<{}, {}, Pick<User, "email" | "password">>, res) => {
      const { email, password } = req.body;

      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        res.send(404).json({ message: "User not found" });
        return;
      }

      const isMatch = await this.passwordService.compare(
        password,
        user.password
      );

      if (!isMatch) {
        res.send(401).json({ message: "Invalid credentials" });
        return;
      }

      const payload = {
        email: user.email,
        id: user.id,
        role: user.role,
      };

      const accessToken = this.jwtService.sign(payload, "15min");
      const refreshToken = this.jwtService.sign(payload, "7d");

      res.status(200).json({
        message: "Login successful",
        accessToken,
        refreshToken,
      });
    }
  );

  public register = this.handleRequest(
    async (
      // req: Request<{}, {}, Pick<User, "email" | "name" | "password">>,
      req,
      res
    ) => {
      // const { email, name, password } = req.body;
      // const isExist = await this.userService.getUserByEmail(email);
      // if (!isExist) {
      //   res.send(400).json({ message: "User already exist" });
      //   return;
      // }
      // const hashedPassword = await this.passwordService.hash(password);
      // await this.userService.createUser({
      //   email,
      //   name,
      //   password: hashedPassword,
      // });
      // res.status(201).json({ message: "User registered successfully" });
    }
  );

  public refreshToken = this.handleRequest(async (req, res) => {
    // const token = req.header("Authorization")?.replace("Bearer ", "");
    // if (!token) {
    //   res.status(401).json({ message: "Authorization token missing" });
    //   return;
    // }
    // const jwtService = new JwtService();
    // const decoded = jwtService.verify(token);
    // const user = await User.findByPk(decoded.id);
    // if (!user) {
    //   res.status(401).json({ message: "User not found" });
    //   return;
    // }
    // const payload = {
    //   email: user.email,
    //   id: user.id,
    //   role: user.role,
    // };
    // const accessToken = this.jwtService.sign(payload, "15min");
    // const refreshToken = this.jwtService.sign(payload, "7d");
    // res.status(200).json({
    //   message: "Refresh successful",
    //   accessToken,
    //   refreshToken,
    // });
  });
}
