export const siteConfig = {
  name: "The Living Church",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://thelivingchurchsf.com",
  description:
    "A San Francisco-based entheogenic church and spiritual community centered around education, connection, and sacred mushroom traditions.",
  nav: [
    { href: "/about", label: "About" },
    {
      href: "/education",
      label: "Education",
      children: [
        { href: "/education", label: "Education Overview" },
        { href: "/education/dosage-guide", label: "Dosage Guide" },
        { href: "/education/set-and-setting", label: "Set & Setting" },
        { href: "/education/integration", label: "Integration" },
        {
          href: "/education/sacred-mushroom-traditions",
          label: "Sacred Mushroom Traditions"
        },
        {
          href: "/education/what-is-an-entheogenic-church",
          label: "What Is an Entheogenic Church?"
        },
        { href: "/faq", label: "FAQ" },
        { href: "/blog", label: "Blog" }
      ]
    },
    {
      href: "/community",
      label: "Community",
      children: [
        { href: "/events#programs", label: "Gatherings" },
        { href: "/events#calendar", label: "Events" }
      ]
    },
    { href: "/membership", label: "Membership" },
    { href: "/menu", label: "Menu" },
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
