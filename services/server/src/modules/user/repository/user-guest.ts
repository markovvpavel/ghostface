import { UserGuest } from "@/entities/user/user-guest";
import { UserRole } from "@/types";
import { DataSource, Repository } from "typeorm";

export class UserGuestRepository {
  private repository: Repository<UserGuest>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(UserGuest);
  }

  async getGuestById(id: string): Promise<UserGuest | null> {
    return this.repository.findOne({ where: { id } });
  }

  async createGuest(): Promise<UserGuest> {
    const guest = this.repository.create({ role: UserRole.GUEST });
    return this.repository.save(guest);
  }

  async deleteGuest(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
