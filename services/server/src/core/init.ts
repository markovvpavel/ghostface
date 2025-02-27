import dataSource from "@/core/db";
import { UserAdminRepository } from "@/modules/user/repository/user-admin";
import { UserAdminService } from "@/modules/user/service/user-admin";
import { PasswordService } from "@/services/password";

export async function initDatabase() {
  console.log("Database start sync...");
  await dataSource.initialize();

  for (const orderNum of [1, 2]) {
    const adminEmail = process.env[`ADMIN_EMAIL_${orderNum}`];
    const adminPassword = process.env[`ADMIN_PASSWORD_${orderNum}`];

    if (!adminEmail || !adminPassword) {
      throw new Error(`Failed to create admin`);
    }

    const userAdminRepository = new UserAdminRepository(dataSource);
    const userAdminService = new UserAdminService(userAdminRepository);

    const isExist = await userAdminService.getAdminByEmail(adminEmail);

    if (isExist) {
      console.log(`Admin ${adminEmail} already exist`);
      continue;
    }

    const passwordService = new PasswordService();
    const hashedPassword = await passwordService.hash(adminPassword);

    const user = await userAdminService.createAdmin({
      email: adminEmail,
      password: hashedPassword,
    });

    console.log(`Created admin ${user.email}`);
  }
}
