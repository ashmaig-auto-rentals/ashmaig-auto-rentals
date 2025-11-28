// lib/blogPosts.ts

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-boost-delivery-earnings-this-holiday-season",
    title: "How to Boost Delivery Earnings This Holiday Season",
    description:
      "The ultimate guide for maximizing earnings on DoorDash, Uber Eats, Instacart, and rideshare apps during the holiday rush in Phoenix.",
    date: "November 2025",
  },
];