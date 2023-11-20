const express = require("express");

const controleursEtudiants = require("../controllers/etudiants-controlleurs")
const router = express.Router();


router.post('/inscription', controleursEtudiants.inscription);

router.post('/connexion', controleursEtudiants.connexion);

router.patch("/modifier/:etudiantId", controleursEtudiants.updateEtudiant);

router.post("/inscrireStage/:stageId/:etudiantId", controleursEtudiants.inscrireStage);

router.get("/recupererEtudiant/:etudiantId", controleursEtudiants.recupererEtudiant);

module.exports = router;