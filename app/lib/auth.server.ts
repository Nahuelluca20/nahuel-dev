import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

// Dynamic database import to handle CLI vs runtime environments
const getDatabase = async () => {
  const isBetterAuthCLI =
    process.argv.some((arg) => arg.includes("@better-auth/cli")) ||
    process.env.BETTER_AUTH_CLI === "true";

  if (isBetterAuthCLI) {
    // For CLI, import a mock database
    const { default: database } = await import("../db");
    return database({} as unknown as D1Database);
  }

  // For runtime, import the actual database
  return db;
};

// Create auth configuration that works in both CLI and runtime
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite" }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    requireEmailVerification: true,
    maxPasswordLength: 100,
    minPasswordLength: 8,
    revokeSessionsOnPasswordReset: true,
    sendVerificationEmail: true,
  },
});
