import { CustomError } from "../../middlewares/errorHandler";
import UserModel from "../../models/user";
import { compare } from "bcrypt";
import { config } from "../../config/env";
import { sign } from "jsonwebtoken";

const { JWT_SECRET } = config;

export const LoginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new CustomError("Invalid credentials", 404);
  }

  if (!(await compare(password, user.password))) {
    throw new CustomError("Invalid credentials", 400);
  }

  const token = sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

  return { token, user };
};
