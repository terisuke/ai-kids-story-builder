import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./config/schema.tsx",
  out: "./drizzle",
  dbCredentials: {
    url: `postgresql://StoryTeller_owner:MZrHYxqNJ84j@ep-gentle-star-a1yqnky7.ap-southeast-1.aws.neon.tech/StoryTeller?sslmode=require`,
  },
  verbose: true,
  strict: true,
});
