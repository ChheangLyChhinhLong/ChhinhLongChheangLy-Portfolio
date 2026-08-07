import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { codeInput } from "@sanity/code-input";
import { table } from "@sanity/table";
import { projectId, dataset } from "./lib/env.api";
import { siteConfig } from "./lib/env";

export default defineConfig({
  name: "chhinhlongdev",
  title: siteConfig.studioName,
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [deskTool(), visionTool(), codeInput(), table()],
  schema: { types: schemaTypes },
});
