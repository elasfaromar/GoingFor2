import { prisma } from "../db";  // Import the PrismaClient instance
import { Ok, Err, Result } from "ts-results";

// Function to find an account by email
export const findByEmail = async (email: string) => {
  const account = await prisma.account.findFirst({
    where: { email: email },
  });

  if (!account) {
    return null;
  }

  return account;
};

// Function to create a new account
export const create = async (
  email: string,
  password: string,
  role = "USER",
): Promise<Result<any, Error>> => {
  const existingAccount = await findByEmail(email);

  if (existingAccount !== null) {
    return Err(new Error("Account already exists"));
  }

  const newAccount = await prisma.account.create({
    data: {
      email: email,
      password: password,
      role: role,
    },
  });

  return Ok(newAccount);
};
