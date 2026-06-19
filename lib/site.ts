export const siteConfig = {
  name: "The Living Church",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://thelivingchurchsf.com",
  description:
    "A San Francisco-based entheogenic church and spiritual community centered around education, connection, and sacred mushroom traditions.",
  nav: [
    { href: "/about", label: "About" },
    { href: "/menu", label: "Menu" },
    { href: "/education", label: "Education" },
    { href: "/membership", label: "Membership" },
    { href: "/community", label: "Community" },
    { href: "/blog", label: "Blog" },
    { href: "/events", label: "Events" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" }
  ],
  memberNav: [
    { href: "/menu", label: "Menu" },
    { href: "/member-resources", label: "Resources" },
    { href: "/member-community", label: "Community" },
    { href: "/account", label: "Account" }
  ],
  organizationSchema: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Living Church",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://thelivingchurchsf.com",
    description:
      "A San Francisco-based entheogenic church and spiritual community focused on education, connection, and sacred mushroom traditions.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1081 Post St.",
      postalCode: "94109",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US"
    }
  }
};
