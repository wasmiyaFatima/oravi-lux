const fs = require("fs");

const sharedCta = {
  fr: "Démarrer une consultation confidentielle",
  de: "Vertrauliche Beratung starten",
};

const enrich = {
  fr: {
    concierge: {
      eyebrow: "Conciergerie personnelle Luxembourg",
      cta: sharedCta.fr,
      introEyebrow: "Présentation",
      introTitle: "Une conciergerie de luxe pour le quotidien au Luxembourg",
      pointsTitle: "Ce que nous prenons en charge",
      forWhomEyebrow: "Pour qui",
      forWhomTitle: "Des clients privés qui attendent une gestion lifestyle discrète",
      forWhomBody:
        "Conçu pour les résidents et visiteurs au Luxembourg, en France et en Allemagne qui souhaitent une conciergerie privée pour le lifestyle, les arrangements VIP et les réservations — sans gérer chaque détail eux-mêmes.",
      approachEyebrow: "Notre façon de travailler",
      approachTitle: "Une exécution calme et responsable des demandes de conciergerie",
      approachBody:
        "Chaque mission suit notre méthode claire : consultation, analyse des besoins, solution personnalisée, exécution précise et accompagnement continu — pilotés par un interlocuteur dédié.",
      approachSteps: [
        "Nous commençons par une consultation confidentielle pour comprendre votre style de vie, vos priorités et votre niveau d’implication souhaité.",
        "Les demandes sont coordonnées avec des partenaires de confiance au Luxembourg et dans la Grande Région, avec précision et discrétion.",
        "Vous bénéficiez d’un suivi clair et d’une continuité — pour que vos besoins lifestyle restent organisés dans la durée.",
      ],
      ctaTitle: "Dites-nous ce dont vous avez besoin. Nous coordonnerons le reste.",
      ctaBody:
        "Démarrez une consultation confidentielle pour des services de conciergerie de luxe au Luxembourg — adaptés à la vie privée, aux voyages et à l’hospitalité VIP.",
    },
    "corporate-concierge": {
      eyebrow: "Conciergerie corporate Luxembourg",
      cta: sharedCta.fr,
      introEyebrow: "Présentation",
      introTitle: "Un support exécutif qui protège concentration et hospitalité",
      pointsTitle: "Ce que nous prenons en charge",
      forWhomEyebrow: "Pour qui",
      forWhomTitle: "Équipes de direction, entreprises et dirigeants en visite",
      forWhomBody:
        "Pensé pour les entreprises et dirigeants opérant entre le Luxembourg, la France et l’Allemagne — là où visites de board, hospitalité clients et voyages d’affaires exigent une discrétion de niveau boardroom.",
      approachEyebrow: "Notre façon de travailler",
      approachTitle: "Coordination corporate avec un interlocuteur responsable",
      approachBody:
        "De la consultation au suivi continu, un contact dédié pilote partenaires et qualité — pour que votre équipe reste concentrée sur l’essentiel.",
      approachSteps: [
        "Nous évaluons agendas exécutifs, besoins des invités et standards d’hospitalité avant toute réservation.",
        "Voyages, réunions et accueil clients sont exécutés avec une précision de timing au Luxembourg et en cross-border.",
        "Nous restons disponibles pour ajustements, changements de dernière minute et assistance exécutive continue.",
      ],
      ctaTitle: "Étendez votre bureau exécutif avec un support local discret",
      ctaBody:
        "Demandez une consultation confidentielle pour la conciergerie corporate et le support exécutif au Luxembourg.",
    },
    relocation: {
      eyebrow: "Services de relocation Luxembourg",
      cta: sharedCta.fr,
      introEyebrow: "Présentation",
      introTitle: "Un accompagnement relocation de l’arrivée à une vie installée",
      pointsTitle: "Ce que nous prenons en charge",
      forWhomEyebrow: "Pour qui",
      forWhomTitle: "Professionnels, familles expatriées et dirigeants en mobilité",
      forWhomBody:
        "Pour les professionnels et familles s’installant au Luxembourg depuis la France, l’Allemagne et au-delà — qui ont besoin de logement, écoles, installation et coordination pratique gérés avec soin.",
      approachEyebrow: "Notre façon de travailler",
      approachTitle: "Un parcours relocation structuré, guidé humainement",
      approachBody:
        "Notre processus garde la relocation simple, confidentielle et responsable : analyse des besoins, plan personnalisé, exécution pratique et présence continue à l’installation.",
      approachSteps: [
        "Une consultation clarifie priorités logement, besoins scolaires, délais et exigences familiales ou exécutives.",
        "Nous coordonnons recherches, rendez-vous et tâches d’installation avec des contacts locaux de confiance.",
        "Le soutien se poursuit après l’arrivée — utilités, orientation et détails qui font du Luxembourg un chez-soi.",
      ],
      ctaTitle: "Rendez votre installation au Luxembourg plus sereine",
      ctaBody:
        "Démarrez une consultation confidentielle pour les services de relocation au Luxembourg — particuliers, familles et transferts exécutifs.",
    },
    hospitality: {
      eyebrow: "Hospitalité VIP Luxembourg",
      cta: sharedCta.fr,
      introEyebrow: "Présentation",
      introTitle: "Des services d’hospitalité qui protègent la première impression",
      pointsTitle: "Ce que nous prenons en charge",
      forWhomEyebrow: "Pour qui",
      forWhomTitle: "Invités VIP, délégations et programmes d’hospitalité corporate",
      forWhomBody:
        "Pour clients privés et organisations accueillant des invités au Luxembourg — y compris depuis la France et l’Allemagne — qui ont besoin de services aéroport, hébergement et accueil gérés impeccablement.",
      approachEyebrow: "Notre façon de travailler",
      approachTitle: "Des parcours invités planifiés avec une précision discrète",
      approachBody:
        "Un interlocuteur dédié pilote gestion des invités, partenaires et hospitalité sur site — du brief à l’au revoir.",
      approachSteps: [
        "Nous cartographions le parcours invité : arrivée, transferts, hébergement, accueil et départ.",
        "Services aéroport VIP, chauffeurs et hosts sont coordonnés à la minute.",
        "L’hospitalité sur site reste discrète, ponctuelle et alignée sur vos standards.",
      ],
      ctaTitle: "Recevez avec élégance. Arrivez avec sérénité.",
      ctaBody:
        "Réservez une consultation confidentielle pour l’hospitalité VIP et la gestion d’invités au Luxembourg.",
    },
    "personal-assistance": {
      eyebrow: "Assistance personnelle Luxembourg",
      cta: sharedCta.fr,
      introEyebrow: "Présentation",
      introTitle: "Votre bureau personnel pour l’administratif du quotidien",
      pointsTitle: "Ce que nous prenons en charge",
      forWhomEyebrow: "Pour qui",
      forWhomTitle: "Des clients privés actifs qui veulent gagner du temps",
      forWhomBody:
        "Idéal pour les résidents du Luxembourg et de la Grande Région — y compris des clients liés à la France et à l’Allemagne — qui ont besoin de gestion de tâches, rendez-vous et organisation lifestyle via un canal de confiance unique.",
      approachEyebrow: "Notre façon de travailler",
      approachTitle: "Un soutien récurrent, avec un suivi discret",
      approachBody:
        "Nous évaluons les priorités, définissons un rythme d’assistance personnalisé, exécutons avec soin et accompagnons l’évolution des besoins.",
      approachSteps: [
        "Une consultation définit les tâches à déléguer — et celles qui nécessitent votre validation.",
        "Agenda, shopping et demandes liées au domicile sont gérés avec une communication claire.",
        "L’assistance continue maintient l’administratif personnel organisé semaine après semaine.",
      ],
      ctaTitle: "Moins d’interruptions. Plus de clarté.",
      ctaBody:
        "Démarrez une consultation confidentielle pour l’assistance personnelle au Luxembourg.",
    },
    "executive-family-office": {
      eyebrow: "Support family office Luxembourg",
      cta: sharedCta.fr,
      introEyebrow: "Présentation",
      introTitle: "Un soutien confidentiel pour des vies complexes",
      pointsTitle: "Ce que nous prenons en charge",
      forWhomEyebrow: "Pour qui",
      forWhomTitle: "Dirigeants, entrepreneurs, family offices et clients private banking",
      forWhomBody:
        "Pour des clients dont la vie s’étend entre Luxembourg, France et Allemagne — et qui ont besoin de gestion d’agenda, voyages, événements et assistance confidentielle traités avec une discrétion absolue.",
      approachEyebrow: "Notre façon de travailler",
      approachTitle: "Un soutien structuré, pensé pour la confidentialité",
      approachBody:
        "Consultation confidentielle, analyse attentive des besoins et rythme opérationnel personnalisé — exécutés par un lead dédié avec coordination multilingue.",
      approachSteps: [
        "Nous comprenons priorités sensibles, rythmes du foyer et contraintes professionnelles avant d’agir.",
        "Voyages, agendas et événements privés sont coordonnés via un réseau local de confiance.",
        "Le support family office reste discret, réactif et responsable dans la durée.",
      ],
      ctaTitle: "Une coordination confidentielle pour des vies exigeantes",
      ctaBody:
        "Demandez une consultation confidentielle pour le support exécutif et family office au Luxembourg.",
    },
    "luxury-travel": {
      eyebrow: "Voyage de luxe Luxembourg",
      cta: sharedCta.fr,
      introEyebrow: "Présentation",
      introTitle: "Une gestion de voyage conçue autour de votre temps",
      pointsTitle: "Ce que nous prenons en charge",
      forWhomEyebrow: "Pour qui",
      forWhomTitle: "Dirigeants et clients privés qui voyagent avec intention",
      forWhomBody:
        "Pour voyageurs d’affaires et privés basés au Luxembourg ou en transit via la France et l’Allemagne — qui ont besoin de gestion de voyage de luxe, hôtels et expériences conciergerie gérés avec précision.",
      approachEyebrow: "Notre façon de travailler",
      approachTitle: "Une coordination de porte à destination",
      approachBody:
        "Nous concevons l’itinéraire, gérons réservations et changements, et maintenons un interlocuteur dédié responsable du départ à l’arrivée.",
      approachSteps: [
        "La consultation clarifie timing, préférences de confidentialité et standards de voyage.",
        "Vols, hôtels, logistique au sol et expériences sont coordonnés avec soin.",
        "Changements de dernière minute et support voyage continu font partie du service.",
      ],
      ctaTitle: "Voyagez avec moins de friction",
      ctaBody:
        "Démarrez une consultation confidentielle pour la gestion de voyages de luxe au Luxembourg.",
    },
    events: {
      eyebrow: "Gestion d’événements Luxembourg",
      cta: sharedCta.fr,
      introEyebrow: "Présentation",
      introTitle: "Événements et expériences, impeccablement accueillis",
      pointsTitle: "Ce que nous prenons en charge",
      forWhomEyebrow: "Pour qui",
      forWhomTitle: "Hôtes corporate et clients privés préparant des moments mémorables",
      forWhomBody:
        "Pour entreprises et clients privés organisant des événements au Luxembourg — souvent avec des invités de France et d’Allemagne — qui ont besoin que concept, lieu, parcours invité et hospitalité soient alignés sous un lead unique.",
      approachEyebrow: "Notre façon de travailler",
      approachTitle: "Du concept à l’hospitalité sur site",
      approachBody:
        "Nous analysons l’occasion, concevons un plan personnalisé, exécutons avec des fournisseurs de confiance et assurons la coordination sur site avec une élégance discrète.",
      approachSteps: [
        "Une consultation définit l’intention, le profil des invités, le ton et les contraintes pratiques.",
        "Lieu, fournisseurs et flux invités sont coordonnés avec un lead de service responsable.",
        "Hospitalité sur site et suivi rendent la soirée fluide pour chacun.",
      ],
      ctaTitle: "Organisez une occasion qui semble sans effort",
      ctaBody:
        "Demandez une consultation confidentielle pour la gestion d’événements et expériences exclusives au Luxembourg.",
    },
    property: {
      eyebrow: "Gestion de biens Luxembourg",
      cta: sharedCta.fr,
      introEyebrow: "Présentation",
      introTitle: "Entretien property & lifestyle, chez vous ou à distance",
      pointsTitle: "Ce que nous prenons en charge",
      forWhomEyebrow: "Pour qui",
      forWhomTitle: "Propriétaires de résidences principales, secondaires et actifs lifestyle",
      forWhomBody:
        "Pour propriétaires au Luxembourg au style de vie international entre France et Allemagne — qui ont besoin de supervision, maintenance et support maison gérés avec discrétion.",
      approachEyebrow: "Notre façon de travailler",
      approachTitle: "Une maintenance préventive avec des fournisseurs de confiance",
      approachBody:
        "Nous évaluons la résidence, définissons un rythme de supervision, coordonnons maintenance et staffing, et rapportons discrètement pour que les maisons restent prêtes à l’arrivée.",
      approachSteps: [
        "La consultation clarifie priorités du bien, accès, fournisseurs et préférences de reporting.",
        "Supervision et maintenance sont coordonnées via des partenaires de confiance.",
        "La gestion lifestyle continue garde les résidences prêtes entre deux séjours.",
      ],
      ctaTitle: "Gardez votre résidence parfaitement tenue, en silence",
      ctaBody:
        "Démarrez une consultation confidentielle pour la gestion property & lifestyle au Luxembourg.",
    },
  },
  de: {
    concierge: {
      eyebrow: "Persönlicher Concierge Luxemburg",
      cta: sharedCta.de,
      introEyebrow: "Überblick",
      introTitle: "Luxus-Concierge für den Alltag in Luxemburg",
      pointsTitle: "Was wir übernehmen",
      forWhomEyebrow: "Für wen",
      forWhomTitle: "Privatkunden, die diskretes Lifestyle-Management erwarten",
      forWhomBody:
        "Für Einwohner und Gäste in Luxemburg, Frankreich und Deutschland, die einen privaten Concierge für Lifestyle, VIP-Arrangements und Reservierungen wünschen — ohne jedes Detail selbst zu steuern.",
      approachEyebrow: "So arbeiten wir",
      approachTitle: "Ruhige, verantwortliche Umsetzung von Concierge-Anfragen",
      approachBody:
        "Jedes Mandat folgt unserer klaren Methode: Beratung, Bedarfsanalyse, personalisierte Lösung, präzise Ausführung und laufende Betreuung — geführt von einem dedizierten Ansprechpartner.",
      approachSteps: [
        "Wir beginnen mit einer vertraulichen Beratung zu Lifestyle, Prioritäten und gewünschtem Involvement.",
        "Anfragen werden mit vertrauenswürdigen Partnern in Luxemburg und der Großregion koordiniert — mit Timing und Diskretion.",
        "Sie erhalten klares Follow-up und Kontinuität — damit wiederkehrende Lifestyle-Bedürfnisse organisiert bleiben.",
      ],
      ctaTitle: "Sagen Sie uns, was Sie brauchen. Wir koordinieren den Rest.",
      ctaBody:
        "Starten Sie eine vertrauliche Beratung für Luxury-Concierge-Services in Luxemburg — für Privatleben, Reisen und VIP-Hospitality.",
    },
    "corporate-concierge": {
      eyebrow: "Corporate Concierge Luxemburg",
      cta: sharedCta.de,
      introEyebrow: "Überblick",
      introTitle: "Executive Support, der Fokus und Hospitality schützt",
      pointsTitle: "Was wir übernehmen",
      forWhomEyebrow: "Für wen",
      forWhomTitle: "Führungsteams, Unternehmen und zu Besuch kommende Executives",
      forWhomBody:
        "Für Unternehmen und Führungskräfte zwischen Luxemburg, Frankreich und Deutschland — wo Board-Visits, Client Hospitality und Business Travel Boardroom-Diskretion verlangen.",
      approachEyebrow: "So arbeiten wir",
      approachTitle: "Corporate-Koordination mit einem verantwortlichen Lead",
      approachBody:
        "Von der Beratung bis zur laufenden Betreuung steuert ein dedizierter Kontakt Partner und Qualität — damit Ihr Team fokussiert bleibt.",
      approachSteps: [
        "Wir bewerten Executive-Kalender, Gästebedarf und Hospitality-Standards, bevor gebucht wird.",
        "Reisen, Meetings und Client Hosting werden mit präzisem Timing in Luxemburg und grenzüberschreitend umgesetzt.",
        "Wir bleiben verfügbar für Anpassungen, Last-Minute-Änderungen und laufende Executive Assistance.",
      ],
      ctaTitle: "Erweitern Sie Ihr Executive Office mit diskretem lokalem Support",
      ctaBody:
        "Bitten Sie um eine vertrauliche Beratung für Corporate Concierge und Executive Support in Luxemburg.",
    },
    relocation: {
      eyebrow: "Relocation-Services Luxemburg",
      cta: sharedCta.de,
      introEyebrow: "Überblick",
      introTitle: "Relocation-Support von der Ankunft bis zum Einleben",
      pointsTitle: "Was wir übernehmen",
      forWhomEyebrow: "Für wen",
      forWhomTitle: "Fachkräfte, Expat-Familien und umziehende Führungskräfte",
      forWhomBody:
        "Für internationale Professionals und Familien, die nach Luxemburg aus Frankreich, Deutschland und darüber hinaus ziehen — und Wohnung, Schulen, Settling-in und praktische Koordination mit Sorgfalt brauchen.",
      approachEyebrow: "So arbeiten wir",
      approachTitle: "Ein strukturierter Relocation-Pfad mit menschlicher Begleitung",
      approachBody:
        "Unser Prozess hält Relocation einfach, vertraulich und verantwortlich: Bedarf klären, Plan personalisieren, praktische Schritte ausführen und beim Einleben präsent bleiben.",
      approachSteps: [
        "Eine Beratung klärt Wohnprioritäten, Schulbedarf, Timelines und familiäre oder Executive-Anforderungen.",
        "Wir koordinieren Suche, Termine und Settling-in mit vertrauenswürdigen lokalen Kontakten.",
        "Support geht nach der Ankunft weiter — Versorger, Orientierung und Details, die Luxemburg zum Zuhause machen.",
      ],
      ctaTitle: "Machen Sie Ihren Umzug nach Luxemburg handhabbar",
      ctaBody:
        "Starten Sie eine vertrauliche Beratung für Relocation-Services in Luxemburg — für Einzelpersonen, Familien und Executive Transfers.",
    },
    hospitality: {
      eyebrow: "VIP-Hospitality Luxemburg",
      cta: sharedCta.de,
      introEyebrow: "Überblick",
      introTitle: "Hospitality-Services, die den ersten Eindruck schützen",
      pointsTitle: "Was wir übernehmen",
      forWhomEyebrow: "Für wen",
      forWhomTitle: "VIP-Gäste, Delegationen und Corporate-Hospitality-Programme",
      forWhomBody:
        "Für Privatkunden und Organisationen, die Gäste in Luxemburg empfangen — auch aus Frankreich und Deutschland — und Flughafen-Services, Unterkunft und Welcome tadellos gesteuert brauchen.",
      approachEyebrow: "So arbeiten wir",
      approachTitle: "Gästereisen mit ruhiger Präzision geplant",
      approachBody:
        "Ein dedizierter Kontakt führt Guest Management, Partner und On-Site-Hospitality — vom Briefing bis zum Abschied.",
      approachSteps: [
        "Wir kartieren die Guest Journey: Ankunft, Transfers, Unterkunft, Hosting und Abreise.",
        "VIP-Airport-Services, Chauffeure und Hosts werden minutengenau koordiniert.",
        "On-Site-Hospitality bleibt diskret, pünktlich und an Ihren Standards ausgerichtet.",
      ],
      ctaTitle: "Empfangen Sie mit Haltung. Kommen Sie mit Ruhe an.",
      ctaBody:
        "Vereinbaren Sie eine vertrauliche Beratung für VIP-Hospitality und Guest Management in Luxemburg.",
    },
    "personal-assistance": {
      eyebrow: "Persönliche Assistenz Luxemburg",
      cta: sharedCta.de,
      introEyebrow: "Überblick",
      introTitle: "Ihr persönliches Büro für Life Admin",
      pointsTitle: "Was wir übernehmen",
      forWhomEyebrow: "Für wen",
      forWhomTitle: "Beschäftigte Privatkunden, die Zeit zurückgewinnen wollen",
      forWhomBody:
        "Ideal für Einwohner Luxemburgs und der Großregion — inklusive Kunden mit Bezügen zu Frankreich und Deutschland — die Aufgaben, Termine und Lifestyle-Organisation über einen vertrauenswürdigen Kanal brauchen.",
      approachEyebrow: "So arbeiten wir",
      approachTitle: "Wiederkehrender Support mit diskretem Follow-through",
      approachBody:
        "Wir klären Prioritäten, setzen einen personalisierten Assistenz-Rhythmus, führen sorgfältig aus und begleiten sich wandelnde Bedürfnisse.",
      approachSteps: [
        "Eine Beratung definiert, welche Aufgaben Ihr Desk verlassen — und welche Ihre Freigabe brauchen.",
        "Scheduling, Shopping und Home-Requests werden mit klarer Kommunikation gesteuert.",
        "Laufende Assistenz hält die persönliche Administration Woche für Woche organisiert.",
      ],
      ctaTitle: "Weniger Unterbrechungen. Mehr Klarheit.",
      ctaBody:
        "Starten Sie eine vertrauliche Beratung für Personal Assistance in Luxemburg.",
    },
    "executive-family-office": {
      eyebrow: "Family-Office-Support Luxemburg",
      cta: sharedCta.de,
      introEyebrow: "Überblick",
      introTitle: "Vertraulicher Support für komplexe private Leben",
      pointsTitle: "Was wir übernehmen",
      forWhomEyebrow: "Für wen",
      forWhomTitle: "Executives, Unternehmer, Family Offices und Private-Banking-Kunden",
      forWhomBody:
        "Für Kunden, deren Leben Luxemburg, Frankreich und Deutschland verbindet — und die Kalender, Reisen, Events und vertrauliche Assistenz mit absoluter Diskretion brauchen.",
      approachEyebrow: "So arbeiten wir",
      approachTitle: "Strukturierter Support mit Privacy by Design",
      approachBody:
        "Vertrauliche Beratung, sorgfältige Bedarfsanalyse und personalisierter Betriebsrhythmus — ausgeführt von einem dedizierten Lead mit mehrsprachiger Koordination.",
      approachSteps: [
        "Wir verstehen sensible Prioritäten, Haushaltsrhythmen und berufliche Constraints, bevor wir handeln.",
        "Reisen, Kalender und private Events werden über ein vertrauenswürdiges lokales Netzwerk koordiniert.",
        "Laufender Family-Office-Support bleibt diskret, responsiv und verantwortlich.",
      ],
      ctaTitle: "Vertrauliche Koordination für komplexe Leben",
      ctaBody:
        "Bitten Sie um eine vertrauliche Beratung für Executive- und Family-Office-Support in Luxemburg.",
    },
    "luxury-travel": {
      eyebrow: "Luxury Travel Luxemburg",
      cta: sharedCta.de,
      introEyebrow: "Überblick",
      introTitle: "Travel Management, das um Ihre Zeit herum gebaut ist",
      pointsTitle: "Was wir übernehmen",
      forWhomEyebrow: "Für wen",
      forWhomTitle: "Executives und Privatkunden, die mit Absicht reisen",
      forWhomBody:
        "Für Business- und Privatreisende mit Basis in Luxemburg oder Verbindungen über Frankreich und Deutschland — die Luxury Travel Management, Hotels und Concierge-Erlebnisse präzise gesteuert brauchen.",
      approachEyebrow: "So arbeiten wir",
      approachTitle: "Koordination von Tür zu Destination",
      approachBody:
        "Wir gestalten die Route, managen Buchungen und Änderungen und halten einen dedizierten Kontakt von Abreise bis Ankunft verantwortlich.",
      approachSteps: [
        "Die Beratung klärt Timing, Privacy-Präferenzen und Reisestandards.",
        "Flüge, Hotels, Ground Logistics und Experiences werden sorgfältig koordiniert.",
        "Last-Minute-Änderungen und laufender Travel Support gehören zum Service.",
      ],
      ctaTitle: "Reisen mit weniger Reibung",
      ctaBody:
        "Starten Sie eine vertrauliche Beratung für Luxury Travel Management in Luxemburg.",
    },
    events: {
      eyebrow: "Event-Management Luxemburg",
      cta: sharedCta.de,
      introEyebrow: "Überblick",
      introTitle: "Events und Experiences, tadellos gehostet",
      pointsTitle: "Was wir übernehmen",
      forWhomEyebrow: "Für wen",
      forWhomTitle: "Corporate Hosts und Privatkunden mit besonderen Anlässen",
      forWhomBody:
        "Für Firmen und Privatkunden, die Events in Luxemburg organisieren — oft mit Gästen aus Frankreich und Deutschland — und Konzept, Venue, Guest Journey und Hospitality unter einem Lead brauchen.",
      approachEyebrow: "So arbeiten wir",
      approachTitle: "Vom Konzept zur On-Site-Hospitality",
      approachBody:
        "Wir bewerten den Anlass, gestalten einen personalisierten Plan, führen mit vertrauenswürdigen Lieferanten aus und koordinieren on-site mit diskreter Haltung.",
      approachSteps: [
        "Eine Beratung definiert Zweck, Gästeprofil, Ton und praktische Constraints.",
        "Venue, Lieferanten und Gästefluss werden mit einem verantwortlichen Service Lead koordiniert.",
        "On-Site-Hospitality und Follow-up lassen den Abend mühelos wirken.",
      ],
      ctaTitle: "Hosten Sie einen Anlass, der mühelos wirkt",
      ctaBody:
        "Bitten Sie um eine vertrauliche Beratung für Event-Management und exclusive Experiences in Luxemburg.",
    },
    property: {
      eyebrow: "Property Management Luxemburg",
      cta: sharedCta.de,
      introEyebrow: "Überblick",
      introTitle: "Property- und Lifestyle-Care — zu Hause oder aus der Ferne",
      pointsTitle: "Was wir übernehmen",
      forWhomEyebrow: "Für wen",
      forWhomTitle: "Eigentümer von Hauptwohnsitzen, Zweitwohnungen und Lifestyle-Assets",
      forWhomBody:
        "Für Eigentümer in Luxemburg mit internationalem Lifestyle zwischen Frankreich und Deutschland — die Supervision, Maintenance und Household Support diskret gesteuert brauchen.",
      approachEyebrow: "So arbeiten wir",
      approachTitle: "Präventive Pflege mit vertrauenswürdigen Lieferanten",
      approachBody:
        "Wir bewerten die Residenz, setzen einen Supervision-Rhythmus, koordinieren Maintenance und Staffing und berichten diskret — damit Häuser ankunftsbereit bleiben.",
      approachSteps: [
        "Die Beratung klärt Property-Prioritäten, Zugang, Lieferanten und Reporting-Präferenzen.",
        "Supervision und Maintenance werden über vertrauenswürdige Partner koordiniert.",
        "Laufendes Lifestyle-Management hält Residenzen zwischen Aufenthalten bereit.",
      ],
      ctaTitle: "Halten Sie Ihre Residenz ruhig und gut geführt",
      ctaBody:
        "Starten Sie eine vertrauliche Beratung für Property- und Lifestyle-Management in Luxemburg.",
    },
  },
};

const meta = {
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

const hero = {
  fr: {
    partner: "Votre partenaire de confiance en conciergerie & hospitalité au Luxembourg",
    subtitle:
      "Gestion lifestyle sur mesure, support corporate, relocation et hospitalité VIP au Luxembourg — au service de clients privés et d’organisations au Luxembourg, en France et en Allemagne.",
  },
  de: {
    partner: "Ihr vertrauenswürdiger Concierge- & Hospitality-Partner in Luxemburg",
    subtitle:
      "Massgeschneidertes Lifestyle-Management, Corporate Support, Relocation und VIP-Hospitality in Luxemburg — für Privatkunden und Organisationen in Luxemburg, Frankreich und Deutschland.",
  },
};

for (const locale of ["fr", "de"]) {
  const path = `messages/${locale}.json`;
  const data = JSON.parse(fs.readFileSync(path, "utf8"));
  data.meta = meta[locale];
  data.hero.partner = hero[locale].partner;
  data.hero.subtitle = hero[locale].subtitle;
  for (const [slug, extra] of Object.entries(enrich[locale])) {
    data.services[slug] = { ...data.services[slug], ...extra };
  }
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  console.log("updated", locale);
}
