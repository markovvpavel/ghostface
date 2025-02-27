import { CreateAdminDTO } from "@/dtos/user/user-admin";
import { UserAdmin } from "@/entities/user/user-admin";
import { UserRole } from "@/types";
import { DataSource, Repository } from "typeorm";

export class UserAdminRepository {
  private repository: Repository<UserAdmin>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(UserAdmin);
  }

  async getAdminById(id: string): Promise<UserAdmin | null> {
    return this.repository.findOne({ where: { id } });
  }

  async getAdminByEmail(email: string): Promise<UserAdmin | null> {
    return this.repository.findOne({ where: { email } });
  }

  async createAdmin(data: CreateAdminDTO): Promise<UserAdmin> {
    const admin = this.repository.create({ ...data, role: UserRole.ADMIN });
    return this.repository.save(admin);
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
