db.createCollection('parcours');

db.parcours.createIndex({ description: 'text' });

db.parcours.insertMany([
  {
    title: 'Génie Logiciel',
    campus: 'Paris',
    durationInMonths: 24,
    type: 'Master',
    price: 12000,
    onSitePercentage: 50,
    beginDate: '2023-02-25',
    modules: [
      {
        title: "Systèmes d'information",
        description: "Autour de la gestion d'information",
      },
      {
        titre: 'ERP',
        description: 'Préparation Certification SAP',
      },
    ],
    description:
      'Un master dédié à l’étude des systèmes d’information ainsi que leur implémentation dans les entreprises',
  },
  {
    title: 'Agronomie',
    campus: 'Strasbourg',
    durationInMonths: 24,
    type: 'DUT',
    price: 1000,
    onSitePercentage: 100,
    beginDate: '2023-01-01',
    modules: [
      {
        title: 'Trait des vaches',
        description: 'Apprentissage: Comment traire une vache comme un pro',
      },
      {
        titre: 'FOURCHE',
        description: 'Apprentissage: Combat à la fourche',
      },
    ],
    description: 'Un master dédié à devenir un bon agriculteur!',
  },
  {
    title: 'Informatique',
    campus: 'Kremlin-Bicêtre',
    durationInMonths: 60,
    type: 'Ingénieur',
    price: 50000,
    onSitePercentage: 75,
    beginDate: '2023-08-01',
    modules: [
      {
        title: 'Piscine C',
        description: 'Apprendre le C pendant une piscine intense et fructueuse en connaissances',
      },
      {
        titre: 'Mathématiques',
        description:
          "C'est important les mathématiques pour être un bon ingénieur: équations différentielles et tout le tralala",
      },
    ],
    description: "Un parcours d'ingénieur pour devenir très bon sur le marché en code tout en étant ingénieur",
  },
  {
    title: 'Commerce',
    campus: 'Rennes',
    durationInMonths: 36,
    type: 'Master 2',
    price: 1500,
    onSitePercentage: 100,
    beginDate: '2023-08-07',
    modules: [
      {
        title: 'MARK',
        description: 'Cours de marketing pour apprendre les bases',
      },
      {
        titre: 'Pilotage financier',
        description: 'Apprendre à faire un bilan et un compte de résultat',
      },
      {
        titre: "Commerce 1'o'1",
        description: 'Les fondements du commerce',
      },
    ],
    description: 'Master 2 en commerce dédié à la commercialisation des lois du marché et du marketing en entreprise',
  },
  {
    title: 'STAPS',
    campus: 'Toulouse',
    durationInMonths: 24,
    type: 'Master',
    price: 0,
    onSitePercentage: 100,
    beginDate: '2023-03-05',
    modules: [
      {
        title: 'Badminton',
        description: 'Cours de Badminton',
      },
      {
        titre: 'Tennis',
        description: 'Cours de tennis',
      },
      {
        titre: "Coach Sportif 1'O'1",
        description: 'Comment devenir un bon coach sportif',
      },
      {
        titre: 'Management',
        description: 'Bases du management',
      },
    ],
    description: 'Master pour devenir Coach sportif ou athlète de haut-niveau',
  },
  {
    title: 'Tourisme',
    campus: 'Paris',
    durationInMonths: 24,
    type: 'BTS',
    price: 500,
    onSitePercentage: 100,
    beginDate: '2023-08-01',
    modules: [
      {
        title: 'Culture générale et expression',
        description: "Cours de culture générale et d'expression afin de bien communiquer",
      },
      {
        titre: 'Anglais',
        description: 'Cours pour apprendre les termes professionnels utiles',
      },
    ],
    description: 'DUT Tourisme afin de travailler dans les métiers du tourisme',
  },
  {
    title: 'Systèmes numériques',
    campus: 'Paris 6',
    durationInMonths: 24,
    type: 'BTS',
    price: 500,
    onSitePercentage: 100,
    beginDate: '2023-08-01',
    modules: [
      {
        title: 'Informatique et réseaux',
        description: "Introduction à l'administration de réseaux locaux",
      },
      {
        titre: 'Sciences physiques',
        description: 'Découverte des composants électroniques et bien plus',
      },
    ],
    description:
      'Le BTS SN apporte des compétences en applications et systèmes informatiques organisés ou non en réseau',
  },
  {
    title: 'Professions immobilières',
    campus: 'Lille',
    durationInMonths: 24,
    type: 'BTS',
    price: 500,
    onSitePercentage: 100,
    beginDate: '2022-07-01',
    modules: [
      {
        title: 'Marketing',
        description: 'Bases du marketing pour apprendre les locations et bails',
      },
      {
        titre: 'Management',
        description: 'Apprentissage managériale',
      },
      {
        titre: 'Anglais',
        description: 'Cours pour apprendre les termes professionnels utiles',
      },
    ],
    description: 'Afin de devenir un bon vendeur immobilier, cette formation est parfaite pour vous',
  },
  {
    title: 'Médecine',
    campus: 'Lille',
    durationInMonths: 72,
    type: 'Médecine',
    price: 200,
    onSitePercentage: 100,
    beginDate: '2022-07-27',
    modules: [
      {
        title: 'Chimie et biochimie',
        description: "Modèle de l'atome, stéréochimie",
      },
      {
        titre: 'Physique et biophysique',
        description: 'Mécanique des fluides et de phénomènes de transport de particules chargées',
      },
      {
        titre: 'Sciences Humaines et Sociales et Santé publique',
        description: 'population, espérance de vie à tel âge, pourcentage de fumeurs dans telle catégorie sociale',
      },
    ],
    description: 'Dans le but de devenir docteur et tout les métiers de la santé super important !',
  },
  {
    title: 'Designer WEB',
    campus: 'Strasbourg',
    durationInMonths: 36,
    type: 'Master',
    price: 25000,
    onSitePercentage: 75,
    beginDate: '2022-08-26',
    modules: [
      {
        title: 'Bases du développement web',
        description: 'HTML, CSS, JS',
      },
      {
        titre: 'Design',
        description: 'Choix des couleurs, choix des typographies, comment mettre en forme un beau site web',
      },
    ],
    description: 'Formation dédié à devenir un designer web',
  },
]);
