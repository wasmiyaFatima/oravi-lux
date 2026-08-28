const fs = require("fs");

const enrich = {
  concierge: {
    eyebrow: "Personal concierge Luxembourg",
    cta: "Start with a confidential consultation",
    introEyebrow: "Overview",
    introTitle: "Luxury concierge support for everyday life in Luxembourg",
    pointsTitle: "What we handle",
    forWhomEyebrow: "Who it is for",
    forWhomTitle: "Private clients who expect discreet lifestyle management",
    forWhomBody:
      "Designed for residents and visitors across Luxembourg, France and Germany who want a private concierge for lifestyle management, VIP arrangements and reservation services — without managing every detail themselves.",
    approachEyebrow: "How we work",
    approachTitle: "A calm, accountable way to deliver concierge requests",
    approachBody:
      "Every engagement follows our clear method: consultation, needs assessment, a personalised solution, precise execution and ongoing support — led by one dedicated contact.",
    approachSteps: [
      "We begin with a confidential consultation to understand your lifestyle, priorities and preferred level of involvement.",
      "Requests are coordinated through trusted local partners in Luxembourg and the Greater Region, with careful timing and discretion.",
      "You receive clear follow-up and continuity — so recurring lifestyle needs stay organised over time.",
    ],
    ctaTitle: "Tell us what you need. We will coordinate the rest.",
    ctaBody:
      "Start with a confidential consultation for luxury concierge services in Luxembourg — tailored to private life, travel and VIP hospitality.",
  },
  "corporate-concierge": {
    eyebrow: "Corporate concierge Luxembourg",
    cta: "Start with a confidential consultation",
    introEyebrow: "Overview",
    introTitle: "Executive support that protects focus and hospitality",
    pointsTitle: "What we handle",
    forWhomEyebrow: "Who it is for",
    forWhomTitle: "Leadership teams, firms and visiting executives",
    forWhomBody:
      "Built for companies and executives operating between Luxembourg, France and Germany — where board visits, client hospitality and business travel demand boardroom-level discretion.",
    approachEyebrow: "How we work",
    approachTitle: "Corporate coordination with one accountable lead",
    approachBody:
      "From consultation to ongoing support, one dedicated contact manages partner coordination and quality follow-up — so your team stays focused on the work that matters.",
    approachSteps: [
      "We assess executive calendars, guest needs and hospitality standards before any booking is made.",
      "Travel, meetings and client hosting are executed with precise timing across Luxembourg and cross-border locations.",
      "We remain available for adjustments, last-minute changes and ongoing executive assistance.",
    ],
    ctaTitle: "Extend your executive office with discreet local support",
    ctaBody:
      "Request a confidential consultation for corporate concierge and executive support in Luxembourg.",
  },
  relocation: {
    eyebrow: "Relocation services Luxembourg",
    cta: "Start with a confidential consultation",
    introEyebrow: "Overview",
    introTitle: "Relocation support from arrival to settled life",
    pointsTitle: "What we handle",
    forWhomEyebrow: "Who it is for",
    forWhomTitle: "Professionals, expatriate families and relocating executives",
    forWhomBody:
      "For international professionals and families moving to Luxembourg from France, Germany and beyond — who need housing, schools, settling-in support and practical coordination handled with care.",
    approachEyebrow: "How we work",
    approachTitle: "A structured relocation path with human guidance",
    approachBody:
      "Our process keeps relocation simple, confidential and accountable: we assess needs, design a personalised plan, execute the practical steps and stay available as life settles.",
    approachSteps: [
      "A consultation clarifies housing priorities, school needs, timelines and family or executive requirements.",
      "We coordinate searches, appointments and settling-in tasks with trusted local contacts.",
      "Ongoing support continues after arrival — utilities, orientation and the details that make Luxembourg feel like home.",
    ],
    ctaTitle: "Make your move to Luxembourg feel manageable",
    ctaBody:
      "Start with a confidential consultation for relocation services in Luxembourg — for individuals, families and executive transfers.",
  },
  hospitality: {
    eyebrow: "VIP hospitality Luxembourg",
    cta: "Start with a confidential consultation",
    introEyebrow: "Overview",
    introTitle: "Hospitality services that protect first impressions",
    pointsTitle: "What we handle",
    forWhomEyebrow: "Who it is for",
    forWhomTitle: "VIP guests, delegations and corporate hospitality programmes",
    forWhomBody:
      "For private clients and organisations hosting guests in Luxembourg — including visitors arriving from France and Germany — who need airport services, accommodation and welcome arrangements handled impeccably.",
    approachEyebrow: "How we work",
    approachTitle: "Guest journeys planned with quiet precision",
    approachBody:
      "One dedicated contact leads guest management, partner coordination and on-site hospitality — from briefing to farewell.",
    approachSteps: [
      "We map the guest journey: arrival, transfers, accommodation, hosting and departure.",
      "VIP airport services, chauffeurs and hosts are coordinated to the minute.",
      "On-site hospitality stays discreet, punctual and aligned with your standards.",
    ],
    ctaTitle: "Host with polish. Arrive with calm.",
    ctaBody:
      "Book a confidential consultation for VIP hospitality and guest management in Luxembourg.",
  },
  "personal-assistance": {
    eyebrow: "Personal assistance Luxembourg",
    cta: "Start with a confidential consultation",
    introEyebrow: "Overview",
    introTitle: "A personal office for life administration",
    pointsTitle: "What we handle",
    forWhomEyebrow: "Who it is for",
    forWhomTitle: "Busy private clients who want time back",
    forWhomBody:
      "Ideal for residents of Luxembourg and the Greater Region — including clients with ties to France and Germany — who need daily task management, appointments and lifestyle organisation handled through one trusted channel.",
    approachEyebrow: "How we work",
    approachTitle: "Repeatable support with discreet follow-through",
    approachBody:
      "We assess priorities, set a personalised assistance rhythm, execute tasks carefully and provide ongoing support as needs evolve.",
    approachSteps: [
      "A consultation defines which tasks should leave your desk — and which require your approval.",
      "Scheduling, shopping and home requests are managed with clear communication.",
      "Ongoing assistance keeps personal administration organised week after week.",
    ],
    ctaTitle: "Fewer interruptions. More clarity.",
    ctaBody:
      "Start with a confidential consultation for personal assistance services in Luxembourg.",
  },
  "executive-family-office": {
    eyebrow: "Family office support Luxembourg",
    cta: "Start with a confidential consultation",
    introEyebrow: "Overview",
    introTitle: "Confidential support for complex private lives",
    pointsTitle: "What we handle",
    forWhomEyebrow: "Who it is for",
    forWhomTitle: "Executives, entrepreneurs, family offices and private banking clients",
    forWhomBody:
      "For clients whose lives span Luxembourg, France and Germany — and who require calendar management, travel, events and confidential assistance handled with absolute discretion.",
    approachEyebrow: "How we work",
    approachTitle: "Structured support with privacy by design",
    approachBody:
      "Confidential consultation, careful needs assessment and a personalised operating rhythm — executed by a dedicated lead with multilingual coordination.",
    approachSteps: [
      "We understand sensitive priorities, household rhythms and professional constraints before acting.",
      "Travel, calendars and private events are coordinated through a trusted local network.",
      "Ongoing family office support remains discreet, responsive and accountable.",
    ],
    ctaTitle: "Confidential coordination for complex lives",
    ctaBody:
      "Request a confidential consultation for executive and family office support in Luxembourg.",
  },
  "luxury-travel": {
    eyebrow: "Luxury travel Luxembourg",
    cta: "Start with a confidential consultation",
    introEyebrow: "Overview",
    introTitle: "Travel management designed around your time",
    pointsTitle: "What we handle",
    forWhomEyebrow: "Who it is for",
    forWhomTitle: "Executives and private clients who travel with purpose",
    forWhomBody:
      "For business and private travellers based in Luxembourg or connecting through France and Germany — who need luxury travel management, hotel reservations and concierge experiences handled with precision.",
    approachEyebrow: "How we work",
    approachTitle: "Door-to-destination coordination",
    approachBody:
      "We design the itinerary, manage bookings and changes, and keep one dedicated contact accountable from departure to arrival.",
    approachSteps: [
      "Consultation clarifies timing, privacy preferences and travel standards.",
      "Flights, hotels, ground logistics and experiences are coordinated carefully.",
      "Last-minute changes and ongoing travel support remain part of the service.",
    ],
    ctaTitle: "Travel with less friction",
    ctaBody:
      "Start with a confidential consultation for luxury travel management in Luxembourg.",
  },
  events: {
    eyebrow: "Event management Luxembourg",
    cta: "Start with a confidential consultation",
    introEyebrow: "Overview",
    introTitle: "Events and experiences, flawlessly hosted",
    pointsTitle: "What we handle",
    forWhomEyebrow: "Who it is for",
    forWhomTitle: "Corporate hosts and private clients planning memorable occasions",
    forWhomBody:
      "For firms and private clients organising events in Luxembourg — often with guests from France and Germany — who need concept, venue, guest journey and hospitality aligned under one lead.",
    approachEyebrow: "How we work",
    approachTitle: "From concept to on-site hospitality",
    approachBody:
      "We assess the occasion, design a personalised plan, execute with trusted suppliers and provide on-site coordination with discreet polish.",
    approachSteps: [
      "A consultation defines purpose, guest profile, tone and practical constraints.",
      "Venue, suppliers and guest flow are coordinated with one accountable service lead.",
      "On-site hospitality and follow-up ensure the evening feels effortless.",
    ],
    ctaTitle: "Host an occasion that feels effortless",
    ctaBody:
      "Request a confidential consultation for event management and exclusive experiences in Luxembourg.",
  },
  property: {
    eyebrow: "Property management Luxembourg",
    cta: "Start with a confidential consultation",
    introEyebrow: "Overview",
    introTitle: "Property and lifestyle care when you are away — or at home",
    pointsTitle: "What we handle",
    forWhomEyebrow: "Who it is for",
    forWhomTitle: "Owners of primary residences, second homes and lifestyle assets",
    forWhomBody:
      "For property owners in Luxembourg with international lifestyles across France and Germany — who need supervision, maintenance coordination and household support handled discreetly.",
    approachEyebrew: undefined,
    approachEyebrow: "How we work",
    approachTitle: "Preventive care with trusted suppliers",
    approachBody:
      "We assess the residence, set a supervision rhythm, coordinate maintenance and staffing, and report discreetly so homes remain arrival-ready.",
    approachSteps: [
      "Consultation clarifies property priorities, access, suppliers and reporting preferences.",
      "Supervision and maintenance are coordinated through trusted partners.",
      "Ongoing lifestyle management keeps residences prepared between stays.",
    ],
    ctaTitle: "Keep your residence quietly well run",
    ctaBody:
      "Start with a confidential consultation for property and lifestyle management in Luxembourg.",
  },
};

const meta = {
  en: {
    title:
      "LuxConcierge & Hospitality | Concierge Services Luxembourg, France & Germany",
    description:
      "Premium concierge and hospitality partner in Luxembourg for clients across Luxembourg, France and Germany. Lifestyle management, corporate concierge, relocation, VIP hospitality and executive support.",
  },
  fr: {
    title:
      "LuxConcierge & Hospitality | Conciergerie Luxembourg, France & Allemagne",
    description:
      "Partenaire premium de conciergerie et d’hospitalité au Luxembourg pour des clients au Luxembourg, en France et en Allemagne. Lifestyle, conciergerie corporate, relocation, hospitalité VIP et support exécutif.",
  },
  de: {
    title:
      "LuxConcierge & Hospitality | Concierge-Services Luxemburg, Frankreich & Deutschland",
    description:
      "Premium Concierge- und Hospitality-Partner in Luxemburg für Kunden in Luxemburg, Frankreich und Deutschland. Lifestyle-Management, Corporate Concierge, Relocation, VIP-Hospitality und Executive Support.",
  },
};

const frEnrichMap = null; // filled below via translation in separate step

for (const locale of ["en"]) {
  const path = `messages/${locale}.json`;
  const data = JSON.parse(fs.readFileSync(path, "utf8"));
  data.meta = meta[locale];
  data.hero.subtitle =
    "Bespoke lifestyle management, corporate support, relocation and VIP hospitality in Luxembourg — serving private clients and organisations across Luxembourg, France and Germany.";
  data.hero.partner =
    "Your trusted concierge & hospitality partner in Luxembourg";
  for (const [slug, extra] of Object.entries(enrich)) {
    const clean = { ...extra };
    delete clean.approachEyebrew;
    data.services[slug] = { ...data.services[slug], ...clean };
    if (typeof data.services[slug].benefit === "string") {
      data.services[slug].benefit = data.services[slug].benefit.replace(
        "andwardrobe",
        "and wardrobe"
      );
    }
    data.services[slug].points = data.services[slug].points.map((p) =>
      p.replace("andwardrobe", "and wardrobe")
    );
  }
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

console.log("en enriched", Object.keys(enrich).length);
