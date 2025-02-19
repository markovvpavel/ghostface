import bcrypt from "bcryptjs";

export class PasswordService {
  private saltRounds = 10;

  public async compare(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }

  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }
}
