import type { ProjectType } from "@/types";

export const projectCategories = ["All", "Full-Stack", "Frontend", "Backend & APIs", "Database / Architecture"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

function projectText(project: ProjectType) {
  return `${project.name} ${project.tagline} ${JSON.stringify(project.description ?? [])}`.toLowerCase();
}

export function getProjectCategory(project: ProjectType): Exclude<ProjectCategory, "All"> {
  const text = projectText(project);
  if (/database|postgres|mysql|schema|normaliz|dfd|sanity/.test(text)) return "Database / Architecture";
  if (/api|backend|server|node|python|telegram|express/.test(text)) return "Backend & APIs";
  if (/full.?stack|platform|dashboard|commerce/.test(text)) return "Full-Stack";
  return "Frontend";
}

export function getProjectStack(project: ProjectType) {
  const text = projectText(project);
  const stack = ["TypeScript"];
  if (/next|react/.test(text)) stack.unshift("Next.js");
  if (/node|api|express/.test(text)) stack.push("Node.js");
  if (/python/.test(text)) stack.push("Python");
  if (/postgres/.test(text)) stack.push("PostgreSQL");
  if (/mysql/.test(text)) stack.push("MySQL");
  if (/tailwind|css/.test(text)) stack.push("Tailwind CSS");
  if (/telegram/.test(text)) stack.push("Telegram API");
  return [...new Set(stack)].slice(0, 5);
}

export function getProjectStatus(project: ProjectType) {
  if (project.projectUrl && project.repository) return "Completed";
  if (project.repository) return "Case Study";
  return "In Progress";
}