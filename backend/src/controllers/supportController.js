const Support = require("../models/Support");

exports.getSupportInfo = async (req, res) => {
  try {
    let support = await Support.findOne();

    if (!support) {
      support = await Support.create({
        technicianName: "Alaa Jaoucha",
        isOnline: true,
        whatsappNumber: "+212666936600",
        defaultMessage:
          "Bonjour ! Pour toute demande de devis, d'information ou de conseil sur nos systèmes, n'hésitez pas à nous contacter.",
        responseEta: "Moins de 5 minutes",
        specialties: [
          "Spécialiste R32",
          "Classe Énergétique A+++",
          "Éco-responsable",
        ],
      });
    } else {
      await support.update({
        technicianName: "Alaa Jaoucha",
        whatsappNumber: "+212666936600",
        defaultMessage:
          "Bonjour ! Pour toute demande de devis, d'information ou de conseil sur nos systèmes, n'hésitez pas à nous contacter.",
      });
    }

    res.status(200).json({
      success: true,
      data: support,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
