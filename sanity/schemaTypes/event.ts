import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Events",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Event title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "URL", type: "slug", options: { source: "title" } }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "startTime", title: "Start time", type: "string" }),
    defineField({ name: "endTime", title: "End time", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [{ name: "alt", title: "Alt text", type: "string" }]
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "registrationLink", title: "Registration link", type: "url" }),
    defineField({ name: "membersOnly", title: "Members only", type: "boolean", initialValue: false }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: true })
  ]
});
