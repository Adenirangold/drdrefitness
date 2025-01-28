import { config } from "./config";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export interface UserPayload {
  email: string;
  id: string;
}

export const generateToken = (user: UserPayload): string => {
  const payload = { id: user.id, email: user.email };

  const options: SignOptions = {
    expiresIn: parseInt(config.jwt.expirationTime),
  };
  return jwt.sign(payload, config.jwt.secretKey, options);
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, config.jwt.secretKey) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
