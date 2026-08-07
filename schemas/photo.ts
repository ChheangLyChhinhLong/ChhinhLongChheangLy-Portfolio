import { defineField, defineType } from "sanity";
import { HiOutlinePhotograph } from "react-icons/hi";

export default defineType({
  name: "photo",
  title: "Photos Gallery",
  type: "document",
  icon: HiOutlinePhotograph,
  fields: [
    defineField({
      name: "title",
      title: "Title / Caption",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo Asset",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["lqip"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location (e.g., Phnom Penh, Cambodia)",
      type: "string",
    }),
    defineField({
      name: "takenAt",
      title: "Date Taken",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Featured Photo",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "image",
    },
  },
});
