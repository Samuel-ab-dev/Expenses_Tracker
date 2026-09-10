import mongoose, { type Date, type Model } from "mongoose";
import { verifyPassword } from "../services/passwordServices.ts";

interface IUser {
  fullName: string;
  email: string;
  passwordHash: string;
  profileImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  comparePassword(possiblePassword: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    profileImageUrl: { type: String, default: null },
  },
  { timestamps: true },
);

userSchema.methods.comparePassword = async function (
  possiblePassword: string,
): Promise<boolean> {
  return verifyPassword(this.passwordHash, possiblePassword);
};
const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
