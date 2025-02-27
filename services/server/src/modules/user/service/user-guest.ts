import { UserGuest } from "@/entities/user/user-guest";
import { UserGuestRepository } from "@/modules/user/repository/user-guest";

export class UserGuestService {
  private repository: UserGuestRepository;

  constructor(repository: UserGuestRepository) {
    this.repository = repository;
  }

  async getGuestById(id: string): Promise<UserGuest | null> {
    return this.repository.getGuestById(id);
  }

  async createGuest(): Promise<UserGuest> {
    return this.repository.createGuest();
  }

  async deleteGuest(id: string): Promise<void> {
    await this.repository.deleteGuest(id);
  }
}
