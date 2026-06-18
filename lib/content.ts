export type Seo = { title: string; description: string };

export const seo: Record<string, Seo> = {
  home: {
    title: "The Living Church | Entheogenic Church & Spiritual Community",
    description:
      "The Living Church is a San Francisco-based entheogenic church and spiritual community focused on education, connection, and sacred mushroom traditions."
  },
  membership: {
    title: "Become a Member | The Living Church",
    description:
      "Learn about membership, community benefits, educational resources, and participation opportunities at The Living Church."
  },
  dosage: {
    title: "Mushroom Dosage Guide | The Living Church",
    description:
      "Explore common mushroom dosage ranges from microdose to heroic dose with educational guidance from The Living Church."
  }
};

export const educationArticles = [
  {
    slug: "dosage-guide",
    title: "Mushroom Dosage Guide",
    excerpt:
      "Understand common dosage ranges and how different levels may influence experience.",
    body:
      "Dosage can play an important role in shaping an experience. This guide is educational in nature and should not be interpreted as medical advice."
  },
  {
    slug: "set-and-setting",
    title: "Set & Setting",
    excerpt: "Learn how preparation and environment can shape an experience.",
    body:
      "Set and setting describe the inner and outer conditions that shape an experience: mindset, intention, environment, support, and timing."
  },
  {
    slug: "integration",
    title: "Integration",
    excerpt:
      "Explore practices that help transform insight into lasting growth.",
    body:
      "Integration is the reflective work that follows a meaningful experience. Journaling, conversation, rest, and community support can help insights become part of daily life."
  },
  {
    slug: "sacred-mushroom-traditions",
    title: "Sacred Mushroom Traditions",
    excerpt:
      "Discover the history and cultural significance of sacred mushrooms.",
    body:
      "Sacred mushroom traditions have appeared across cultures in ceremonial, spiritual, and communal contexts. TLC approaches this topic with humility, respect, and a commitment to learning."
  },
  {
    slug: "what-is-an-entheogenic-church",
    title: "What Is an Entheogenic Church?",
    excerpt:
      "Understand the role of entheogenic churches and spiritual practice.",
    body:
      "An entheogenic church creates a spiritual and community framework for adults exploring consciousness, meaning, and sacred practice with education and intention at the center."
  }
];

export const dosageLevels = [
  {
    name: "Microdose",
    range: "0.1g-0.25g",
    description:
      "Subtle effects that may support presence, awareness, and day-to-day reflection without significantly altering perception."
  },
  {
    name: "Low Dose",
    range: "0.25g-0.75g",
    description:
      "Light perceptual and emotional shifts that may encourage curiosity, creativity, and introspection."
  },
  {
    name: "Museum Dose",
    range: "0.75g-2g",
    description:
      "A range often associated with heightened sensory awareness, appreciation, and connection while remaining engaged with the surrounding environment."
  },
  {
    name: "Moderate Dose",
    range: "2g-3.5g",
    description:
      "A deeper inward experience that may include emotional insight, expanded awareness, and meaningful personal reflection."
  },
  {
    name: "High Dose",
    range: "3.5g-5g",
    description:
      "A powerful experience often associated with profound shifts in perception, spiritual exploration, and deep introspection."
  },
  {
    name: "Heroic Dose",
    range: "5g+",
    description:
      "An intense and immersive experience that may include ego-transcendent or mystical states. This range is often approached with significant preparation, intention, and support."
  }
];

export const faqs = [
  {
    category: "Membership",
    question: "What is The Living Church?",
    answer:
      "The Living Church is a San Francisco-based entheogenic church and spiritual community centered around education, intentional practice, and sacred mushroom traditions."
  },
  {
    category: "Membership",
    question: "How do I become a member?",
    answer:
      "Begin by creating an account, completing membership registration, and following the Smartwaiver step. Staff may review membership status before member-only access is enabled."
  },
  {
    category: "Education",
    question: "What is set and setting?",
    answer:
      "Set and setting refer to mindset and environment. Preparation, intention, support, and surroundings can shape the quality of an experience."
  },
  {
    category: "Education",
    question: "What is integration?",
    answer:
      "Integration is the process of reflecting on an experience and translating insight into grounded life practice."
  },
  {
    category: "Sacraments",
    question: "What role do sacraments play within TLC?",
    answer:
      "Sacraments are one part of a broader framework of education, community, intentional practice, and spiritual exploration for adults 21 and older."
  }
];

export const sampleEvents = [
  {
    title: "Community Learning Circle",
    date: "First Thursday monthly",
    description:
      "A welcoming gathering for members and prospective members to learn, ask questions, and connect."
  },
  {
    title: "Integration Conversation",
    date: "Monthly",
    description:
      "A reflective community space focused on meaning-making, grounded practice, and peer support."
  }
];

export const sampleProducts = [
  {
    title: "Member Sacrament Resource",
    category: "Sacrament",
    available: true,
    description:
      "Member-only sacrament information is shown after active membership, waiver completion, and approval."
  },
  {
    title: "Community Support Materials",
    category: "Education",
    available: true,
    description:
      "Preparation and integration resources for active members."
  }
];
