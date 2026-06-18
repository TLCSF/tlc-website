import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Website Pages",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "URL", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "seoTitle", title: "Search title", type: "string" }),
    defineField({ name: "seoDescription", title: "Search description", type: "text", rows: 3 }),
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string" }),
    defineField({ name: "heroBody", title: "Hero body", type: "text" }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      fields: [{ name: "alt", title: "Alt text", type: "string" }]
    }),
    defineField({ name: "body", title: "Page content", type: "blockContent" }),
    defineField({ name: "primaryCTA", title: "Primary button text", type: "string" }),
    defineField({ name: "primaryCTALink", title: "Primary button link", type: "string" }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: true })
  ]
});
