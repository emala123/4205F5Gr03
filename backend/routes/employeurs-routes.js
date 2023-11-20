const express = require("express");

const controleursEmployeurs = require("../controllers/employeurs-controlleurs")
const router = express.Router();


router.post('/inscription', controleursEmployeurs.inscription);

router.post('/connexion', controleursEmployeurs.connexion);

router.patch("/modifier/:employeurId", controleursEmployeurs.updateEmployeur);

module.exports = router;