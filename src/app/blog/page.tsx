// src/app/blog/page.tsx
import Link from "next/link";
import { getBlogPosts } from "@/lib/getBlogPosts";

export const metadata = {
  title: "Blog | Ashmaig Auto Rentals",
  description:
    "Rideshare rental tips, Uber & Lyft driver guides, and Phoenix earnings hacks.",
};

export default function BlogPage() {
  const posts = getBlogPosts(); // ✅ auto-loaded from folder structure

  return (
    <main className="bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-4">Ashmaig Auto Rentals Blog</h1>

        <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
          Guides, tips, and Phoenix-specific strategies to help Uber, Lyft,
          DoorDash, and other delivery drivers earn more using
          rideshare-ready rentals from Ashmaig Auto Rentals.
        </p>

        {posts.length === 0 ? (
          <p className="text-gray-500 mt-8">
            No blog posts yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-500 transition bg-white dark:bg-slate-800 dark:border-slate-700"
              >
                <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-600">
                  {post.title}
                </h2>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {/* Format date however you like; currently raw */}
                  {post.date}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.description}
                </p>

                <p className="mt-3 text-sm font-medium text-blue-600 group-hover:underline">
                  Read More →
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}