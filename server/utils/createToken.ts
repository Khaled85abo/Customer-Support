import jwt from "jsonwebtoken";
import { Types } from "mongoose";
interface TokenUser {
  name: string | null;
  email: string | null;
  role: string;
  id: any;
}
export default function createToken(user: TokenUser) {
  const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "1d" });
  return token;
}
