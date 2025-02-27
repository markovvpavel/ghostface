import { CreateMemberDTO } from "@/dtos/user/user-member";
import { UserMember } from "@/entities/user/user-member";
import { UserRole } from "@/types";
import { DataSource, Repository } from "typeorm";

export class UserMemberRepository {
  private repository: Repository<UserMember>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(UserMember);
  }

  async getMemberById(id: string): Promise<UserMember | null> {
    return this.repository.findOne({ where: { id } });
  }

  async getMemberByEmail(email: string): Promise<UserMember | null> {
    return this.repository.findOne({ where: { email } });
  }

  async createMember(data: CreateMemberDTO): Promise<UserMember> {
    const member = this.repository.create({ ...data, role: UserRole.MEMBER });
    return this.repository.save(member);
  }

  async deleteMember(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
