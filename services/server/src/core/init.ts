import dataSource from "@/core/db";
import { UserService } from "@/services/user";
import { PasswordService } from "@/services/password";
import { UserRepository } from "@/repositories/user";

export async function initDatabase() {
  console.log("Database start sync...");
  await dataSource.initialize();

  for (const orderNum of [1, 2]) {
    const adminEmail = process.env[`ADMIN_EMAIL_${orderNum}`];
    const adminPassword = process.env[`ADMIN_PASSWORD_${orderNum}`];

    if (!adminEmail || !adminPassword) {
      throw new Error(`Failed to create admin`);
    }

    const userRepository = new UserRepository(dataSource);
    const userService = new UserService(userRepository);
    const isExist = await userService.getUserByEmail(adminEmail);

    if (isExist) {
      console.log(`Admin ${adminEmail} already exist`);
      continue;
    }

    const passwordService = new PasswordService();
    const hashedPassword = await passwordService.hash(adminPassword);

    const user = await userService.createUser({
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log(`Created admin ${user.email}`);
  }
}
