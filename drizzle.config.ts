import type { Config } from "drizzle-kit";

export default {
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "./wrangler.toml",
    dbName: "db-blog",
  },
  schema: "./app/db/schema.ts",
  out: "./drizzle",
} satisfies Config;
