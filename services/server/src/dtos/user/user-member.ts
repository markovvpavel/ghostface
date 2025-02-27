import { UserMember } from "@/entities/user/user-member";

export type CreateMemberDTO = Pick<UserMember, "email" | "password">;
export type UpdateMemberDTO = Partial<CreateMemberDTO>;
export type LoginMemberDTO = CreateMemberDTO;
export type RegisterMemberDTO = CreateMemberDTO;
