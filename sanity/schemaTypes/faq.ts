import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQs",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", validation: (Rule) => Rule.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Membership",
          "Legal",
          "Sacraments",
          "Dosage",
          "Set & Setting",
          "Integration",
          "Community",
          "Store Access",
          "Login & Technical Help"
        ]
      }
    }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0 }),
    defineField({ name: "published", title: "Published", type: "boolean", initialValue: true })
  ],
  orderings: [{ title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }]
});
