export const site = {
  name: "Oravi Lux",
  shortName: "Oravi",
  tagline: "Executive concierge & corporate hospitality",
  email: "contact@oravilux.com",
  phone: "+352 27 86 42 10",
  address: "14, Boulevard Royal, L-2449 Luxembourg",
  hours: "Monday to Friday, 8:00 to 19:00",
  logo: "/oravi-crest.png",
} as const;

export const navLinks = [
  { label: "Approach", href: "#approach" },
  { label: "Services", href: "#services" },
  { label: "Partnership", href: "#partnership" },
  { label: "Contact", href: "#contact" },
] as const;

export const partners = [
  { name: "Four Seasons", slug: "fourseasons" },
  { name: "NetJets", slug: "netjets" },
  { name: "Aman", slug: "aman" },
  { name: "Rosewood", slug: "rosewood" },
  { name: "Mandarin Oriental", slug: "mandarinoriental" },
  { name: "Belmond", slug: "belmond" },
] as const;

/** @deprecated alias — use partners[].slug */
export type PartnerSlug = (typeof partners)[number]["slug"];

export const services = [
  {
    title: "Executive travel",
    description:
      "Private aviation coordination, premium ground transport, and hotel arrangements managed with precision across time zones.",
    image: "https://picsum.photos/seed/oravi-executive-travel/900/1100",
    span: "lg:col-span-7 lg:row-span-2",
  },
  {
    title: "Corporate events",
    description:
      "Board dinners, client receptions, and international gatherings planned end to end with venue curation and on-site direction.",
    image: "https://picsum.photos/seed/oravi-corporate-events/700/600",
    span: "lg:col-span-5",
  },
  {
    title: "VIP experiences",
    description:
      "Cultural access, private viewings, and bespoke itineraries designed for principals who expect discretion and flawless timing.",
    image: "https://picsum.photos/seed/oravi-vip-experiences/700/600",
    span: "lg:col-span-5",
  },
  {
    title: "Executive assistance",
    description:
      "Dedicated support for leadership teams: scheduling, household coordination, and personal requests handled as one continuous relationship.",
    image: "https://picsum.photos/seed/oravi-executive-assistance/900/700",
    span: "lg:col-span-7",
  },
] as const;

export const approachSteps = [
  {
    title: "Understand the mandate",
    body: "We begin with your priorities, stakeholders, and constraints. Every engagement starts with listening, not a service catalogue.",
  },
  {
    title: "Design the response",
    body: "A dedicated account lead assembles the right partners, timelines, and contingencies before anything is confirmed.",
  },
  {
    title: "Deliver with discretion",
    body: "Requests are handled through a single point of contact. Your teams see results, not the machinery behind them.",
  },
  {
    title: "Refine the partnership",
    body: "Preferences are remembered. Standards are maintained. The relationship deepens as your organisation evolves.",
  },
] as const;

export const capabilities = [
  "Private aviation",
  "Executive lounges",
  "Board hospitality",
  "International itineraries",
  "Household coordination",
  "Cultural access",
  "Corporate gifting",
  "Event production",
  "Premium ground transport",
  "Hotel partnerships",
] as const;

export const values = [
  {
    title: "Discretion by default",
    body: "Confidentiality is structural, not promised. We operate quietly so your principals remain undisturbed.",
  },
  {
    title: "Human accountability",
    body: "Every client has a named lead. No ticket queues, no anonymous handoffs.",
  },
  {
    title: "Global reach, local care",
    body: "A European base with trusted partners in major business capitals worldwide.",
  },
] as const;
