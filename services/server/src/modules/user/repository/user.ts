import { UserBase } from "@/entities/user/user-base";
import { DataSource, Repository } from "typeorm";

export class UserRepository {
  private repository: Repository<UserBase>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(UserBase);
  }

  async getAllUsers(): Promise<UserBase[]> {
    return this.repository.find();
  }

  async getUserById(id: string): Promise<UserBase | null> {
    return this.repository.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
