import { BaseController } from "@/controller/base";
import { JwtService } from "@/services/jwt";
import { PasswordService } from "@/services/password";
import { UserService } from "@/modules/user/service/user";
import { UserRepository } from "@/modules/user/repository/user";
import { UserGuestService } from "@/modules/user/service/user-guest";
import { UserGuestRepository } from "@/modules/user/repository/user-guest";
import { UserMemberService } from "@/modules/user/service/user-member";
import { UserMemberRepository } from "@/modules/user/repository/user-member";
import { UserAdminService } from "@/modules/user/service/user-admin";
import { UserAdminRepository } from "@/modules/user/repository/user-admin";
import { LoginMemberDTO, RegisterMemberDTO } from "@/dtos/user/user-member";
import { Request } from "express";
import dataSource from "@/core/db";
import { ConvertGuestToMemberDTO } from "@/dtos/user/user-guest";

export class UserController extends BaseController {
  private jwtService: JwtService;
  private passwordService: PasswordService;
  private userService: UserService;
  private userAdminService: UserAdminService;
  private userGuestService: UserGuestService;
  private userMemberService: UserMemberService;

  constructor() {
    super();
    this.jwtService = new JwtService();
    this.passwordService = new PasswordService();
    this.userService = new UserService(new UserRepository(dataSource));
    this.userAdminService = new UserAdminService(
      new UserAdminRepository(dataSource)
    );
    this.userGuestService = new UserGuestService(
      new UserGuestRepository(dataSource)
    );
    this.userMemberService = new UserMemberService(
      new UserMemberRepository(dataSource)
    );
  }

  public getAllUsers = this.handleRequest(async (req, res) => {
    const users = await this.userService.getAllUsers();
    res.status(200).json({ users });
  });

  public getUserById = this.handleRequest(async (req, res) => {
    const id = req.params.id;
    const user = await this.userService.getUserById(id);
    res.status(200).json({ user });
  });

  public deleteUser = this.handleRequest(async (req, res) => {
    const id = req.params.id;
    await this.userService.deleteUser(id);
    res.status(200).json({ message: "User was deleted" });
  });

  public authenticateGuest = this.handleRequest(async (req, res) => {
    const { id, role } = await this.userGuestService.createGuest();
    const tokenPair = this.jwtService.generateTokenPair({ id, role });
    res.status(200).json({
      message: "Authenticate Guest successful",
      ...tokenPair,
    });
  });

  public loginMember = this.handleRequest(
    async (req: Request<{}, {}, LoginMemberDTO>, res) => {
      const { email, password } = req.body;
      const user = await this.userMemberService.getMemberByEmail(email);
      if (!user) {
        res.status(404).json({ message: "Member not found" });
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
      const { id, role } = user;
      const tokenPair = this.jwtService.generateTokenPair({ id, role });
      res.status(200).json({
        message: "Login member successful",
        ...tokenPair,
      });
    }
  );

  public registerMember = this.handleRequest(
    async (req: Request<{}, {}, RegisterMemberDTO>, res) => {
      const { email, password } = req.body;
      const user = await this.userMemberService.getMemberByEmail(email);
      if (user) {
        res.status(404).json({ message: "Member already exist" });
        return;
      }
      const hashedPassword = await this.passwordService.hash(password);
      await this.userMemberService.createMember({
        email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "Register member successful" });
    }
  );

  public convertGuestToMember = this.handleRequest(
    async (req: Request<{}, {}, ConvertGuestToMemberDTO>, res) => {
      const { email, password } = req.body;
      
    }
  );
}
