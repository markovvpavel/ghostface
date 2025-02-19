import { DataSource, Repository } from "typeorm";
import { CreateUserDTO, UpdateUserDTO } from "@/dto/user";
import User from "@/models/User";

export class UserRepository {
  private repository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  async getAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async updateUser(id: number, data: UpdateUserDTO): Promise<void> {
    await this.repository.update(id, data);
  }

  async deleteUser(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
