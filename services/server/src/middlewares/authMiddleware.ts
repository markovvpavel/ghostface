import { JwtService } from "@/services/jwt";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = (allowedRoles?: ("user" | "admin")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ message: "Authorization token missing" });
      return;
    }

    const jwtService = new JwtService();
    const decoded = jwtService.verify(token);
    req.app.locals.user = decoded;

    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      return;
    }

    next();
  };
};
