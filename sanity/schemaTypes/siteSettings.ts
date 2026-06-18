import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site title", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "email"
    }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({
      name: "globalAnnouncement",
      title: "Global announcement",
      type: "text"
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [{ type: "url" }]
    })
  ]
});
