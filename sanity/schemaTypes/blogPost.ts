import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Posts",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Getting Started",
          "Preparation",
          "Community",
          "Spiritual Practice",
          "Integration",
          "Traditions"
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "excerpt",
      title: "Short summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "featured",
      title: "Feature this post",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      fields: [{ name: "alt", title: "Alt text", type: "string" }]
    }),
    defineField({
      name: "body",
      title: "Article body",
      type: "blockContent",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "seoTitle",
      title: "Search title",
      type: "string"
    }),
    defineField({
      name: "seoDescription",
      title: "Search description",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true
    })
  ],
  orderings: [
    {
      title: "Published date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }]
    }
  ]
});
