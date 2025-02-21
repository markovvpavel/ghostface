import User from "@/models/User";
import { CreateUserDTO, UpdateUserDTO } from "@/dtos/user";
import { UserRepository } from "@/repositories/user";

export class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async getAllUsers(): Promise<User[]> {
    return this.repository.getAllUsers();
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.repository.getUserByEmail(email);
  }

  public async createUser(data: CreateUserDTO): Promise<User> {
    return this.repository.createUser(data);
  }

  public async updateUser(id: number, data: UpdateUserDTO): Promise<void> {
    return this.repository.updateUser(id, data);
  }

  public async deleteUser(id: number): Promise<void> {
    return this.repository.deleteUser(id);
  }
}
