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
      title: "Menu type",
      type: "string",
      options: { list: ["Sacrament", "Education", "Community", "Support"] },
      initialValue: "Sacrament"
    }),
    defineField({
      name: "displayCategory",
      title: "Display category",
      description: "The visible menu grouping shown to members, such as Mushrooms, Chocolate, or Capsules & Microdose.",
      type: "string",
      options: {
        list: [
          "Mushrooms",
          "Chocolate",
          "Capsules & Microdose",
          "Gummies & Lozenges",
          "Beverages & Pantry",
          "Prepared Foods",
          "Extracts",
          "Sprays",
          "Support",
          "Education"
        ]
      }
    }),
    defineField({ name: "price", title: "Price", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "servingDetails",
      title: "Serving details",
      description: "Optional short details such as total grams, number of pieces, or capsule count.",
      type: "string"
    }),
    defineField({
      name: "variants",
      title: "Flavors / variants",
      type: "array",
      of: [{ type: "string" }]
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [{ name: "alt", title: "Alt text", type: "string" }]
    }),
    defineField({
      name: "sourceImageUrl",
      title: "Source image URL",
      description: "Original image URL from the previous website, kept for migration reference.",
      type: "url",
      readOnly: true
    }),
    defineField({ name: "available", title: "Available", type: "boolean", initialValue: true }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "memberOnly", title: "Member only", type: "boolean", initialValue: true }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: true }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0 }),
    defineField({ name: "notesForStaff", title: "Staff notes", type: "text" })
  ]
});
