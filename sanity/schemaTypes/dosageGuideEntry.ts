import { defineField, defineType } from "sanity";

export const dosageGuideEntry = defineType({
  name: "dosageGuideEntry",
  title: "Dosage Guide Entries",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "range", title: "Range", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "cautionNote", title: "Caution note", type: "text" }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0 })
  ],
  orderings: [{ title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }]
});
