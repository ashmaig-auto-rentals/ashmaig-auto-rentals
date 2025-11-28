// src/lib/blogPosts.ts

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ways-rideshare-drivers-can-earn-extra-during-holiday-rush",
    title: "Top Ways Rideshare Drivers Can Earn Extra During the Holiday Rush",
    description:
      "Practical ways Phoenix Uber, Lyft, and delivery drivers can earn extra during the holiday rush — from promos and multi-apping to using fuel-efficient rentals.",
    date: "November 2025",
  },
  {
    slug: "how-to-boost-delivery-earnings-this-holiday-season",
    title: "How to Boost Delivery Earnings This Holiday Season",
    description:
      "Holiday earnings guide for Phoenix Uber, Lyft, and delivery drivers — learn strategies to maximize profits using fuel-efficient rentals from Ashmaig Auto Rentals.",
    date: "November 2025",
  },
  {
    slug: "why-economy-rentals-are-perfect-for-holiday-delivery-drivers",
    title: "Why Economy Rentals Are Perfect for Holiday Delivery Drivers",
    description:
      "Why fuel-efficient economy rentals with unlimited mileage and maintenance included are ideal for Phoenix rideshare and delivery drivers during the holidays.",
    date: "November 2025",
  },
  {
    slug: "phoenix-high-demand-hours-guide",
    title: "Phoenix High-Demand Hours Guide for Rideshare & Delivery Drivers",
    description:
      "Best times to drive in Phoenix for Uber, Lyft, and delivery apps — daily peaks, weekend rushes, holiday surges, and zone tips to increase earnings.",
    date: "November 2025",
  },
];