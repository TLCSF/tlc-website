import { defineField, defineType } from "sanity";

export const announcement = defineType({
  name: "announcement",
  title: "Announcements",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "body", title: "Announcement", type: "text" }),
    defineField({
      name: "audience",
      title: "Audience",
      type: "string",
      options: { list: ["public", "members"] },
      initialValue: "public"
    }),
    defineField({ name: "startDate", title: "Start date", type: "date" }),
    defineField({ name: "endDate", title: "End date", type: "date" }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: true })
  ]
});
