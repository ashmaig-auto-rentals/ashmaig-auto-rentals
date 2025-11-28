// src/lib/blogPosts.ts

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
  {
    slug: "why-economy-rentals-are-perfect-for-holiday-delivery-drivers",
    title: "Why Economy Rentals Are Perfect for Holiday Delivery Drivers",
    description:
      "Learn why fuel-efficient economy rental cars are the smartest choice for rideshare and delivery drivers working through Phoenix’s holiday rush.",
    date: "November 2025",
  },
  {
    slug: "phoenix-high-demand-hours-guide",
    title: "Phoenix High-Demand Hours Guide for Rideshare & Delivery Drivers",
    description:
      "Learn the best times to drive in Phoenix — daily peaks, holiday surges, event spikes, and positioning tips to maximize earnings.",
    date: "November 2025",
  },
];