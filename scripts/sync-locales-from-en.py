# -*- coding: utf-8 -*-
import json
import copy
from pathlib import Path

en = json.loads(Path(r"c:\projects\lami\messages\en.json").read_text(encoding="utf-8"))

def write_locale(path: str, overlay: dict) -> None:
    data = copy.deepcopy(en)
    def merge(dst, src):
        for k, v in src.items():
            if isinstance(v, dict) and isinstance(dst.get(k), dict):
                merge(dst[k], v)
            else:
                dst[k] = v
    merge(data, overlay)
    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("wrote", path)

fr = {
  "meta": {
    "title": "Oravi Lux | Partenaire Conciergerie & Hospitalité au Luxembourg",
    "description": "Votre partenaire de confiance en conciergerie et hospitalité au Luxembourg. Lifestyle, support corporate, relocation et hospitalité VIP."
  },
  "nav": {
    "home": "Accueil", "about": "À propos", "services": "Services", "approach": "Processus",
    "work": "Clients", "contact": "Contact", "speak": "Consultation", "language": "Langue"
  },
  "hero": {
    "partner": "Votre partenaire de confiance en conciergerie & hospitalité au Luxembourg",
    "line1": "Luxury service.",
    "line2": "Local precision.",
    "subtitle": "Gestion lifestyle sur mesure, support corporate, relocation et hospitalité VIP.",
    "cta": "Démarrer une consultation",
    "secondary": "Voir les services",
    "tertiary": "Notre société",
    "scroll": "Découvrir",
    "ratingLabel": "Luxembourg",
    "ratingValue": "Conciergerie & Hospitalité"
  },
  "intro": {
    "eyebrow": "Bienvenue",
    "title": "Luxury service. Local precision.",
    "body": "Un partenaire discret pour les personnes et organisations qui attendent que chaque détail soit traité avec soin.",
    "cta": "À propos d'Oravi Lux",
    "ctaSecondary": "Demander une consultation",
    "card1Title": "Mission",
    "card1Body": "Simplifier la vie et les affaires au Luxembourg grâce à un accompagnement sur mesure et de haute précision.",
    "card2Title": "Vision",
    "card2Body": "Fixer la référence de la conciergerie et de l'hospitalité modernes dans le Grand-Duché.",
    "card3Title": "Proposition de valeur",
    "card3Body": "Un seul interlocuteur de confiance pour lifestyle, corporate, relocation, événements et services VIP.",
    "stat1Value": "47%",
    "stat1Label": "Résidents étrangers",
    "stat2Value": "181",
    "stat2Label": "Nationalités",
    "stat3Value": "Hub UE",
    "stat3Label": "Place financière"
  },
  "cta": {
    "eyebrow": "Prochaine étape",
    "title": "Let Us Take Care of Every Detail",
    "body": "Vivez une excellence de conciergerie personnalisée au Luxembourg. Clients privés · Équipes corporate · Dirigeants · Expatriés · Family offices. Dites-nous ce dont vous avez besoin. Nous coordonnerons le reste.",
    "email": "E-mail",
    "call": "Téléphone",
    "button": "Démarrer une consultation confidentielle",
    "secondary": "Voir les services"
  },
  "contactPage": {
    "title": "Commencez par une consultation confidentielle",
    "subtitle": "Dites-nous ce dont vous avez besoin. Nous coordonnerons le reste.",
    "name": "Nom",
    "company": "Entreprise",
    "email": "E-mail",
    "message": "Comment pouvons-nous vous aider ?",
    "submit": "Envoyer la demande",
    "office": "Bureau",
    "phone": "Téléphone",
    "hours": "Disponibilité"
  },
  "footer": {
    "tagline": "Votre partenaire de confiance en conciergerie & hospitalité au Luxembourg.",
    "navigation": "Navigation",
    "contact": "Contact",
    "privacy": "Politique de confidentialité",
    "legal": "Mentions légales",
    "rights": "Tous droits réservés."
  },
  "site": {
    "email": "contact@oravilux.com",
    "phone": "+352 00 000 000",
    "address": "Luxembourg City, Grand-Duché de Luxembourg",
    "hours": "Consultations confidentielles sur rendez-vous"
  },
  "services": {
    "concierge": {
      "nav": "Conciergerie",
      "title": "Nos services de conciergerie",
      "subtitle": "Des demandes du quotidien. Une exécution d'exception.",
      "body": "De l'assistance personnelle aux arrangements VIP, notre service s'adapte à votre style de vie et à vos standards.",
      "points": ["Assistance personnelle", "Gestion lifestyle", "Arrangements VIP", "Services de réservation", "Assistance shopping de luxe"],
      "benefit": "Un interlocuteur de confiance pour vos besoins lifestyle — discret, précis et sur mesure."
    },
    "corporate-concierge": {
      "nav": "Conciergerie corporate",
      "title": "Conciergerie corporate",
      "subtitle": "Productivité exécutive sans friction opérationnelle.",
      "body": "Nous accompagnons les équipes de direction, clients en visite et invités corporate avec une coordination discrète et précise.",
      "points": ["Support exécutif", "Assistance administrative", "Coordination voyages d'affaires", "Réunions et conférences", "Hospitalité clients"],
      "benefit": "Coordination dédiée pour les besoins urgents et très visibles — avec la discrétion d'un boardroom."
    },
    "relocation": {
      "nav": "Relocation",
      "title": "Services de relocation",
      "subtitle": "De l'arrivée à une vie installée.",
      "body": "Une transition plus fluide pour professionnels internationaux, familles expatriées et dirigeants en mobilité.",
      "points": ["Recherche de logement", "Scolarité", "Support immigration", "Services d'installation", "Mise en service des utilités"],
      "benefit": "Nous coordonnons les détails pratiques, émotionnels et administratifs qui rendent un déménagement sans effort."
    },
    "hospitality": {
      "nav": "Hospitalité",
      "title": "Services d'hospitalité",
      "subtitle": "Des premières impressions impeccablement gérées.",
      "body": "Accueil élevé pour visiteurs VIP, délégations, clients privés et programmes d'hospitalité corporate.",
      "points": ["Gestion des invités", "Hébergements de luxe", "Services aéroport VIP", "Hospitalité événementielle", "Chauffeur privé", "Host and welcome desk"],
      "benefit": "Un service discret, ponctuel et soigné, aligné sur les standards de l'hospitalité premium."
    },
    "personal-assistance": {
      "nav": "Assistance personnelle",
      "title": "Assistance personnelle",
      "subtitle": "Votre bureau personnel pour l'administratif du quotidien.",
      "body": "Du temps gagné, moins d'interruptions et un partenaire de confiance pour les détails qui font avancer la vie.",
      "points": ["Gestion des tâches quotidiennes", "Prise de rendez-vous", "Gestion du foyer", "Personal shopping", "Organisation lifestyle"],
      "benefit": "Un assistant concierge gère tâches récurrentes, demandes spéciales et priorités personnelles via un canal dédié."
    },
    "executive-family-office": {
      "nav": "Executive & Family Office",
      "title": "Support Executive & Family Office",
      "subtitle": "Un accompagnement confidentiel pour des vies complexes.",
      "body": "Assistance structurée pour dirigeants, entrepreneurs, family offices et clients de la banque privée.",
      "points": ["Gestion d'agenda", "Arrangements de voyage", "Coordination d'événements", "Assistance confidentielle"],
      "benefit": "Réseau local de confiance · Coordination multilingue · Discrétion by design"
    },
    "luxury-travel": {
      "nav": "Voyage de luxe",
      "title": "Gestion de voyages de luxe",
      "subtitle": "Des voyages conçus autour de votre temps.",
      "body": "Voyages d'affaires, escapades privées et parcours VIP planifiés avec précision de porte à destination.",
      "points": ["Coordination jets privés", "Voyages d'affaires", "Vacances de luxe", "Réservations hôtels", "Expériences conciergerie"],
      "benefit": "De la conception d'itinéraire aux changements de dernière minute, notre équipe gère les détails."
    },
    "events": {
      "nav": "Événements & expériences",
      "title": "Événements & expériences",
      "subtitle": "Des moments mémorables, accueillis sans faille.",
      "body": "Événements et expériences exclusives pour occasions corporate, privées et lifestyle.",
      "points": ["Événements corporate", "Événements privés", "Expériences exclusives", "Activités culturelles", "Networking"],
      "benefit": "Concept, lieu, parcours invité, prestataires et hospitalité sur site sous un seul lead."
    },
    "property": {
      "nav": "Propriété & lifestyle",
      "title": "Gestion de propriété & lifestyle",
      "subtitle": "Votre bien, toujours entre de bonnes mains.",
      "body": "Supervision fiable et coordination domestique pour résidences principales, secondaires et actifs lifestyle.",
      "points": ["Supervision de propriété", "Coordination maintenance", "Staffing domestique", "Gestion de résidence secondaire"],
      "benefit": "Coordination préventive, prestataires de confiance et reporting discret."
    }
  },
  "servicesSection": {
    "eyebrow": "Services",
    "title": "Conciergerie & hospitalité, de bout en bout",
    "body": "Lifestyle, corporate, relocation, hospitalité, voyage, événements et propriété — un partenaire de confiance au Luxembourg.",
    "viewAll": "Tous les services",
    "cta": "Demander une consultation",
    "learnMore": "Découvrir"
  },
  "values": {
    "eyebrow": "Pourquoi nous choisir",
    "title": "Une confiance bâtie sur des standards de service",
    "cta": "Démarrer une consultation",
    "items": [
      {"title": "Expertise locale", "body": "Connaissance approfondie de la vie, des affaires et des réseaux d'hospitalité au Luxembourg."},
      {"title": "Standards internationaux", "body": "Un partenaire conciergerie premium avec la discipline de l'hospitalité internationale."},
      {"title": "Réseau exclusif", "body": "Partenaires de confiance pour voyages, lieux, résidences et accès VIP."},
      {"title": "Équipe multilingue", "body": "Coordination dans plusieurs langues pour une communauté internationale."},
      {"title": "Disponibilité 24/7", "body": "Un support réactif lorsque des besoins urgents surviennent."},
      {"title": "Confidentialité", "body": "Traitement discret des demandes sensibles et des données personnelles."}
    ]
  },
  "work": {
    "eyebrow": "À qui s'adresse notre service",
    "title": "Clients privés. Équipes corporate. Dirigeants.",
    "body": "Clients privés · Équipes corporate · Dirigeants · Expatriés · Family offices",
    "cta": "Nous parler",
    "items": [
      {"title": "Clients privés", "caption": "Gestion lifestyle, hospitalité VIP et assistance personnelle avec discrétion."},
      {"title": "Équipes corporate", "caption": "Hospitalité clients, réunions, voyages et coordination exécutive sans friction."},
      {"title": "Dirigeants", "caption": "Support urgent, voyages et assistance confidentielle pour des agendas complexes."},
      {"title": "Expatriés", "caption": "Relocation, logement, écoles et installation — de l'arrivée à une vie installée."},
      {"title": "Family offices", "caption": "Support structuré et confidentiel pour des vies et mandats complexes."}
    ]
  },
  "principles": {
    "eyebrow": "Pourquoi le Luxembourg ?",
    "title": "Un foyer stratégique pour des vies et des entreprises globales",
    "body": "Le Luxembourg combine force financière, talents internationaux et un lifestyle européen unique.",
    "cta": "Demander une consultation",
    "pilotage": "Discret. Réactif. Connecté."
  },
  "bands": {
    "aria": "Services signature",
    "travel": {
      "eyebrow": "Conciergerie",
      "title": "Des demandes du quotidien. Une exécution d'exception.",
      "body": "De l'assistance personnelle aux arrangements VIP.",
      "cta": "Explorer la conciergerie"
    },
    "events": {
      "eyebrow": "Corporate",
      "title": "Productivité exécutive sans friction opérationnelle",
      "body": "Coordination discrète pour équipes de direction et invités corporate.",
      "cta": "Explorer le corporate"
    },
    "concierge": {
      "eyebrow": "Hospitalité",
      "title": "Des premières impressions impeccablement gérées",
      "body": "Accueil élevé pour VIP, délégations et programmes corporate.",
      "cta": "Explorer l'hospitalité"
    }
  },
  "process": {
    "eyebrow": "Notre processus",
    "title": "Une méthode claire pour un service sur mesure",
    "subtitle": "Simple, confidentiel et responsable, de la première conversation au suivi continu.",
    "body": "Un interlocuteur dédié pilote la coordination, les partenaires et le suivi qualité.",
    "cta": "Démarrer une consultation",
    "entryLabel": "Notre façon de travailler",
    "note": "Un interlocuteur dédié pilote la coordination, les partenaires et le suivi qualité.",
    "steps": [
      {"title": "Consultation", "body": "Une première conversation confidentielle pour comprendre vos priorités."},
      {"title": "Analyse des besoins", "body": "Nous clarifions en détail les besoins lifestyle, corporate, relocation ou VIP."},
      {"title": "Solution personnalisée", "body": "Un plan, des partenaires et un modèle de service conçus selon vos standards."},
      {"title": "Exécution", "body": "Livraison précise avec un seul point de contact et une discrétion de boardroom."},
      {"title": "Support continu", "body": "Coordination continue, suivi qualité et accompagnement évolutif."}
    ]
  },
  "packages": {
    "eyebrow": "Formules de service",
    "title": "Un accès flexible au support premium",
    "body": "Choisissez une formule structurée ou un arrangement VIP sur mesure. Adaptables en retainer, projet ou mandat ponctuel.",
    "cta": "Discuter d'une formule"
  },
  "testimonials": {
    "eyebrow": "Témoignages clients",
    "title": "La confiance de clients exigeants",
    "body": "Exemples illustratifs — à remplacer par des citations clients validées avant publication.",
    "cta": "Démarrer une consultation"
  }
}

de = {
  "meta": {
    "title": "Oravi Lux | Concierge- & Hospitality-Partner in Luxemburg",
    "description": "Ihr vertrauenswürdiger Concierge- & Hospitality-Partner in Luxemburg. Lifestyle, Corporate Support, Relocation und VIP-Hospitality."
  },
  "nav": {
    "home": "Home", "about": "Über uns", "services": "Leistungen", "approach": "Prozess",
    "work": "Kunden", "contact": "Kontakt", "speak": "Beratung", "language": "Sprache"
  },
  "hero": {
    "partner": "Ihr vertrauenswürdiger Concierge- & Hospitality-Partner in Luxemburg",
    "line1": "Luxury service.",
    "line2": "Local precision.",
    "subtitle": "Massgeschneidertes Lifestyle-Management, Corporate Support, Relocation und VIP-Hospitality.",
    "cta": "Beratung starten",
    "secondary": "Leistungen ansehen",
    "tertiary": "Unser Unternehmen",
    "scroll": "Entdecken",
    "ratingLabel": "Luxemburg",
    "ratingValue": "Concierge & Hospitality"
  },
  "intro": {
    "eyebrow": "Willkommen",
    "title": "Luxury service. Local precision.",
    "body": "Ein diskreter Partner für Menschen und Organisationen, die erwarten, dass jedes Detail mit Sorgfalt erledigt wird.",
    "cta": "Über Oravi Lux",
    "ctaSecondary": "Beratung anfragen",
    "card1Title": "Mission",
    "card1Body": "Leben und Business in Luxemburg durch massgeschneiderten High-touch Support zu vereinfachen.",
    "card2Title": "Vision",
    "card2Body": "Den Massstab für moderne Concierge- und Hospitality-Exzellenz im Grossherzogtum zu setzen.",
    "card3Title": "Value Proposition",
    "card3Body": "Ein vertrauenswürdiger Ansprechpartner für Lifestyle, Corporate, Relocation, Events und VIP-Services.",
    "stat1Value": "47%",
    "stat1Label": "Ausländische Einwohner",
    "stat2Value": "181",
    "stat2Label": "Nationalitäten",
    "stat3Value": "EU Hub",
    "stat3Label": "Finanzzentrum"
  },
  "cta": {
    "eyebrow": "Nächster Schritt",
    "title": "Let Us Take Care of Every Detail",
    "body": "Erleben Sie personalisierte Concierge-Exzellenz in Luxemburg. Private Clients · Corporate Teams · Executives · Expatriates · Family Offices.",
    "email": "E-Mail",
    "call": "Telefon",
    "button": "Vertrauliche Beratung starten",
    "secondary": "Leistungen ansehen"
  },
  "contactPage": {
    "title": "Starten Sie mit einer vertraulichen Beratung",
    "subtitle": "Sagen Sie uns, was Sie brauchen. Wir koordinieren den Rest.",
    "name": "Name",
    "company": "Unternehmen",
    "email": "E-Mail",
    "message": "Wie können wir Sie unterstützen?",
    "submit": "Anfrage senden",
    "office": "Büro",
    "phone": "Telefon",
    "hours": "Verfügbarkeit"
  },
  "footer": {
    "tagline": "Ihr vertrauenswürdiger Concierge- & Hospitality-Partner in Luxemburg.",
    "navigation": "Navigation",
    "contact": "Kontakt",
    "privacy": "Datenschutz",
    "legal": "Impressum",
    "rights": "Alle Rechte vorbehalten."
  },
  "site": {
    "email": "contact@oravilux.com",
    "phone": "+352 00 000 000",
    "address": "Luxembourg City, Grand Duchy of Luxembourg",
    "hours": "Vertrauliche Beratungen nach Termin"
  },
  "process": {
    "eyebrow": "Unser Prozess",
    "title": "Eine klare Methode für massgeschneiderten Service",
    "subtitle": "Einfach, vertraulich und verantwortlich — vom ersten Gespräch bis zum laufenden Support.",
    "body": "Ein dedizierter Ansprechpartner führt Koordination, Partner-Management und Qualitäts-Follow-up.",
    "cta": "Beratung starten",
    "entryLabel": "So arbeiten wir",
    "note": "Ein dedizierter Ansprechpartner führt Koordination, Partner-Management und Qualitäts-Follow-up.",
    "steps": [
      {"title": "Consultation", "body": "Ein vertrauliches Erstgespräch zu Ihren Prioritäten und Ihrem Kontext."},
      {"title": "Needs Assessment", "body": "Wir klären Lifestyle-, Corporate-, Relocation- oder VIP-Anforderungen im Detail."},
      {"title": "Personalized Solution", "body": "Ein massgeschneiderter Plan, Partner und Service-Modell nach Ihren Standards."},
      {"title": "Execution", "body": "Präzise Umsetzung mit einem Ansprechpartner und Boardroom-Diskretion."},
      {"title": "Ongoing Support", "body": "Laufende Koordination, Qualitäts-Follow-up und Support, der mitwächst."}
    ]
  },
  "packages": {
    "eyebrow": "Service-Pakete",
    "title": "Flexibler Zugang zu Premium-Support",
    "body": "Wählen Sie ein strukturiertes Concierge-Paket oder ein massgeschneidertes VIP-Arrangement.",
    "cta": "Paket besprechen"
  },
  "testimonials": {
    "eyebrow": "Kundenstimmen",
    "title": "Trusted by demanding clients",
    "body": "Illustrative Samples — vor Veröffentlichung durch freigegebene Kundenstimmen ersetzen.",
    "cta": "Beratung starten"
  }
}

write_locale(r"c:\projects\lami\messages\fr.json", fr)
write_locale(r"c:\projects\lami\messages\de.json", de)
