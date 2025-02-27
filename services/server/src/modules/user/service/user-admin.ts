import { CreateAdminDTO } from "@/dtos/user/user-admin";
import { UserAdmin } from "@/entities/user/user-admin";
import { UserAdminRepository } from "@/modules/user/repository/user-admin";

export class UserAdminService {
  private repository: UserAdminRepository;

  constructor(repository: UserAdminRepository) {
    this.repository = repository;
  }

  async getAdminById(id: string): Promise<UserAdmin | null> {
    return this.repository.getAdminById(id);
  }

  async getAdminByEmail(email: string): Promise<UserAdmin | null> {
    return this.repository.getAdminByEmail(email);
  }

  async createAdmin(data: CreateAdminDTO): Promise<UserAdmin> {
    return this.repository.createAdmin(data);
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.repository.deleteAdmin(id);
  }
}
