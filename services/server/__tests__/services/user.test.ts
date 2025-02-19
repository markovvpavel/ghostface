import Order from "@/models/Order";
import User from "@/models/User";
import { CreateUserDTO } from "@/dto/user";
import { UserRepository } from "@/repositories/user";
import { PasswordService } from "@/services/password";
import { UserService } from "@/services/user";
import { DataSource, DataSourceOptions } from "typeorm";

export const dbConfig: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  entities: [User, Order],
};

describe("User Service", () => {
  let dataSource: DataSource;
  let userService: UserService;
  let passwordService: PasswordService;

  beforeAll(async () => {
    dataSource = new DataSource(dbConfig);

    await dataSource.initialize();

    userService = new UserService(new UserRepository(dataSource));
    passwordService = new PasswordService();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  const getUserByEmail = async (email: string) => {
    let user = await userService.getUserByEmail(email);
    if (!user) {
      console.error(`User with email ${email} not found`);
      return null;
    }
    return user;
  };

  it("Create User", async () => {
    const hashedPassword = await passwordService.hash("password");

    const data: CreateUserDTO = {
      email: "admin@mail.com",
      password: hashedPassword,
      role: "admin",
    };

    const user = await userService.createUser(data);

    const passwordMatch = await passwordService.compare(
      "password",
      hashedPassword
    );

    expect(user.email).toEqual(data.email);
    expect(passwordMatch).toBeTruthy();
    expect(user.role).toEqual(data.role);
  });

  it("Read User", async () => {
    const user = await getUserByEmail("admin@mail.com");

    if (user) {
      const users = await userService.getAllUsers();
      expect(users.length).toBeGreaterThan(0);
      expect(users[0].email).toEqual(user.email);
    }
  });

  it("Update User", async () => {
    const hashedPassword = await passwordService.hash("drowssap");

    const user = await getUserByEmail("admin@mail.com");

    if (user) {
      await userService.updateUser(user.id, { password: hashedPassword });

      const updatedUser = await userService.getUserByEmail("admin@mail.com");
      const passwordMatch = await passwordService.compare(
        "drowssap",
        hashedPassword
      );

      expect(passwordMatch).toBeTruthy();
    }
  });

  it("Delete User", async () => {
    const user = await getUserByEmail("admin@mail.com");

    if (user) {
      await userService.deleteUser(user.id);

      const deletedUser = await userService.getUserByEmail("admin@mail.com");
      expect(deletedUser).toBeNull();
    }
  });
});
