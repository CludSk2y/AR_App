const sequelize = require("./src/config/database");
const Product = require("./src/models/Product");

const productsData = [
  {
    name: "Daikin Sensira 12000 BTU",
    category: "Split System",
    price: 4890.0,
    description:
      "Climatiseur Daikin Sensira ultra-silencieux, offrant une efficacité énergétique optimale et un confort thermique supérieur pour les espaces résidentiels.",
    image: "daikin_sensira.jpg",
    badge: "BEST SELLER",
    specs: "A+++, R32 Gas",
  },
  {
    name: "Carrier Infinity Centralized",
    category: "Central Units",
    price: 21500.0,
    description:
      "Système de climatisation centralisée Carrier Infinity haut de gamme, conçu pour la régulation thermique avancée des grands bâtiments et espaces industriels.",
    image: "carrier_infinity.jpg",
    badge: "Industrial",
    specs: "Centralized System",
  },
  {
    name: "Mitsubishi Electric Multi",
    category: "Split System",
    price: 12400.0,
    description:
      "Unité multi-split Mitsubishi Electric performante avec technologie Inverter avancée, garantissant des économies d'énergie substantielles.",
    image: "mitsubishi_multi.jpg",
    badge: "ECO-TECH",
    specs: "A++, Inverter",
  },
  {
    name: "LG Cassette Commercial 24k",
    category: "Central Units",
    price: 8990.0,
    description:
      "Climatiseur cassette LG à diffusion d'air à 360°, parfait pour les bureaux, commerces et espaces professionnels nécessitant une intégration discrète.",
    image: "lg_cassette.jpg",
    badge: "360 Air",
    specs: "Commercial Cassette",
  },
  {
    name: "Samsung Floor Standing AC",
    category: "Standing AC",
    price: 7550.0,
    description:
      "Climatiseur armoire Samsung au design élégant, doté de la fonction Fast Cool pour un rafraîchissement rapide des grands volumes.",
    image: "samsung_floor.jpg",
    badge: "Fast Cool",
    specs: "Floor Standing",
  },
  {
    name: "Smart Control Pro",
    category: "Smart Control",
    price: 1290.0,
    description:
      "Boîtier de commande intelligent Wi-Fi pour la gestion et le pilotage à distance de vos installations de climatisation et de chauffage.",
    image: "smart.jpg",
    badge: "Wi-Fi",
    specs: "App-Connect",
  },
];

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ force: true });

    await Product.bulkCreate(productsData);
    console.log(
      "All products have been successfully seeded into the database with prices in DH!",
    );

    process.exit(0);
  } catch (error) {
    console.error("Error occurred during the seeding process:", error);
    process.exit(1);
  }
}

seedDatabase();
