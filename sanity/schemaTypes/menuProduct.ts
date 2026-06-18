import { defineField, defineType } from "sanity";

export const menuProduct = defineType({
  name: "menuProduct",
  title: "Menu Products",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Product name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "URL", type: "slug", options: { source: "title" } }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Sacrament", "Education", "Community", "Support"] }
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [{ name: "alt", title: "Alt text", type: "string" }]
    }),
    defineField({ name: "available", title: "Available", type: "boolean", initialValue: true }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "memberOnly", title: "Member only", type: "boolean", initialValue: true }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: true }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0 }),
    defineField({ name: "notesForStaff", title: "Staff notes", type: "text" })
  ]
});
