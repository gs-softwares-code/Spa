// ============================================================================
// Serein Spa & Wellness — catalog & domain data
// All copy is original template content. Placeholder contact details use the
// reserved example.com / (555) conventions and must be replaced by real data.
// No fabricated reviews, certifications, or medical claims are asserted.
// ============================================================================

export const site = {
  name: "Serein Spa & Wellness",
  shortName: "Serein",
  tagline: "Reconnect With Your Inner Calm",
  phone: "+1 (555) 000-0000",
  email: "hello@sereinspa.example",
  addressLine1: "12 Garden Mews",
  addressLine2: "Your City, State 00000",
  hours: "Mon – Sat · 9am – 7pm",
  instagram: "@sereinspa",
};

// ----------------------------------------------------------------------------
// Categories
// ----------------------------------------------------------------------------

export type Category = {
  slug: string;
  label: string;
  blurb: string;
  icon: string; // maps to an inline SVG glyph
};

export const categories: Category[] = [
  {
    slug: "massage",
    label: "Massage Therapy",
    blurb: "Slow, intentional touch that eases tension and quiets the mind.",
    icon: "hands",
  },
  {
    slug: "body",
    label: "Body Treatments",
    blurb: "Polish, wrap and ritual — nurture skin and restore a sense of renewal.",
    icon: "leaf",
  },
  {
    slug: "facial",
    label: "Facial & Skincare",
    blurb: "Tailored facials that respect your skin's natural rhythms.",
    icon: "droplet",
  },
  {
    slug: "wellness",
    label: "Wellness Experiences",
    blurb: "Immersive journeys designed for two — or for your whole self.",
    icon: "lotus",
  },
];

// ----------------------------------------------------------------------------
// Services
// ----------------------------------------------------------------------------

export type Service = {
  slug: string;
  name: string;
  category: string; // category slug
  tagline: string;
  overview: string;
  experience: string;
  durationMin: number;
  price: number;
  priceNote?: string;
  benefits: string[];
  suitability: string[];
  prep: string[];
};

export const services: Service[] = [
  // ---- Massage Therapy ----
  {
    slug: "swedish-massage",
    name: "Swedish Massage",
    category: "massage",
    tagline: "The classic rhythmic ritual of release",
    overview:
      "A flowing, full-body sequence of long strokes and gentle kneading that warms the muscles, improves circulation and leaves you deeply soothed.",
    experience:
      "Your therapist begins with slow, gliding strokes across the back and shoulders before moving to the limbs. The pressure is tailored to your comfort — communicate with your therapist throughout.",
    durationMin: 60,
    price: 120,
    benefits: [
      "Eases muscle tension and supports relaxation",
      "Supports healthy circulation",
      "Calms the nervous system",
    ],
    suitability: ["First-time guests", "Removing stress", "Gentle full-body release"],
    prep: [
      "Arrive 15 minutes early to change and settle in",
      "Avoid a heavy meal for 1–2 hours beforehand",
      "Drink water after your session",
    ],
  },
  {
    slug: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    category: "massage",
    tagline: "Firm, focused work for stubborn tension",
    overview:
      "Slower, more deliberate pressure targets the deeper layers of muscle and connective tissue, ideal for chronic tension and postural tightness.",
    experience:
      "Using forearms, elbows and knuckles, your therapist works methodically through areas of holding. It can be intense — a warm, fitted conversation about pressure keeps you comfortable.",
    durationMin: 90,
    price: 160,
    benefits: [
      "Targets deep muscular tension",
      "Improves range of motion",
      "Supports recovery from physical exertion",
    ],
    suitability: ["Chronic tension", "Active lifestyles", "Postural tightness"],
    prep: [
      "Let your therapist know about any injuries or sensitive areas",
      "Stay hydrated before and after",
      "Expect some soreness — this is normal for a day or two",
    ],
  },
  {
    slug: "aromatherapy-massage",
    name: "Aromatherapy Massage",
    category: "massage",
    tagline: "Fragrant oil, slow hands, quiet mind",
    overview:
      "Our signature essential-oil blends are chosen for mood and muscle, layered into a gentle, rhythmic massage that steadies the breath.",
    experience:
      "Begin with a personal scent consultation — calm lavender, uplifting sweet orange or grounding cedarwood. Your chosen blend is warmed and massaged into skin with unhurried strokes.",
    durationMin: 60,
    price: 135,
    benefits: [
      "Balances the senses through scent",
      "Promotes deep relaxation",
      "Leaves skin soft and fragrant",
    ],
    suitability: ["Stress relief", "Sleep support", "Aroma lovers"],
    prep: [
      "Mention any allergies or scent sensitivities when booking",
      "Avoid perfumes so the oils can be appreciated",
      "Drink water after your session",
    ],
  },
  {
    slug: "hot-stone-massage",
    name: "Hot Stone Massage",
    category: "massage",
    tagline: "Warm basalt stones melt tension away",
    overview:
      "Smooth, heated basalt stones rest on key points while hands glide warm oil over the body — a deep, comforting warmth that penetrates tight muscles.",
    experience:
      "Stones are pre-warmed to a soothing temperature. Your therapist uses them both as stationary weights and as a massage tool, moving heat slowly across the back, shoulders, legs and feet.",
    durationMin: 75,
    price: 150,
    benefits: [
      "Deep warmth eases muscle tension",
      "Encourages mental stillness",
      "Soothing for cold hands and feet",
    ],
    suitability: ["Deep relaxation seekers", "Mild muscle tightness", "Cold sensitivity"],
    prep: [
      "Notify us of any circulatory conditions or pregnancy",
      "Arrive warm — bring layers for your return",
      "Rest quietly afterwards to extend the warmth",
    ],
  },
  {
    slug: "relaxation-massage",
    name: "Relaxation Massage",
    category: "massage",
    tagline: "A gentle reset for the whole body",
    overview:
      "Feather-light, flowing strokes designed purely to switch off the mind and restore the body. The gentlest of our massage treatments.",
    experience:
      "A slow, melodic sequence with minimal pressure, ideal before or after travel, or whenever you simply need to decompress.",
    durationMin: 60,
    price: 110,
    benefits: [
      "Reduces stress and anxiety",
      "Promotes restful sleep",
      "Suitable for sensitive bodies",
    ],
    suitability: ["Everyone", "Gentle introduction", "Post-travel recovery"],
    prep: ["Undress to your comfort level", "Turn off your phone", "Breathe slowly throughout"],
  },
  {
    slug: "head-neck-shoulder",
    name: "Head, Neck & Shoulder Massage",
    category: "massage",
    tagline: "Focused release for desk-tired shoulders",
    overview:
      "A focused treatment for the areas where stress settles — scalp, jaw, neck and shoulders — performed seated, fully clothed.",
    experience:
      "You remain seated and dressed. Your therapist works the shoulders, upper back, neck and scalp with a blend of compression and kneading, often finishing with a gentle scalp massage.",
    durationMin: 30,
    price: 70,
    benefits: [
      "Quick, practical tension relief",
      "Eases screen-strain headaches",
      "Perfect for a lunch-break reset",
    ],
    suitability: ["Desk workers", "Travellers", "Quick appointments"],
    prep: ["Wear comfortable, loose clothing", "Inform us of neck/shoulder injuries"],
  },

  // ---- Body Treatments ----
  {
    slug: "body-scrubs",
    name: "Body Scrubs",
    category: "body",
    tagline: "Buff, brighten, renew",
    overview:
      "A full-body dry-brush ritual followed by an exfoliating sugar or salt scrub that sloughs away dullness and leaves skin silky.",
    experience:
      "Warm oil is applied first, then your chosen scrub is massaged in circular strokes from the feet upwards. Rinse in our rain shower and finish with a light moisturiser.",
    durationMin: 45,
    price: 95,
    benefits: [
      "Smooths and softens skin",
      "Stimulates circulation",
      "Prepares skin for absorption",
    ],
    suitability: ["Dull or dry skin", "Pre-glow preparation", "Any guest"],
    prep: ["Avoid shaving on the day", "Arrive with clean skin"],
  },
  {
    slug: "body-polishing",
    name: "Body Polishing",
    category: "body",
    tagline: "A luminous, lit-from-within finish",
    overview:
      "Our most indulgent skin treatment — micro-exfoliation with a nourishing botanical cream and a cooling aloe veil for an immediate sheen.",
    experience:
      "Fine-grained botanical particles polish the skin, followed by a whipped cream mask and a cool mist. Skin is left luminous and lightly scented.",
    durationMin: 45,
    price: 115,
    benefits: [
      "Immediate glow",
      "Long-lasting softness",
      "Hydrates as it exfoliates",
    ],
    suitability: ["Special occasions", "Photo-ready skin", "Dry, flaky areas"],
    prep: ["Avoid retinoids for 24 hours prior", "Drink water beforehand"],
  },
  {
    slug: "body-wraps",
    name: "Body Wraps",
    category: "body",
    tagline: "Sealed-in nourishment and calm",
    overview:
      "A rich mask is painted over the body, then you're cocooned in warm towels to allow active botanicals to penetrate while you rest.",
    experience:
      "Choose a hydrating sea-plant wrap, a detoxifying clay wrap, or a warming ginger wrap. After 20 minutes of quiet stillness, the wrap is removed and moisture locked in with oil.",
    durationMin: 60,
    price: 125,
    benefits: [
      "Deeply hydrates skin",
      "Feels weightless and cocooned",
      "Scent-driven relaxation",
    ],
    suitability: ["Dry skin", "De-stressing", "A slower pace"],
    prep: ["Let us know about any skin sensitivities", "Avoid eating just before"],
  },
  {
    slug: "detox-treatments",
    name: "Detox Treatments",
    category: "body",
    tagline: "A gentle, warming full-body reset",
    overview:
      "A combination of dry brushing, a warming lymphatic-style massage and a mineral-rich clay wrap, intended to support the body's natural rhythm of release.",
    experience:
      "We never promise medical results — this ritual simply feels profoundly clearing. Dry brushing precedes a light, upward-moving massage, followed by a clay wrap and steam rinse.",
    durationMin: 75,
    price: 140,
    benefits: [
      "Supports natural lymphatic flow",
      "Feels energising and clear",
      "Warms and relaxes",
    ],
    suitability: ["Feeling sluggish", "Detox-curious guests", "Post-festive reset"],
    prep: ["Stay well hydrated for 24 hours", "Avoid alcohol beforehand"],
  },
  {
    slug: "exfoliation-therapy",
    name: "Exfoliation Therapy",
    category: "body",
    tagline: "A full-body renewal ritual",
    overview:
      "A complete skin-renewal journey combining dry brushing, a grain scrub and a smoothing finish — tailored to your skin type.",
    experience:
      "Your therapist inspects your skin and selects the appropriate grain and pressure, moving methodically over the whole body with a focus on elbows, knees and heels.",
    durationMin: 50,
    price: 105,
    benefits: [
      "Renews the skin surface",
      "Improves texture",
      "Pairs well with any wrap or massage",
    ],
    suitability: ["Rough patches", "In-grown hair concerns", "Smoothing hands & feet"],
    prep: ["Arrive clean", "Avoid sunburned skin"],
  },

  // ---- Facial & Skincare ----
  {
    slug: "deep-cleansing-facial",
    name: "Deep Cleansing Facial",
    category: "facial",
    tagline: "Pure, luminous, clarified skin",
    overview:
      "A thorough cleanse, steam, gentle extraction and balancing mask that leaves congested skin feeling lighter and instantly clearer.",
    experience:
      "Your esthetician begins with a double-cleansing ritual, adds facial steam to soften, then performs careful extractions only where needed, finishing with a soothing mask and moisturiser.",
    durationMin: 60,
    price: 130,
    benefits: [
      "Clears congested pores",
      "Balances excess oil",
      "Instantly brighter complexion",
    ],
    suitability: ["Combination/oily skin", "Congestion", "Pre-event polish"],
    prep: ["Arrive with bare skin", "Avoid strong actives for 48 hours"],
  },
  {
    slug: "hydrating-facial",
    name: "Hydrating Facial",
    category: "facial",
    tagline: "Quench and plump",
    overview:
      "A deeply moisturising facial built around hyaluronic and botanical waters, ideal for dehydrated, dull or fine-lined skin.",
    experience:
      "A gentle cleanse is followed by layered hydrating serums, a cooling gel mask and a dewy finishing moisturiser. Your skin feels bouncy and elastic afterwards.",
    durationMin: 60,
    price: 135,
    benefits: [
      "Restores moisture balance",
      "Smooths fine dehydration lines",
      "Leaves a dewy glow",
    ],
    suitability: ["Dry/dehydrated skin", "Flying or air-conditioned lives", "All skin types"],
    prep: ["Avoid harsh exfoliants for 48 hours", "Drink water beforehand"],
  },
  {
    slug: "anti-aging-facial",
    name: "Anti-Aging Facial",
    category: "facial",
    tagline: "Support your skin's natural rhythm",
    overview:
      "A results-oriented facial using peptide-rich serums, gentle facial massage and LED light therapy to support firmness and radiance.",
    experience:
      "After cleansing, your esthetician performs a lymphatic facial massage, applies actives, and finishes with LED therapy to encourage cellular renewal. Claims are kept honest — we support, never promise.",
    durationMin: 75,
    price: 155,
    benefits: [
      "Supports firmness and elasticity",
      "Evens tone",
      "A relaxing, sculpting massage",
    ],
    suitability: ["Concerns about ageing", "Lack of glow", "Self-care investment"],
    prep: ["Disclose any active prescriptions", "Avoid retinol 72 hours prior"],
  },
  {
    slug: "rejuvenation-facial",
    name: "Rejuvenation Facial",
    category: "facial",
    tagline: "The full glow protocol",
    overview:
      "Our most comprehensive facial — exfoliation, targeted serums, sculpting massage and a brightening mask for an immediate, event-ready radiance.",
    experience:
      "Expect a multi-step journey: enzyme exfoliation, custom serum layering, a firming massage and a final cooling mask. You leave looking rested and frankly, glowing.",
    durationMin: 75,
    price: 165,
    benefits: [
      "Immediate radiance",
      "Firms and tones",
      "Feels indulgent and thorough",
    ],
    suitability: ["Pre-event glow", "Fine lines & dullness", "A thorough reset"],
    prep: ["Avoid sun exposure", "No strong acids for 48 hours"],
  },
  {
    slug: "customized-skin-treatments",
    name: "Customized Skin Treatments",
    category: "facial",
    tagline: "Built around your skin, not a script",
    overview:
      "Every skin is different. This consultation-led facial adapts products and techniques to what your skin needs on the day — no two are the same.",
    experience:
      "Your esthetician analyzes your skin, discusses your concerns and builds a bespoke sequence. It's the right choice when you're unsure where to begin.",
    durationMin: 60,
    price: 150,
    benefits: [
      "Truly personalized care",
      "Education about your skin",
      "Adaptable to sensitivity",
    ],
    suitability: ["Sensitive skin", "Uncertain starters", "Changing seasons"],
    prep: ["List your current skincare products", "Discuss any allergies"],
  },

  // ---- Wellness Experiences ----
  {
    slug: "couples-spa",
    name: "Couples Spa",
    category: "wellness",
    tagline: "Wellness, shared",
    overview:
      "Two side-by-side treatment beds, two therapists, one unhurried hour of shared calm. Choose from a menu of paired treatments.",
    experience:
      "Begin in the couples' lounge with herbal tea, then move to the private suite for your treatments. Choose matching massages or different ones — the suite allows for both.",
    durationMin: 120,
    price: 320,
    priceNote: "per couple",
    benefits: [
      "Shared downtime",
      "Private couples' suite",
      "Dedicated dual therapists",
    ],
    suitability: ["Couples", "Anniversaries", "Friends & family"],
    prep: ["Arrive together", "Mention any preferences for pressure"],
  },
  {
    slug: "relaxation-packages",
    name: "Relaxation Packages",
    category: "wellness",
    tagline: "A curated half-day of calm",
    overview:
      "A set sequence combining a massage, a facial express and a lounge ritual — packaged at a kindness to your wallet.",
    experience:
      "Flow effortlessly from one treatment to the next with lounge time and refreshments between. The exact sequence is outlined on booking.",
    durationMin: 180,
    price: 260,
    benefits: [
      "Greater value than separate bookings",
      "Guided, structured time",
      "Ideal for a first visit",
    ],
    suitability: ["First-timers", "Afternoon reset", "Gift recipients"],
    prep: ["Set aside the full 3 hours", "Arrive relaxed"],
  },
  {
    slug: "full-body-wellness-rituals",
    name: "Full Body Wellness Rituals",
    category: "wellness",
    tagline: "Head to toe, unhurried",
    overview:
      "The complete Serein experience — exfoliation, a wrap, and a full-body massage in one seamless ritual.",
    experience:
      "Your afternoon moves through scrub, wrap and massage with warm towels and quiet transitions. A beautiful rite of passage for a new chapter.",
    durationMin: 150,
    price: 220,
    benefits: [
      "Covers every need",
      "Seamless, worry-free flow",
      "Deeply restorative",
    ],
    suitability: ["Major self-care", "Milestone moments", "Weekend indulgence"],
    prep: ["Allow the full time", "Drink water between stages"],
  },
  {
    slug: "premium-spa-experiences",
    name: "Premium Spa Experiences",
    category: "wellness",
    tagline: "Half a day, fully yours",
    overview:
      "Our flagship half-day journey: private suite, three bespoke treatments, a light seasonal bite, and lounge privileges throughout.",
    experience:
      "You're assigned a personal host who guides your day. Choose your treatments ahead, or let us design the arc. The most unhurried way to spend an afternoon.",
    durationMin: 240,
    price: 380,
    benefits: [
      "Personal host and private suite",
      "Three tailored treatments",
      "Inclusive refreshments",
    ],
    suitability: ["Celebrations", "Deep reset", "Gifting indulgence"],
    prep: ["Arrive with time to spare", "Advise of dietary needs"],
  },
];

export const servicesByCategory = (catSlug: string) =>
  services.filter((s) => s.category === catSlug);

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

// ----------------------------------------------------------------------------
// Packages
// ----------------------------------------------------------------------------

export type SpaPackage = {
  slug: string;
  name: string;
  tagline: string;
  durationMin: number;
  price: number;
  priceNote?: string;
  includes: string[];
  featured?: boolean;
};

export const packages: SpaPackage[] = [
  {
    slug: "relaxation-package",
    name: "Relaxation Package",
    tagline: "The classic escape — a massage and facial express.",
    durationMin: 150,
    price: 230,
    includes: [
      "60-minute Swedish or Relaxation massage",
      "30-minute hydrating express facial",
      "Herbal tea ritual and lounge time",
    ],
  },
  {
    slug: "couple-retreat",
    name: "Couple Retreat",
    tagline: "A shared afternoon in the couples' suite.",
    durationMin: 120,
    price: 420,
    priceNote: "per couple",
    featured: true,
    includes: [
      "120-minute couples' massage",
      "Private couples' suite",
      "Sparkling refreshments and fruit platter",
    ],
  },
  {
    slug: "full-body-rejuvenation",
    name: "Full Body Rejuvenation",
    tagline: "Polish, wrap and massage — the complete ritual.",
    durationMin: 210,
    price: 320,
    includes: [
      "Full-body body polishing",
      "Hydrating body wrap",
      "60-minute deep tissue or Swedish massage",
    ],
  },
  {
    slug: "weekend-wellness",
    name: "Weekend Wellness",
    tagline: "Two days, four treatments, infinite calm.",
    durationMin: 240,
    price: 560,
    includes: [
      "Two treatments per day (choose from our menu)",
      "Lounge access on both days",
      "Healthy light bites and teas",
    ],
  },
  {
    slug: "luxury-spa-experience",
    name: "Luxury Spa Experience",
    tagline: "Our half-day showcase in a private suite.",
    durationMin: 300,
    price: 720,
    includes: [
      "Three bespoke treatments",
      "Private suite with personal host",
      "Seasonal lunch served in-suite",
    ],
  },
  {
    slug: "customized-wellness-package",
    name: "Customized Wellness Package",
    tagline: "Build your own day around your needs.",
    durationMin: 90,
    price: 180,
    priceNote: "from",
    includes: [
      "Choose any treatments to combine",
      "Modular pricing from the menu",
      "We'll sequence it for you",
    ],
  },
];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);

// ----------------------------------------------------------------------------
// Therapists
// ----------------------------------------------------------------------------

export type Therapist = {
  id: string;
  name: string;
  specializations: string[];
  experienceYears: number;
  languages: string[];
  bio: string;
  tone: string; // gradient tone key for placeholder art
};

export const therapists: Therapist[] = [
  {
    id: "amara-jensen",
    name: "Amara Jensen",
    specializations: ["Swedish Massage", "Deep Tissue", "Couples Rituals"],
    experienceYears: 12,
    languages: ["English", "Danish"],
    bio: "Amara is our lead massage therapist, known for an intuitive reading of the body and a calm, unhurried presence.",
    tone: "sage",
  },
  {
    id: "sofia-marchetti",
    name: "Sofia Marchetti",
    specializations: ["Hot Stone", "Aromatherapy", "Body Scrubs"],
    experienceYears: 9,
    languages: ["English", "Italian"],
    bio: "Sofia trained in the Italian tradition of thermal wellness and brings warmth and precision to every treatment.",
    tone: "sand",
  },
  {
    id: "daniel-okafor",
    name: "Daniel Okafor",
    specializations: ["Deep Tissue", "Sports Recovery", "Head, Neck & Shoulders"],
    experienceYears: 10,
    languages: ["English", "Igbo"],
    bio: "Daniel specializes in focused, rehabilitative work for active bodies, combining firm pressure with careful listening.",
    tone: "earth",
  },
  {
    id: "lena-novak",
    name: "Lena Novak",
    specializations: ["Facial & Skincare", "Customized Treatments", "Exfoliation"],
    experienceYears: 8,
    languages: ["English", "Czech", "German"],
    bio: "Lena is our lead esthetician, obsessed with reading skin type and tailoring each facial to the season and the day.",
    tone: "ivory",
  },
  {
    id: "priya-raman",
    name: "Priya Raman",
    specializations: ["Body Wraps", "Detox Rituals", "Relaxation Massage"],
    experienceYears: 11,
    languages: ["English", "Tamil", "Hindi"],
    bio: "Priya blends botanical traditions with modern technique, creating treatments that feel both grounding and weightless.",
    tone: "gold",
  },
];

export const getTherapist = (id: string) => therapists.find((t) => t.id === id);

// ----------------------------------------------------------------------------
// Facilities
// ----------------------------------------------------------------------------

export type Facility = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export const facilities: Facility[] = [
  {
    slug: "private-treatment-rooms",
    name: "Private Treatment Rooms",
    description: "Softly lit, sound-proofed rooms with heated beds, where therapies unfold in complete privacy.",
    icon: "door",
  },
  {
    slug: "couples-suites",
    name: "Couples' Suites",
    description: "Side-by-side beds and shared lounge space for treatments designed for two.",
    icon: "heart",
  },
  {
    slug: "relaxation-lounges",
    name: "Relaxation Lounges",
    description: "Quiet nooks with herbal teas and warm blankets to extend your calm before and after.",
    icon: "lounge",
  },
  {
    slug: "steam-rooms",
    name: "Steam Rooms",
    description: "Gentle, humid warmth that softens muscles and opens the breath.",
    icon: "steam",
  },
  {
    slug: "sauna",
    name: "Sauna",
    description: "A dry, cedar-lined heat retreat for deep warmth and stillness.",
    icon: "flame",
  },
  {
    slug: "shower-facilities",
    name: "Rain Shower Facilities",
    description: "Walk-in rain showers with botanical body washes for rinsing between treatments.",
    icon: "droplet",
  },
  {
    slug: "reception-waiting",
    name: "Reception & Waiting",
    description: "A calm, natural-light arrival space where your journey begins.",
    icon: "bell",
  },
  {
    slug: "wellness-amenities",
    name: "Wellness Amenities",
    description: "Complimentary tea lounge, quiet reading corners, and post-treatment hydration.",
    icon: "leaf",
  },
];

// ----------------------------------------------------------------------------
// Offers / promotions
// ----------------------------------------------------------------------------

export type Offer = {
  slug: string;
  title: string;
  body: string;
  cta: string;
  image?: string;
  featured?: boolean;
};

export const offers: Offer[] = [
  {
    slug: "first-visit-welcome",
    title: "First Visit Welcome",
    body: "10% off your first treatment, plus a complimentary tea ritual. A gentle introduction to Serein.",
    cta: "Book your visit",
    image: "/images/tea-ritual.jpg",
    featured: true,
  },
  {
    slug: "midweek-repeat",
    title: "Midweek Reset",
    body: "Book Tuesday–Thursday and receive 15% off any single massage treatment.",
    cta: "Claim the offer",
    image: "/images/reset.jpg",
  },
  {
    slug: "gift-voucher",
    title: "Gift Vouchers",
    body: "Give the gift of calm — digital vouchers for any treatment or package, delivered instantly.",
    cta: "Give a voucher",
    image: "/images/gift.jpg",
  },
];

// ----------------------------------------------------------------------------
// Testimonials — PLACEHOLDERS
// These are sample placeholders, not verified customer reviews. Replace with
// real, verified guest feedback before public launch (see README).
// ----------------------------------------------------------------------------

export const testimonials = [
  {
    quote:
      "An hour here recalibrates my whole week. The room, the silence, the care — it all just slows you down.",
    attribution: "Sample placeholder — replace with a verified guest review.",
  },
  {
    quote:
      "I came in tense from months of travel and left feeling like myself again. The deep tissue work was exceptional.",
    attribution: "Sample placeholder — replace with a verified guest review.",
  },
  {
    quote:
      "The couples' suite made our anniversary feel genuinely special. Thoughtful, quiet, and beautifully paced.",
    attribution: "Sample placeholder — replace with a verified guest review.",
  },
];

// ----------------------------------------------------------------------------
// Gallery placeholders (self-contained abstract art, not real photography)
// ----------------------------------------------------------------------------

export const galleryItems = [
  { tone: "sage", label: "The lounge", image: "/images/lounge.jpg" },
  { tone: "sand", label: "Treatment room", image: "/images/massage.jpg" },
  { tone: "gold", label: "Couples' suite", image: "/images/suite.jpg" },
  { tone: "ivory", label: "Steam room", image: "/images/steam.jpg" },
  { tone: "earth", label: "The sauna", image: "/images/sauna.jpg" },
  { tone: "sage", label: "Welcome space", image: "/images/welcome.jpg" },
];

// ----------------------------------------------------------------------------
// Hours & policy
// ----------------------------------------------------------------------------

export const bookingPolicy = {
  depositPercent: 20,
  cancelNoticeHours: 24,
  rescheduleNoticeHours: 12,
  slotStepMin: 60,
  slotStart: "09:00",
  slotEnd: "18:00",
};

// ----------------------------------------------------------------------------
// Slot & availability helpers
// ----------------------------------------------------------------------------

export type Appointment = {
  id: string;
  ref: string;
  serviceSlug?: string;
  packageSlug?: string;
  therapistId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  durationMin: number;
  guest: { name: string; email: string; phone: string };
  specialRequests?: string;
  status: "pending" | "confirmed" | "cancelled";
  depositPaid: boolean;
  createdAt: string;
};

export type Slot = { time: string; available: boolean };

/** Generate the list of possible start times for a chosen date. */
export function daySlots(): string[] {
  const out: string[] = [];
  const [sh, sm] = bookingPolicy.slotStart.split(":").map(Number);
  const [eh] = bookingPolicy.slotEnd.split(":").map(Number);
  const startMinutes = sh * 60 + sm;
  const endMinutes = eh * 60;
  for (let m = startMinutes; m <= endMinutes - bookingPolicy.slotStepMin; m += bookingPolicy.slotStepMin) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    out.push(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
  }
  return out;
}

/** True if a new booking would collide with existing ones (double-booking). */
export function isSlotFree(
  appointments: Appointment[],
  date: string,
  startTime: string,
  durationMin: number,
  therapistId: string,
  ignoreId?: string
): boolean {
  const start = toMinutes(startTime);
  const end = start + durationMin;
  return !appointments.some((a) => {
    if (a.id === ignoreId) return false;
    if (a.status === "cancelled") return false;
    if ((a.date !== date) || a.therapistId !== therapistId) return false;
    const aStart = toMinutes(a.startTime);
    const aEnd = aStart + a.durationMin;
    return start < aEnd && end > aStart; // overlap
  });
}

export function slotsForDay(appointments: Appointment[], date: string, therapistId: string, durationMin: number): Slot[] {
  return daySlots().map((time) => ({
    time,
    available: isSlotFree(appointments, date, time, durationMin, therapistId),
  }));
}

export function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function todayISO(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function addDaysISO(iso: string, days: number): string {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function formatDatePretty(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export function formatPrice(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

export function makeRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "SER-";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export function makeId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
