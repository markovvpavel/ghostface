import { CreateMemberDTO } from "@/dtos/user/user-member";
import { UserMember } from "@/entities/user/user-member";
import { UserMemberRepository } from "@/modules/user/repository/user-member";

export class UserMemberService {
  private repository: UserMemberRepository;

  constructor(repository: UserMemberRepository) {
    this.repository = repository;
  }

  async getMemberById(id: string): Promise<UserMember | null> {
    return this.repository.getMemberById(id);
  }

  async getMemberByEmail(email: string): Promise<UserMember | null> {
    return this.repository.getMemberByEmail(email);
  }

  async createMember(data: CreateMemberDTO): Promise<UserMember> {
    return this.repository.createMember(data);
  }

  async deleteMember(id: string): Promise<void> {
    await this.repository.deleteMember(id);
  }
}
