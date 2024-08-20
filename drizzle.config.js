import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/database/schema.js",
    dialect: "postgresql",
    out: "./drizzle",
    verbose: true,
});
