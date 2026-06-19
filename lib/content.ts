export type Seo = { title: string; description: string };

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  body: {
    heading?: string;
    paragraphs: string[];
  }[];
};

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

export const blogCategories = [
  "Education",
  "Community",
  "Spiritual Practice",
  "Events",
  "Preparation",
  "Integration"
];

export const blogPosts: BlogPost[] = [
  {
    title: "How Sound Bath Healing Works",
    slug: "how-sound-bath-healing-works",
    date: "2026-06-18",
    category: "Spiritual Practice",
    excerpt:
      "A grounded introduction to sound baths, why they can feel restorative, and how TLC thinks about listening as part of spiritual practice.",
    imageSrc: "/images/tlc/event-space-02.jpg",
    imageAlt:
      "A calm gathering space inside The Living Church prepared for group practice",
    body: [
      {
        paragraphs: [
          "A sound bath is a guided listening experience. Participants usually rest or sit quietly while tones, resonance, and rhythm move through the room. The practice is simple on the surface, but it can create a meaningful container for slowing down, noticing the body, and returning attention to the present moment.",
          "At TLC, sound-based practices are understood as part of a broader rhythm of preparation, reflection, and community care. They are not treated as a cure or a performance. They are a way to help people become more available to stillness, intention, and inner listening."
        ]
      },
      {
        heading: "Why sound can feel supportive",
        paragraphs: [
          "Sustained tones can give the mind something gentle to follow. Rather than trying to force quiet, participants can let attention rest on vibration, breath, and the shared atmosphere of the room. For some people, that makes it easier to soften ordinary mental noise and notice what is present.",
          "The experience varies from person to person. Some people feel relaxed, some feel emotional, and some simply appreciate a structured pause. TLC encourages members and visitors to approach the practice with curiosity rather than expectation."
        ]
      },
      {
        heading: "How to prepare",
        paragraphs: [
          "Arrive with enough time to settle. Wear comfortable clothing, silence your phone, and choose a simple intention such as listening, resting, or becoming more grounded. If discomfort or distraction appears, it can be met as part of the practice rather than a sign that anything has gone wrong.",
          "Afterward, integration can be as simple as drinking water, writing down a few impressions, or having a grounded conversation. The value of the practice often continues in the quiet attention people bring back into ordinary life."
        ]
      }
    ]
  },
  {
    title: "What Is a Spiritual Practice?",
    slug: "what-is-a-spiritual-practice",
    date: "2026-06-18",
    category: "Education",
    excerpt:
      "Spiritual practice is less about special language and more about repeated ways of paying attention, making meaning, and living with care.",
    imageSrc: "/images/tlc/chapel-pew.jpg",
    imageAlt: "Chapel seating inside The Living Church",
    body: [
      {
        paragraphs: [
          "A spiritual practice is a repeated way of turning attention toward what matters. It may involve prayer, meditation, service, study, movement, music, time in community, or quiet reflection. The form can vary, but the heart of practice is consistency, sincerity, and a willingness to be shaped over time.",
          "At TLC, spiritual practice is not presented as something reserved for experts. It is a grounded path for adults who want to approach sacred mushroom traditions, community life, and personal growth with more care."
        ]
      },
      {
        heading: "Practice creates a container",
        paragraphs: [
          "A container helps experience become meaningful instead of scattered. Intention before an experience, respectful participation during it, and integration afterward are all forms of practice. They help connect insight to responsibility, relationship, and daily life.",
          "This is why TLC places education before access. Shared language and preparation give members a clearer way to understand what they are entering and how to return from it thoughtfully."
        ]
      },
      {
        heading: "Simple ways to begin",
        paragraphs: [
          "Start small. Read one education article, attend a gathering, write down a question, spend a few minutes in quiet, or speak honestly with a trusted person. A practice does not need to be dramatic to be real.",
          "Over time, these small acts can build steadiness. They help members approach participation not as a transaction, but as part of an ongoing spiritual and community path."
        ]
      }
    ]
  }
];

export const dosageLevels = [
  {
    name: "Microdose",
    range: "0.1–0.25g",
    description:
      "Subtle effects that may support presence, awareness, and day-to-day reflection without significantly altering perception."
  },
  {
    name: "Low Dose",
    range: "0.25–0.75g",
    description:
      "Light perceptual and emotional shifts that may encourage curiosity, creativity, and introspection."
  },
  {
    name: "Museum Dose",
    range: "0.75–2g",
    description:
      "A range often associated with heightened sensory awareness, appreciation, and connection while remaining engaged with the surrounding environment."
  },
  {
    name: "Moderate Dose",
    range: "2–3.5g",
    description:
      "A deeper inward experience that may include emotional insight, expanded awareness, and meaningful personal reflection."
  },
  {
    name: "High Dose",
    range: "3.5–5g",
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

export const faqCategories = [
  "Membership",
  "Sacraments",
  "Dosage",
  "Set & Setting",
  "Integration",
  "Community",
  "Store Access",
  "Login & Technical Help",
  "Legal"
];

export const faqs = [
  {
    category: "Membership",
    question: "What is The Living Church?",
    answer:
      "The Living Church is a San Francisco-based entheogenic church and spiritual community centered around education, intentional practice, community care, and sacred mushroom traditions."
  },
  {
    category: "Membership",
    question: "How do I become a member?",
    answer:
      "Begin by creating an account, completing the membership registration, and signing the digital waiver. Once your completed waiver is matched to your account, member-only resources and the sacrament menu can be accessed."
  },
  {
    category: "Membership",
    question: "Who can join?",
    answer:
      "Membership is intended for adults 21 and older who are interested in TLC's educational, spiritual, and community-centered approach. New visitors do not need prior experience to begin learning."
  },
  {
    category: "Membership",
    question: "Do I need prior experience?",
    answer:
      "No. Many people arrive with questions, curiosity, or a desire for a more grounded setting. TLC encourages learning before participation so members can move at a thoughtful pace."
  },
  {
    category: "Membership",
    question: "How long does activation take?",
    answer:
      "Membership usually updates after your account and completed waiver are matched. If something appears delayed, contact TLC so staff can help check your status."
  },
  {
    category: "Legal",
    question: "What is an entheogenic church?",
    answer:
      "An entheogenic church is a spiritual community that places sacred plant or mushroom traditions within a religious, educational, and community framework. TLC approaches this work with care, humility, and clear boundaries."
  },
  {
    category: "Legal",
    question: "Is TLC giving legal advice?",
    answer:
      "No. TLC provides educational and community information, not legal advice. Members with legal questions should consult a qualified attorney familiar with their circumstances."
  },
  {
    category: "Legal",
    question: "Does membership guarantee legal protection?",
    answer:
      "No. TLC does not promise legal outcomes or individual protection. Membership creates a church and community pathway, but laws and personal circumstances can be complex."
  },
  {
    category: "Legal",
    question: "Why is the waiver required?",
    answer:
      "The waiver helps TLC document that members understand important boundaries, responsibilities, and acknowledgments before accessing member-only areas. It is part of creating a clearer and more accountable process."
  },
  {
    category: "Legal",
    question: "Is TLC a medical provider?",
    answer:
      "No. TLC is not a medical provider and does not offer medical diagnosis, treatment, or clinical services. Educational content should not be treated as medical advice."
  },
  {
    category: "Sacraments",
    question: "What are sacred mushrooms?",
    answer:
      "Sacred mushrooms are mushrooms containing naturally occurring entheogenic compounds that have been approached in ceremonial, spiritual, and communal contexts. TLC discusses them with respect for tradition, responsibility, and education."
  },
  {
    category: "Sacraments",
    question: "What role do sacraments play within TLC?",
    answer:
      "Sacraments are one part of a broader framework of education, community, intentional practice, preparation, and integration for adults 21 and older."
  },
  {
    category: "Sacraments",
    question: "Why is the menu member-only?",
    answer:
      "The menu is limited to active members because TLC treats sacramental access as part of a structured church pathway, not a retail-first experience. Membership registration and waiver completion come first."
  },
  {
    category: "Sacraments",
    question: "Can visitors access sacraments without joining?",
    answer:
      "No. TLC's sacrament menu is for active members only. Visitors and prospective members are encouraged to begin with public education, membership information, and community events."
  },
  {
    category: "Sacraments",
    question: "How should I approach sacramental participation?",
    answer:
      "TLC encourages adults to approach participation with intention, preparation, humility, and a plan for integration. The emphasis is on spiritual practice and community context rather than novelty or recreation."
  },
  {
    category: "Dosage",
    question: "What is the dosage guide for?",
    answer:
      "The dosage guide offers educational context around commonly discussed ranges. It is not a recommendation, prescription, or guarantee of how any person will feel."
  },
  {
    category: "Dosage",
    question: "What is a microdose?",
    answer:
      "A microdose is commonly discussed as a very small amount, often around 0.1–0.25g. Effects can vary, and TLC frames dosage as only one part of a larger preparation and integration process."
  },
  {
    category: "Dosage",
    question: "What is a museum dose?",
    answer:
      "A museum dose is often described as a range that may bring noticeable shifts while a person remains engaged with their surroundings. TLC presents this as educational language, not a directive."
  },
  {
    category: "Dosage",
    question: "Why can the same dose feel different for different people?",
    answer:
      "Individual sensitivity, mushroom potency, mindset, environment, preparation, and timing can all shape the experience. A number alone cannot fully predict what will happen."
  },
  {
    category: "Dosage",
    question: "Does TLC provide medical dosage advice?",
    answer:
      "No. TLC does not provide medical advice or individualized dosing instructions. Educational materials are meant to support informed questions, careful preparation, and responsible decision-making."
  },
  {
    category: "Set & Setting",
    question: "What is set and setting?",
    answer:
      "Set and setting refer to the inner and outer conditions surrounding an experience. Set includes mindset, intention, and emotional state. Setting includes environment, people, timing, and support."
  },
  {
    category: "Set & Setting",
    question: "Why does environment matter?",
    answer:
      "Environment can influence whether an experience feels grounded, spacious, private, or overwhelming. Sound, light, comfort, trusted support, and interruptions can all make a difference."
  },
  {
    category: "Set & Setting",
    question: "How do I prepare my mindset?",
    answer:
      "A simple intention, quiet time beforehand, honest self-checking, and realistic expectations can help create a steadier foundation. Preparation is not about controlling the experience; it is about entering with care."
  },
  {
    category: "Set & Setting",
    question: "Should I participate alone?",
    answer:
      "TLC encourages people to think carefully about support, context, and safety. Trusted community, preparation, and a grounded environment can be important parts of responsible participation."
  },
  {
    category: "Set & Setting",
    question: "What if I feel uncertain or nervous?",
    answer:
      "Uncertainty is worth listening to. It may be a sign to slow down, ask questions, attend an educational event, or spend more time preparing before taking any next step."
  },
  {
    category: "Integration",
    question: "What is integration?",
    answer:
      "Integration is the process of reflecting on an experience and translating insight into grounded daily life. It can include journaling, conversation, rest, community support, and practical changes."
  },
  {
    category: "Integration",
    question: "Why does integration matter?",
    answer:
      "Experiences can bring up feelings, questions, or insights that continue unfolding afterward. Integration helps people make meaning patiently instead of rushing to conclusions."
  },
  {
    category: "Integration",
    question: "What are simple integration practices?",
    answer:
      "Gentle reflection, writing notes, taking a walk, speaking with a trusted person, resting, and returning to ordinary responsibilities can all support integration."
  },
  {
    category: "Integration",
    question: "Can integration happen in community?",
    answer:
      "Yes. Many people find that respectful conversation and shared language help them stay grounded. TLC's community context is intended to support reflection without pressure."
  },
  {
    category: "Integration",
    question: "What if an experience feels difficult afterward?",
    answer:
      "Give yourself time, seek trusted support, and avoid making major meaning too quickly. If you are concerned about your wellbeing, contact an appropriate health professional or support resource."
  },
  {
    category: "Community",
    question: "Are there events or services?",
    answer:
      "Yes. TLC may offer community learning circles, educational gatherings, integration conversations, and member-oriented services. Event details can change, so check the Events page for current information."
  },
  {
    category: "Community",
    question: "Who joins the TLC community?",
    answer:
      "Members include adults who are curious, experienced, returning after time away, or simply looking for a more intentional and respectful setting. The common thread is a desire to learn and participate thoughtfully."
  },
  {
    category: "Community",
    question: "Can I attend before becoming a member?",
    answer:
      "Some public information and events may be available to prospective members. Member-only resources and sacrament access require account creation, registration, waiver completion, and active member status."
  },
  {
    category: "Community",
    question: "What is expected of members?",
    answer:
      "Members are expected to approach the community respectfully, follow TLC's process, honor boundaries, and engage with education, preparation, and integration as part of participation."
  },
  {
    category: "Community",
    question: "Is TLC only for people with spiritual experience?",
    answer:
      "No. People arrive with different backgrounds and language. TLC uses a grounded, welcoming approach so adults can learn without needing to already know the culture or vocabulary."
  },
  {
    category: "Store Access",
    question: "How do I access the sacrament menu?",
    answer:
      "Create an account, complete membership registration, and sign the digital waiver. Once your membership is active, you can log in and view the member-only menu."
  },
  {
    category: "Store Access",
    question: "How do store staff verify my membership?",
    answer:
      "Your membership status helps staff confirm access to member resources and the sacrament menu. Use the same email address for your TLC account and waiver so your status is easy to confirm."
  },
  {
    category: "Store Access",
    question: "What if I already signed the waiver?",
    answer:
      "If you already completed the waiver, make sure your account and registration use the same identifying information where possible. If your status still does not look right, contact TLC for help matching your records."
  },
  {
    category: "Store Access",
    question: "Can I view the menu before my membership is active?",
    answer:
      "No. The sacrament menu is reserved for active members. Prospective members can still explore public education pages and membership information while completing the membership process."
  },
  {
    category: "Store Access",
    question: "Why does the process have multiple steps?",
    answer:
      "The steps help TLC keep sacramental access connected to membership, education, and waiver completion. The goal is clarity and responsibility, not unnecessary friction."
  },
  {
    category: "Login & Technical Help",
    question: "Who do I contact if I need help logging in?",
    answer:
      "Contact TLC directly through the contact information provided by the church or ask staff for help. Include the email address you used to register so they can look up your account more easily."
  },
  {
    category: "Login & Technical Help",
    question: "What should I do if my login works but I cannot see the menu?",
    answer:
      "Your membership may still be pending, your waiver may not be matched, or staff may still need to approve your account. Check your account status first, then contact TLC if anything looks incorrect."
  },
  {
    category: "Login & Technical Help",
    question: "What if I used the wrong email address?",
    answer:
      "If you registered or signed the waiver with a different email address, contact TLC so staff can help connect your records. Using consistent information makes activation smoother."
  },
  {
    category: "Login & Technical Help",
    question: "Can staff reset my password?",
    answer:
      "For security, password recovery is usually handled through the login system's reset process. Staff can help point you to the right place if you are unsure where to start."
  },
  {
    category: "Login & Technical Help",
    question: "Why does my account still say pending?",
    answer:
      "Pending usually means one or more membership steps still need to be completed or connected. Confirm that registration and waiver steps are complete, then contact TLC if the status does not update."
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
      "Member-only sacrament information is shown after membership registration and waiver completion are connected."
  },
  {
    title: "Community Support Materials",
    category: "Education",
    available: true,
    description:
      "Preparation and integration resources for active members."
  }
];
