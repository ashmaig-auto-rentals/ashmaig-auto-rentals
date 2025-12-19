// scripts/generate-daily-post.mjs
// Generates: src/blog/<slug>/page.tsx + meta.json + public/blog/<slug>/hero.png (if available)
// Fallback hero: /public/blog/default-hero.png when image API fails (e.g., org not verified)
//
// Requires env: OPENAI_API_KEY, optional: SITE_URL
// Note: OpenAI image sizes allowed: 1024x1024, 1024x1536, 1536x1024, auto
// We generate 1536x1024 and crop to 1200x630 using sharp.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";
import OpenAI from "openai";

const SITE_URL = process.env.SITE_URL || "https://ashmaig.com";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY env var.");
  process.exit(1);
}

const client = new OpenAI({ apiKey: OPENAI_API_KEY });

// ✅ CHANGE THIS if your blog root differs
const BLOG_ROOT = path.join(process.cwd(), "src", "blog"); // <— your existing posts live here

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}
function writeJSON(p, obj) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function pickNextTopic(queue) {
  const usedSet = new Set(queue.used || []);
  const next = (queue.topics || []).find((t) => !usedSet.has(t));
  if (!next) return null;
  queue.used = [...usedSet, next];
  return next;
}

function escapeHTML(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function escapeJS(s = "") {
  return String(s).replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

// --- Image: generate 1536x1024 then crop/resize to 1200x630 ---
async function generateHeroImage({ slug, title }) {
  const outDir = path.join(process.cwd(), "public", "blog", slug);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "hero.png");

  const prompt = `
Create a clean, modern blog hero image for a Phoenix, Arizona gig-delivery article.
Title/theme: "${title}"

Style: minimal, professional, photo-illustration or vector-like, desert sunset vibe, subtle road lines.
Include: Phoenix skyline or desert landscape feel (generic), delivery vibe (subtle icons).
Do NOT include any text, logos, brand names, watermarks, or recognizable trademarks.
`;

  const result = await client.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1536x1024",
  });

  const b64 = result?.data?.[0]?.b64_json;
  if (!b64) throw new Error("No b64_json returned from image generation.");

  const raw = Buffer.from(b64, "base64");

  await sharp(raw)
    .resize(1200, 630, { fit: "cover", position: "center" })
    .png({ quality: 90 })
    .toFile(outPath);

  return `/blog/${slug}/hero.png`;
}

// --- Content: Responses API returns output_text; we demand JSON-only ---
async function generatePostPlan({ topic, date }) {
  const prompt = `
You are writing a high-quality SEO blog post for Ashmaig Auto Rentals in Phoenix, AZ.
Audience: Uber Eats, DoorDash, Instacart, Amazon Flex, Uber/Lyft drivers in Phoenix metro.
Tone: practical, confident, local to Phoenix (neighborhoods/areas), not spammy.
Safety: no false guarantees, no made-up exact stats, no copyrighted text.

Topic: "${topic}"

Return VALID JSON ONLY with this exact shape:
{
  "meta": {
    "title": "...",
    "date": "${date}",
    "description": "..."
  },
  "article": {
    "kicker": "Rideshare & Delivery Tips",
    "h1": "...",
    "updatedLine": "Updated ${date}",
    "sections": [
      { "id": "peak-hours", "h2": "...", "bullets": ["...","..."], "paras": ["...","..."] }
    ],
    "finalCtaHeading": "...",
    "finalCtaParas": ["...","..."]
  }
}

Rules:
- 7 to 10 sections.
- Include at least 1 section that mentions: Downtown Phoenix, Tempe/ASU, Scottsdale/Old Town, Glendale/Westgate, and Sky Harbor.
- Write natural, non-repetitive content.
- No markdown fences in output. JSON only.
`;

  const resp = await client.responses.create({
    model: "gpt-5",
    input: prompt,
  });

  const text = resp?.output_text;
  if (!text) throw new Error("No output_text returned from Responses API.");

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Model did not return valid JSON. First 600 chars:\n" + text.slice(0, 600));
  }

  if (!data?.meta?.title || !data?.meta?.description) {
    throw new Error("Post plan missing meta fields:\n" + JSON.stringify(data, null, 2));
  }

  return data;
}

async function writePostFiles({ slug, heroUrl, plan }) {
  const canonical = `${SITE_URL}/blog/${slug}`;
  const ogImageAbs = `${SITE_URL}${heroUrl}`;

  const postDir = path.join(BLOG_ROOT, slug);
  fs.mkdirSync(postDir, { recursive: true });

  // meta.json (in src/blog)
  writeJSON(path.join(postDir, "meta.json"), plan.meta);

  const h1 = plan.article.h1 || plan.meta.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: h1,
    description: plan.meta.description,
    author: { "@type": "Organization", name: "Ashmaig Auto Rentals", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Ashmaig Auto Rentals",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/android-chrome-512x512.png` },
    },
    image: ogImageAbs,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    inLanguage: "en-US",
    articleSection: "Rideshare & Delivery Tips",
    datePublished: plan.meta.date,
  };

  const sectionsJSX = (plan.article.sections || [])
    .map((s) => {
      const bullets = (s.bullets || [])
        .filter(Boolean)
        .map((b) => `<li>${escapeHTML(b)}</li>`)
        .join("\n");

      const paras = (s.paras || [])
        .filter(Boolean)
        .map((p) => `<p>${escapeHTML(p)}</p>`)
        .join("\n");

      return `
          <h2 id="${escapeHTML(s.id)}" className="text-2xl font-semibold mt-10 mb-4">
            ${escapeHTML(s.h2)}
          </h2>
          ${paras}
          ${bullets ? `<ul>\n${bullets}\n</ul>` : ""}
      `;
    })
    .join("\n");

  const page = `// src/blog/${slug}/page.tsx
import Link from "next/link";
import Image from "next/image";
import BookingBar from "@/components/BookingBar";

export const metadata = {
  title: "${escapeJS(`${plan.meta.title} | Ashmaig Auto Rentals`)}",
  description: "${escapeJS(plan.meta.description)}",
  alternates: { canonical: "${canonical}" },
  openGraph: {
    title: "${escapeJS(`${plan.meta.title} | Ashmaig Auto Rentals`)}",
    description: "${escapeJS(plan.meta.description)}",
    type: "article",
    url: "${canonical}",
    siteName: "Ashmaig Auto Rentals",
    images: [{ url: "${ogImageAbs}", width: 1200, height: 630, alt: "${escapeJS(plan.meta.title)}" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "${escapeJS(`${plan.meta.title} | Ashmaig Auto Rentals`)}",
    description: "${escapeJS(plan.meta.description)}",
    images: ["${ogImageAbs}"]
  }
};

export default function BlogPage() {
  const jsonLd = ${JSON.stringify(jsonLd, null, 2)};

  return (
    <main className="bg-white text-gray-900 dark:bg-slate-900 dark:text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li className="mx-1">/</li>
            <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
            <li className="mx-1">/</li>
            <li className="font-medium text-gray-700 dark:text-gray-200">
              ${escapeHTML(h1)}
            </li>
          </ol>
        </nav>

        <header className="mb-8">
          <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-2">
            ${escapeHTML(plan.article.kicker || "Rideshare & Delivery Tips")}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            ${escapeHTML(h1)}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>By Ashmaig Auto Rentals</span>
            <span>•</span>
            <span>${escapeHTML(plan.article.updatedLine || `Updated ${todayISO()}`)}</span>
          </div>
        </header>

        <div className="mb-10">
          <Image
            src="${heroUrl}"
            alt="${escapeJS(plan.meta.title)}"
            width={1200}
            height={630}
            className="w-full h-auto rounded-2xl border border-gray-200/70 dark:border-slate-700/70"
            priority
          />
        </div>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          ${sectionsJSX}

          <h2 className="text-2xl font-semibold mt-10 mb-4">
            ${escapeHTML(plan.article.finalCtaHeading || "Need a delivery-ready car in Phoenix?")}
          </h2>
          ${(plan.article.finalCtaParas || []).map((p) => `<p>${escapeHTML(p)}</p>`).join("\n")}

          <p>
            If you need a fuel-efficient, delivery-ready rental in Phoenix, check out{" "}
            <Link href="/" className="font-semibold text-blue-700 dark:text-blue-300 underline-offset-2 hover:underline">
              Ashmaig Auto Rentals
            </Link>.
          </p>
        </article>

        <section className="mt-12 sm:mt-16">
          <div className="rounded-2xl border border-blue-100 dark:border-blue-900 bg-blue-50/80 dark:bg-slate-800/80 p-6 sm:p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Apply for a Delivery-Ready Rental in Phoenix
            </h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-6">
              Call or text us — or apply through the form below.
            </p>

            <a
              href="tel:+16237772376"
              className="mb-6 inline-flex items-center justify-center w-full sm:w-auto rounded-xl px-6 py-3 text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              📞 Call Us: (623) 777-2376
            </a>

            <div className="mt-6 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold mb-3">Apply to get a car now</h4>
              <BookingBar />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
`;

  fs.writeFileSync(path.join(postDir, "page.tsx"), page, "utf8");
}

async function main() {
  const queuePath = path.join(process.cwd(), "scripts", "blog-topics.json");
  const queue = readJSON(queuePath);

  const topic = pickNextTopic(queue);
  if (!topic) {
    console.log("No unused topics left. Add more topics to scripts/blog-topics.json");
    process.exit(0);
  }

  const date = todayISO();
  const slugBase = slugify(topic);
  const hash = crypto.createHash("md5").update(topic).digest("hex").slice(0, 6);
  const slug = `${slugBase}-${hash}`;

  console.log("Topic:", topic);
  console.log("Slug:", slug);

  // ✅ Fallback hero logic so workflow never fails on image permissions
  let heroUrl = "/blog/default-hero.png";
  try {
    heroUrl = await generateHeroImage({ slug, title: topic });
  } catch (e) {
    console.warn("Image generation failed, using fallback:", e?.message || e);
  }

  const plan = await generatePostPlan({ topic, date });
  await writePostFiles({ slug, heroUrl, plan });

  writeJSON(queuePath, queue);

  console.log("Generated:");
  console.log(`- src/blog/${slug}/meta.json`);
  console.log(`- src/blog/${slug}/page.tsx`);
  console.log(`- public/blog/${slug}/hero.png (if image generation succeeded)`);
  console.log(`- hero used: ${heroUrl}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});