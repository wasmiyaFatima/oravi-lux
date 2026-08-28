const fs = require("fs");

const shared = {
  cta: "Start with a confidential consultation",
  ctaTitle: "Start with a confidential consultation",
  ctaBody: "Tell us what you need. We will coordinate the rest.",
  introEyebrow: "Overview",
  pointsTitle: "What we handle",
  forWhomEyebrow: "Who it is for",
  approachEyebrow: "How we work",
  approachTitle: "A clear method for bespoke service",
  approachBody:
    "Simple, confidential and accountable from the first conversation to ongoing support. One dedicated contact leads coordination, partner management and quality follow-up.",
  approachSteps: [
    "Consultation — A confidential first conversation to understand what you need.",
    "Needs assessment and personalised solution — We clarify priorities and shape tailored support.",
    "Execution and ongoing support — We deliver with care and remain available as needs continue.",
  ],
};

function svc(fields) {
  return { ...shared, ...fields };
}

const services = {
  concierge: svc({
    nav: "Concierge",
    title: "Our Concierge Services",
    subtitle: "Everyday requests. Exceptional execution.",
    body: "From personal assistance to VIP arrangements, our service adapts to your lifestyle and standards — everyday requests handled with exceptional care and execution.",
    points: [
      "Personal assistance",
      "Lifestyle management",
      "VIP arrangements",
      "Reservation services",
      "Luxury shopping assistance",
    ],
    benefit: "",
    eyebrow: "Concierge services",
    introTitle: "Everyday requests. Exceptional execution.",
    forWhomTitle: "Clients who expect every detail to be handled with care",
    forWhomBody:
      "For those who need personal assistance, lifestyle management, VIP arrangements, reservation services and luxury shopping assistance — adapted to their lifestyle and standards.",
  }),
  "corporate-concierge": svc({
    nav: "Corporate Concierge",
    title: "Corporate Concierge Services",
    subtitle: "Executive productivity without operational friction",
    body: "We support leadership teams, visiting clients and corporate guests with discreet, precise coordination — so executive productivity continues without operational friction.",
    points: [
      "Executive support",
      "Administrative assistance",
      "Business travel coordination",
      "Meeting and conference arrangements",
      "Client hospitality management",
    ],
    benefit:
      "A premium extension of your executive office. Dedicated coordination for time-sensitive, high-visibility needs — delivered with boardroom-level discretion.",
    eyebrow: "Corporate concierge",
    introTitle: "Executive productivity without operational friction",
    forWhomTitle: "Leadership teams, visiting clients and corporate guests",
    forWhomBody:
      "For organisations that need discreet, precise coordination for executive support, administrative assistance, business travel, meetings and conferences, and client hospitality management.",
  }),
  relocation: svc({
    nav: "Relocation",
    title: "Relocation Services",
    subtitle: "From arrival to settled life",
    body: "A smoother transition for international professionals, expatriate families and relocating executives — from arrival to settled life.",
    points: [
      "Housing search",
      "School placement",
      "Immigration support",
      "Settling-in services",
      "Utility setup assistance",
    ],
    benefit:
      "We coordinate the practical, emotional and administrative details that make a move feel effortless.",
    eyebrow: "Relocation services",
    introTitle: "From arrival to settled life",
    forWhomTitle:
      "International professionals, expatriate families and relocating executives",
    forWhomBody:
      "For people who need housing search, school placement, immigration support, settling-in services and utility setup assistance during a move.",
  }),
  hospitality: svc({
    nav: "Hospitality",
    title: "Hospitality Services",
    subtitle: "First impressions, impeccably managed",
    body: "Elevated guest care for VIP visitors, delegations, private clients and corporate hospitality programs — first impressions, impeccably managed.",
    points: [
      "Guest management",
      "Luxury accommodation sourcing",
      "VIP airport services",
      "Event hospitality",
      "Private chauffeur services",
      "Host and welcome desk",
    ],
    benefit:
      "Discreet, punctual and polished service aligned with premium hospitality expectations.",
    eyebrow: "Hospitality services",
    introTitle: "First impressions, impeccably managed",
    forWhomTitle:
      "VIP visitors, delegations, private clients and corporate hospitality programs",
    forWhomBody:
      "For guests and hosts who need guest management, luxury accommodation sourcing, VIP airport services, event hospitality, private chauffeur services and a host and welcome desk.",
  }),
  "personal-assistance": svc({
    nav: "Personal Assistance",
    title: "Personal Assistance Services",
    subtitle: "Your personal office for life admin",
    body: "Time back, fewer interruptions and a trusted partner for the details that keep life moving — your personal office for life admin.",
    points: [
      "Daily task management",
      "Appointment scheduling",
      "Home management",
      "Personal shopping",
      "Lifestyle organization",
    ],
    benefit:
      "A concierge assistant can manage repeatable tasks, special requests and personal priorities through a single dedicated channel.",
    eyebrow: "Personal assistance",
    introTitle: "Your personal office for life admin",
    forWhomTitle: "Clients who want time back and fewer interruptions",
    forWhomBody:
      "For people who need daily task management, appointment scheduling, home management, personal shopping and lifestyle organization through a trusted partner.",
  }),
  "executive-family-office": svc({
    nav: "Executive & Family Office",
    title: "Executive & Family Office Support",
    subtitle: "Confidential support for complex lives",
    body: "Structured assistance for executives, entrepreneurs, family offices and private banking clients — confidential support for complex lives.",
    points: [
      "Calendar management — Proactive scheduling, reminders and coordination.",
      "Travel arrangements — Seamless itineraries, booking support and changes.",
      "Event coordination — Private and professional gatherings with trusted partners.",
      "Confidential assistance — Discreet handling of sensitive requests and personal data.",
    ],
    benefit: "Trusted local network | Multilingual coordination | Discretion by design",
    eyebrow: "Executive & family office support",
    introTitle: "Confidential support for complex lives",
    forWhomTitle:
      "Executives, entrepreneurs, family offices and private banking clients",
    forWhomBody:
      "For clients who need structured, confidential assistance with calendar management, travel arrangements, event coordination and confidential assistance.",
  }),
  "luxury-travel": svc({
    nav: "Luxury Travel",
    title: "Luxury Travel Management",
    subtitle: "Travel designed around your time",
    body: "Business trips, private escapes and VIP journeys planned with precision from door to destination — travel designed around your time.",
    points: [
      "Private jet coordination",
      "Business travel",
      "Luxury holidays",
      "Hotel reservations",
      "Concierge experiences",
    ],
    benefit:
      "From itinerary design to last-minute changes, our team manages the moving parts so you can focus on arrival.",
    eyebrow: "Luxury travel management",
    introTitle: "Travel designed around your time",
    forWhomTitle: "Clients planning business trips, private escapes and VIP journeys",
    forWhomBody:
      "For travellers who need private jet coordination, business travel, luxury holidays, hotel reservations and concierge experiences.",
  }),
  events: svc({
    nav: "Events & Experiences",
    title: "Events & Experiences",
    subtitle: "Memorable moments, flawlessly hosted",
    body: "Curated events and exclusive experiences for corporate, private and lifestyle occasions — memorable moments, flawlessly hosted.",
    points: [
      "Corporate events",
      "Private events",
      "Exclusive experiences",
      "Cultural activities",
      "Networking events",
    ],
    benefit:
      "Concept, venue, guest journey, suppliers and on-site hospitality aligned under one service lead.",
    eyebrow: "Events & experiences",
    introTitle: "Memorable moments, flawlessly hosted",
    forWhomTitle: "Corporate, private and lifestyle occasions",
    forWhomBody:
      "For hosts planning corporate events, private events, exclusive experiences, cultural activities and networking events.",
  }),
  property: svc({
    nav: "Property & Lifestyle",
    title: "Property & Lifestyle Management",
    subtitle: "Your property, always cared for",
    body: "Reliable supervision and household coordination for primary residences, second homes and lifestyle assets — your property, always cared for.",
    points: [
      "Property supervision",
      "Maintenance coordination",
      "Household staffing",
      "Second-home management",
    ],
    benefit:
      "Preventive coordination, trusted suppliers and discreet reporting keep residences prepared for arrival.",
    eyebrow: "Property & lifestyle management",
    introTitle: "Your property, always cared for",
    forWhomTitle: "Owners of primary residences, second homes and lifestyle assets",
    forWhomBody:
      "For clients who need property supervision, maintenance coordination, household staffing and second-home management.",
  }),
};

const en = JSON.parse(fs.readFileSync("messages/en.json", "utf8"));
en.services = services;
en.meta = {
  title: "Oravi Lux | Concierge & Hospitality Partner in Luxembourg",
  description:
    "Your trusted concierge and hospitality partner in Luxembourg. Bespoke lifestyle management, corporate support, relocation and VIP hospitality.",
};
en.hero.partner = "Your Trusted Concierge & Hospitality Partner in Luxembourg";
en.hero.subtitle =
  "Bespoke lifestyle management, corporate support, relocation and VIP hospitality.";
en.intro.body =
  "Oravi Lux is a discreet partner for people and organizations who expect every detail to be handled with care.";
en.luxembourg.body =
  "Luxembourg combines financial strength, international talent and a uniquely connected European lifestyle.";
en.servicesSection.title = "Our Concierge Services";
en.servicesSection.body =
  "From personal assistance to VIP arrangements, our service adapts to your lifestyle and standards.";
en.values.body =
  "A premium concierge partner with local expertise and international hospitality discipline.";
en.values.items = [
  { title: "Local expertise" },
  { title: "International standards" },
  { title: "Exclusive network" },
  { title: "Multilingual team" },
  { title: "24/7 availability" },
  { title: "Confidentiality" },
];
en.aboutPage.body =
  "Oravi Lux is a discreet partner for people and organizations who expect every detail to be handled with care.";
en.aboutPage.missionBody =
  "To simplify life and business in Luxembourg through tailored, high-touch support.";
en.aboutPage.visionBody =
  "To set the benchmark for modern concierge and hospitality excellence in the Grand Duchy.";
en.aboutPage.valueBody =
  "One trusted point of contact for lifestyle, corporate, relocation, events and VIP services.";
en.aboutPage.whyBody =
  "Trust built on service standards. A premium concierge partner with local expertise and international hospitality discipline.";
en.footer.tagline =
  "Your Trusted Concierge & Hospitality Partner in Luxembourg. Bespoke lifestyle management, corporate support, relocation and VIP hospitality.";
en.frequent.body =
  "A quick view of high-demand services for executives, expatriates and private clients.";
en.frequent.items = [
  {
    title: "Airport transfers",
    body: "Private chauffeur and VIP arrival coordination",
    href: "/services/hospitality",
  },
  {
    title: "Private dining reservations",
    body: "Premium restaurants and private culinary experiences",
    href: "/services/concierge",
  },
  {
    title: "Relocation support",
    body: "Home search, schools and settling-in",
    href: "/services/relocation",
  },
  {
    title: "Executive assistance",
    body: "Scheduling, admin and travel support",
    href: "/services/corporate-concierge",
  },
  {
    title: "Event management",
    body: "Corporate events and private celebrations",
    href: "/services/events",
  },
];
en.packages.body =
  "Choose a structured concierge package or a bespoke VIP arrangement tailored to your lifestyle.";
en.packages.note =
  "Packages can be adapted to retainers, project scopes or one-off mandates.";
en.packages.items = [
  {
    name: "Essential Concierge",
    tag: "For occasional support",
    points: ["Reservations", "Errands", "Local guidance"],
  },
  {
    name: "Premium Concierge",
    tag: "For regular lifestyle needs",
    points: ["Personal assistant", "Priority requests", "Lifestyle planning"],
  },
  {
    name: "Executive Concierge",
    tag: "For leadership and firms",
    points: ["Travel desk", "Meeting support", "Client hospitality"],
  },
  {
    name: "Bespoke VIP Services",
    tag: "For fully tailored support",
    points: ["Dedicated lead", "VIP access", "24/7 coordination"],
  },
];
en.work.title = "Experience Personalized Concierge Excellence in Luxembourg.";
en.work.body =
  "Private clients | Corporate teams | Executives | Expatriates | Family offices";
en.work.items = [
  { title: "Private clients" },
  { title: "Corporate teams" },
  { title: "Executives" },
  { title: "Expatriates" },
  { title: "Family offices" },
];
en.cta.body = "Experience Personalized Concierge Excellence in Luxembourg.";
en.cta.audiences =
  "Private clients | Corporate teams | Executives | Expatriates | Family offices";
en.bands.travel.body =
  "From personal assistance to VIP arrangements, our service adapts to your lifestyle and standards.";
en.bands.events.body =
  "We support leadership teams, visiting clients and corporate guests with discreet, precise coordination.";
en.bands.concierge.body =
  "Elevated guest care for VIP visitors, delegations, private clients and corporate hospitality programs.";

fs.writeFileSync("messages/en.json", JSON.stringify(en, null, 2) + "\n");
console.log("cleaned en.json");

// Sync FR/DE structure from EN: keep translations where possible, replace France/Germany invented bits by translating cleaned EN services via simple approach — copy EN services into FR/DE then apply known FR/DE nav labels from previous files
for (const locale of ["fr", "de"]) {
  const data = JSON.parse(fs.readFileSync(`messages/${locale}.json`, "utf8"));
  const prev = data.services;
  data.services = JSON.parse(JSON.stringify(services));
  // restore nav labels from previous locale when present
  for (const slug of Object.keys(data.services)) {
    if (prev[slug]?.nav) data.services[slug].nav = prev[slug].nav;
  }
  data.meta = {
    title:
      locale === "fr"
        ? "Oravi Lux | Partenaire Conciergerie & Hospitalité au Luxembourg"
        : "Oravi Lux | Concierge- & Hospitality-Partner in Luxemburg",
    description:
      locale === "fr"
        ? "Votre partenaire de confiance en conciergerie et hospitalité au Luxembourg. Gestion lifestyle, support corporate, relocation et hospitalité VIP."
        : "Ihr vertrauenswürdiger Concierge- und Hospitality-Partner in Luxemburg. Lifestyle-Management, Corporate Support, Relocation und VIP-Hospitality.",
  };
  data.hero.partner =
    locale === "fr"
      ? "Votre partenaire de confiance en conciergerie et hospitalité au Luxembourg"
      : "Ihr vertrauenswürdiger Concierge- & Hospitality-Partner in Luxemburg";
  data.hero.subtitle =
    locale === "fr"
      ? "Gestion lifestyle sur mesure, support corporate, relocation et hospitalité VIP."
      : "Massgeschneidertes Lifestyle-Management, Corporate Support, Relocation und VIP-Hospitality.";
  // Keep FR/DE service bodies in English briefly is bad UX — translate key service fields
  fs.writeFileSync(`messages/${locale}.json`, JSON.stringify(data, null, 2) + "\n");
  console.log("structure synced", locale);
}
