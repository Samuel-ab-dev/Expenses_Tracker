import argon2 from "argon2";
import { createHmac } from "node:crypto";

const getPasswordPepper = (): string => {
  const PEPPER = process.env.PEPPER;

  if (!PEPPER) {
    throw new Error("PEPPER is not defined");
  }

  return PEPPER;
};

const pepperPassword = (password: string): string => {
  return createHmac("sha256", getPasswordPepper())
    .update(password, "utf8")
    .digest("hex");
};

export const hashPassword = async (password: string): Promise<string> => {
  const pepperedPassword = pepperPassword(password);

  return argon2.hash(pepperedPassword, {
    type: argon2.argon2id,
  });
};

export const verifyPassword = async (
  passwordHash: string,
  password: string,
): Promise<boolean> => {
  const pepperedPassword = pepperPassword(password);

  return argon2.verify(passwordHash, pepperedPassword);
};
