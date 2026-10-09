const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Support = sequelize.define("Support", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  technicianName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Alaa Jaoucha",
  },
  isOnline: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  whatsappNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "+212666936600",
  },
  defaultMessage: {
    type: DataTypes.TEXT,
    defaultValue:
      "Bonjour ! Pour toute demande de devis, d'information ou de conseil sur nos systèmes, n'hésitez pas à nous contacter.",
  },
  responseEta: {
    type: DataTypes.STRING,
    defaultValue: "Moins de 5 minutes",
  },
  specialties: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [
      "Spécialiste R32",
      "Classe Énergétique A+++",
      "Éco-responsable",
    ],
  },
});

module.exports = Support;
