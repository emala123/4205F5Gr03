const express = require("express");

const controleursStages = require("../controllers/stages-controlleurs")
const router = express.Router();

router.get("/", controleursStages.getToutLesStages);

router.get("/:employeurId", controleursStages.getStagesEmployeur);

router.post("/ajouterStage/:employeurId", controleursStages.ajouterEmployeurStage);

router.post("/ajouterUnStage", controleursStages.ajouterStage)

router.patch("/modifierStage/:employeurId/:stageId", controleursStages.updateStage);

router.delete("/supprimerStage/:employeurId/:stageId", controleursStages.supprimerStage);

router.get("/recupererStage/:stageId", controleursStages.recupererStage);

module.exports = router;