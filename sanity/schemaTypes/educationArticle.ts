import { defineField, defineType } from "sanity";

export const educationArticle = defineType({
  name: "educationArticle",
  title: "Education Articles",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "URL", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Dosage", "Set & Setting", "Integration", "Traditions", "Entheogenic Churches", "Spiritual Practice"]
      }
    }),
    defineField({ name: "excerpt", title: "Short summary", type: "text", rows: 3 }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      fields: [{ name: "alt", title: "Alt text", type: "string" }]
    }),
    defineField({ name: "body", title: "Article content", type: "blockContent" }),
    defineField({ name: "seoTitle", title: "Search title", type: "string" }),
    defineField({ name: "seoDescription", title: "Search description", type: "text", rows: 3 }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: true })
  ]
});
