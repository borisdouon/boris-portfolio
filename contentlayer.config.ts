import { defineDocumentType, makeSource } from "contentlayer2/source-files";

export const CaseStudy = defineDocumentType(() => ({
  name: "CaseStudy",
  filePathPattern: `case-studies/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    year: {
      type: "number",
      required: true,
    },
    client: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      required: true,
    },
    stack: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    goals: {
      type: "string",
      required: true,
    },
    kpis: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    problem: {
      type: "string",
      required: true,
    },
    approach: {
      type: "string",
      required: true,
    },
    solution: {
      type: "string",
      required: true,
    },
    impact: {
      type: "string",
      required: true,
    },
    gallery: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
    links: {
      type: "json",
      required: false,
    },
    category: {
      type: "enum",
      options: ["Web Apps", "WordPress", "Branding", "UI Components"],
      required: true,
    },
    featured: {
      type: "boolean",
      default: false,
    },
    publishedAt: {
      type: "date",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/work/${doc._raw.flattenedPath.replace("case-studies/", "")}`,
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("case-studies/", ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [CaseStudy],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
