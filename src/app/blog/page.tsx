import Link from "next/link";

export const metadata = {
  title: "Blog | Ashmaig Auto Rentals",
  description:
    "Guides, tips, earnings strategies, and rental advice for Uber, Lyft, DoorDash, and delivery drivers in Phoenix. Stay informed with Ashmaig Auto Rentals.",
};

const blogPosts = [
  {
    slug: "how-to-boost-delivery-earnings-this-holiday-season",
    title: "How to Boost Delivery Earnings This Holiday Season",
    description:
      "The ultimate guide for maximizing earnings on DoorDash, Uber Eats, Instacart, and rideshare apps during the holiday rush in Phoenix.",
    date: "November 2025",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100 min-h-screen">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-3">Ashmaig Auto Rentals Blog</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
          Tips, strategies, guides, and updates to help Phoenix drivers increase
          their earnings and stay on the road with reliable rental cars.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition"
            >
              <div className="flex flex-col h-full">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                  {post.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                  {post.description}
                </p>

                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No blog posts yet — check back soon.
          </p>
        )}
      </section>
    </main>
  );
}