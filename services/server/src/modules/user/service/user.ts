import { UserBase } from "@/entities/user/user-base";
import { UserRepository } from "@/modules/user/repository/user";

export class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async getAllUsers(): Promise<UserBase[]> {
    return this.repository.getAllUsers();
  }

  async getUserById(id: string): Promise<UserBase | null> {
    return this.repository.getUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    return this.repository.deleteUser(id);
  }
}
