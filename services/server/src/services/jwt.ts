import { JwtPayload, JwtTokenPair } from "@/types";
import jwt, { SignOptions } from "jsonwebtoken";

export class JwtService {
  private secret: string;

  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Failed to read JWT_SECRET");
    this.secret = secret;
  }

  public sign(payload: JwtPayload, expiresIn: string | number): string {
    return jwt.sign(payload, this.secret, { expiresIn } as SignOptions);
  }

  public verify(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }

  public generateTokenPair(payload: JwtPayload): JwtTokenPair {
    const accessToken = this.sign(payload, "15min");
    const refreshToken = this.sign(payload, "7d");
    return { accessToken, refreshToken };
  }
}
