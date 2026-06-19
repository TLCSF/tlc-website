import { announcement } from "./announcement";
import { blogPost } from "./blogPost";
import { blockContent } from "./blockContent";
import { dosageGuideEntry } from "./dosageGuideEntry";
import { educationArticle } from "./educationArticle";
import { event } from "./event";
import { faq } from "./faq";
import { menuProduct } from "./menuProduct";
import { page } from "./page";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  blockContent,
  siteSettings,
  page,
  blogPost,
  educationArticle,
  dosageGuideEntry,
  menuProduct,
  event,
  announcement,
  faq
];
