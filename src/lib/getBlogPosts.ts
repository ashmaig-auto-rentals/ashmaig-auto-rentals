// src/lib/getBlogPosts.ts
import fs from "fs";
import path from "path";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;        // e.g. "2025-12-01"
  description: string;
};

const BLOG_DIR = path.join(process.cwd(), "src", "app", "blog");

export function getBlogPosts(): BlogPostMeta[] {
  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });

  const posts: BlogPostMeta[] = [];

  for (const entry of entries) {
    // Only look at folders (each folder = one blog post route)
    if (!entry.isDirectory()) continue;

    const slug = entry.name;

    // Ignore special folders if you have any, like (marketing) or api
    if (slug.startsWith("(") || slug.startsWith("_")) continue;

    const metaPath = path.join(BLOG_DIR, slug, "meta.json");
    if (!fs.existsSync(metaPath)) continue;

    const raw = fs.readFileSync(metaPath, "utf8");
    try {
      const meta = JSON.parse(raw) as Omit<BlogPostMeta, "slug">;

      // Push into posts with slug
      posts.push({
        slug,
        title: meta.title,
        date: meta.date,
        description: meta.description,
      });
    } catch (err) {
      console.error(`Failed to parse meta.json for blog slug "${slug}":`, err);
    }
  }

  // Sort by date DESC (newest first)
  posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return posts;
}