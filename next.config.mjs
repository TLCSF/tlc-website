const soundBathBlogSlugs = [
  "the-connection-between-sound-bathing-and-stress-relief",
  "the-healing-frequencies-used-in-sound-bath-meditation-and-how-they-work",
  "comparing-sound-baths-vs-meditation-which-is-right-for-you",
  "understanding-sound-bath-benefits",
  "what-is-a-sound-bath",
  "understanding-the-benefits-of-sound-baths",
  "top-sound-bath-benefits-for-stress-relief-and-mental-clarity"
];

const generalLegacyBlogSlugs = [
  "how-effective-is-meditation-for-stress",
  "best-breathwork-techniques-for-beginners",
  "benefits-of-praying",
  "what-is-spiritual-growth",
  "top-meditation-techniques-for-beginners",
  "why-you-need-a-meditation-guide",
  "benefits-of-spiritual-practices",
  "how-does-daily-prayer-impact-mental-health",
  "what-are-the-different-types-of-mindful-meditation",
  "yoga-classes-which-are-best-for-beginners",
  "spiritual-help-what-is-it-and-why-its-beneficial",
  "understanding-the-meaning-behind-spiritual-fasting",
  "meditation-for-beginners-a-guide",
  "where-to-begin-on-your-spiritual-healing-journey",
  "understanding-the-benefits-of-meditation",
  "what-spiritual-energy-is-and-how-it-affects-daily-life",
  "how-meditation-reduces-stress-and-supports-emotional-resilience",
  "spiritual-wellness-for-beginners-a-practical-guide-to-getting-started",
  "the-connection-between-spiritual-health-and-emotional-well-being",
  "the-philosophy-behind-yoga-more-than-just-stretching",
  "why-mindfulness-and-meditation-are-essential-for-a-balanced-life",
  "the-role-of-spirituality-in-finding-inner-peace-and-purpose",
  "how-various-forms-of-meditation-impact-mental-and-physical-health",
  "how-do-you-meditate",
  "the-science-behind-breathwork-and-its-effects-on-the-body",
  "daily-practices-to-strengthen-your-spiritual-health-and-wellness",
  "the-most-popular-types-of-meditation",
  "what-is-a-tea-ceremony",
  "the-role-of-breathwork-and-movement-in-modern-spiritual-practice",
  "which-type-of-yoga-is-right-for-you",
  "what-is-meditation",
  "how-spiritual-guidance-can-support-mental-and-emotional-wellness"
];

const redirect = (source, destination) => ({
  source,
  destination,
  permanent: true
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  },
  async redirects() {
    return [
      redirect("/about-us", "/about"),
      redirect("/church-services", "/community"),
      redirect("/spiritual-practices", "/education"),
      redirect("/volunteer-exchange", "/community"),
      redirect("/sacrament-products", "/menu"),
      redirect("/sacrament-journeys", "/education/set-and-setting"),
      redirect(
        "/about-the-sacrament",
        "/education/what-is-an-entheogenic-church"
      ),
      redirect("/sacrament-options", "/menu"),
      redirect("/become-a-member", "/membership"),
      redirect("/waiver", "/register"),
      redirect("/profile", "/account"),
      redirect("/password-reset", "/forgot-password"),
      redirect("/thank-you", "/"),
      redirect("/vallejo", "/service-areas"),
      redirect("/service-areas/:city", "/service-areas"),
      redirect("/events/category/:path*", "/events"),
      redirect("/events/:slug", "/events"),
      redirect("/blog/category/:path*", "/blog"),
      ...soundBathBlogSlugs.map((slug) =>
        redirect(`/blog/${slug}`, "/blog/how-sound-bath-healing-works")
      ),
      ...generalLegacyBlogSlugs.map((slug) =>
        redirect(`/blog/${slug}`, "/blog")
      ),
      {
        source: "/wp-login.php",
        has: [{ type: "query", key: "action", value: "lostpassword" }],
        destination: "/forgot-password",
        permanent: true
      },
      redirect("/wp-login.php", "/login"),
      redirect("/wp-sitemap.xml", "/sitemap.xml"),
      redirect("/:kind(page|post|category|tribe_events|post-archive)-sitemap.xml", "/sitemap.xml")
    ];
  }
};

export default nextConfig;
