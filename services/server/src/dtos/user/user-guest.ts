import { UserMember } from "@/entities/user/user-member";

export type ConvertGuestToMemberDTO = Pick<UserMember, "email" | "password">;
