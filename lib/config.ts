import fs from "fs";
import path from "path";
import { parse } from "yaml";
import { MenuConfigSchema, type MenuConfig } from "@/lib/schema";

export function getMenuConfig(): MenuConfig {
  const filePath = path.join(process.cwd(), "menu.yaml");

  let raw: string;
  try {
    raw = fs.readFileSync(filePath, "utf-8");
  } catch {
    throw new Error(
      `Could not read menu.yaml at ${filePath}. Make sure menu.yaml exists in the project root.`
    );
  }

  let parsed: unknown;
  try {
    parsed = parse(raw);
  } catch (err) {
    throw new Error(`menu.yaml contains invalid YAML syntax:\n${String(err)}`);
  }

  const result = MenuConfigSchema.safeParse(parsed);
  if (!result.success) {
    const formatted = result.error.issues
      .map((e) => `  - ${e.path.join(".")}: ${e.message}`)
      .join("\n");
    throw new Error(`menu.yaml failed validation:\n${formatted}`);
  }

  return result.data;
}
