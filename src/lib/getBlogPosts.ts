// src/lib/getBlogPosts.ts
import fs from "fs";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

// Path to your blog directory (src/app/blog)
const BLOG_DIR = path.join(process.cwd(), "src", "app", "blog");

export function getBlogPosts(): BlogPost[] {
  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });

  // Only folders inside /blog (each folder = one post)
  const folders = entries.filter((entry) => entry.isDirectory());

  const posts: BlogPost[] = folders.map((folder) => {
    const slug = folder.name;

    // Default title from slug: "how-to-boost..." → "How To Boost..."
    const defaultTitle = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    let title = defaultTitle;
    let description = `Read our guide: ${defaultTitle} — from Ashmaig Auto Rentals in Phoenix.`;
    let date = "2025";

    // Optional metadata.json in each blog folder:
    // src/app/blog/<slug>/metadata.json
    const metadataPath = path.join(BLOG_DIR, slug, "metadata.json");

    if (fs.existsSync(metadataPath)) {
      try {
        const raw = fs.readFileSync(metadataPath, "utf-8");
        const meta = JSON.parse(raw);
        title = meta.title ?? title;
        description = meta.description ?? description;
        date = meta.date ?? date;
      } catch (err) {
        console.warn(`⚠️ Failed to read metadata.json for ${slug}:`, err);
      }
    }

    return {
      slug,
      title,
      description,
      date,
    };
  });

  // Sort newest first by slug (you can change to date later)
  return posts.sort((a, b) => (a.slug > b.slug ? -1 : 1));
}