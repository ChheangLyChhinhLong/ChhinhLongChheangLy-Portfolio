export const photoCategories = ["All", "Workshops", "Academic & University", "Projects & Demos", "Certificates"] as const;
export type PhotoCategory = (typeof photoCategories)[number];

export function inferPhotoCategory(title: string, location = ""): Exclude<PhotoCategory, "All"> {
  const text = `${title} ${location}`.toLowerCase();
  if (/certificate|certification|award|diploma/.test(text)) return "Certificates";
  if (/project|demo|showcase|hackathon|prototype|presentation/.test(text)) return "Projects & Demos";
  if (/university|campus|class|lecture|academic|bbu|school/.test(text)) return "Academic & University";
  return "Workshops";
}