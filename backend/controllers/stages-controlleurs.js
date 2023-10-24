const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");

const Stage = require("../models/stage");
const Employeur = require("../models/employeur");

const getToutLesStages = async (requete, reponse, next) => {
    let stages;

    try {
        stages = await Stage.find({});
      } catch {
        return next(new HttpErreur("Une erreur est survenue lors de la récupération de tout les stages!"), 500);
      }

      reponse.json({
        stages: stages.map(stage =>
            stage.toObject({ getters: true })
        ) });
}

const getStagesEmployeur = async (requete, reponse, next) => {
    const employeurId = requete.params.employeurId;

    let stages;

    try {
        let  employeur = await Employeur.findById(employeurId).populate("stages");
       
        stages =  employeur.stages;
       console.log(employeur);
         
       } catch (err) {
         return next(
           new HttpErreur(
             "Erreur lors de la récupération des stages de l'employeur",
             500
           )
         );
       }

    if (!stages || stages.length === 0) {
        return next(
          new HttpErreur("Aucun stage trouvé pour l'employeur fourni", 404));
    }

    reponse.json({
        stages: stages.map((stage) => stage.toObject({ getters: true })),
      });
}

const ajouterEmployeurStage = async (requete, reponse, next) => {
    const { nom, courriel, telephone, adresse, description, remuneration} = requete.body;

    const nouveauStage = new Stage({
        nom,
    
        courriel,
    
        telephone,
    
        adresse,
    
        description,
    
        remuneration
      });

      const employeurId = requete.params.employeurId;

      let employeur;

      try{
        employeur = await Employeur.findById(employeurId);
      }catch (err) {
        return next(new HttpErreur("Une erreur est survenue lors de la récupération de l'employeur", 500));
      }

      if (!employeur) {
        return next(new HttpErreur("Employeur non trouvé selon le id"), 504);
      }

      try {
        console.log("Le stage: " + nouveauStage);
        await nouveauStage.save();
        employeur.stages.push(nouveauStage);
        await employeur.save();
    
      } catch (err) {
        const erreur = new HttpErreur("Création du stage échouée", 500);
    
        return next(erreur);
      }

      reponse.status(201).json({ stage: nouveauStage });
}


const ajouterStage = async (requete, reponse, next) => {
  const { nom, courriel, telephone, adresse, description, remuneration } = requete.body;

  const nouveauStage = new Stage({
    nom,
    courriel,
    telephone,
    adresse,
    description,
    remuneration
  });

  try {
    await nouveauStage.save();
  } catch (err) {
    const erreur = new HttpErreur("Création du stage échouée", 500);
    return next(erreur);
  }

  reponse.status(201).json({ stage: nouveauStage });


  
};

const updateStage = async (requete, reponse, next) => {
  const { nom, courriel, telephone, adresse, description, remuneration } = requete.body;
  const { stageId } = requete.params;

  try {
    let stage = await Stage.findById(stageId);

    if (!stage) {
      return next(new HttpErreur("Stage non trouvé", 404));
    }

    stage.nom = nom;
    stage.courriel = courriel;
    stage.telephone = telephone;
    stage.adresse = adresse;
    stage.description = description;
    stage.remuneration = remuneration;

    await stage.save();
    
    reponse.status(200).json({ stage: stage.toObject({ getters: true }) });
  } catch (err) {
    return next(new HttpErreur("Erreur lors de la mise à jour d'un stage", 500));
  }
};




exports.getToutLesStages = getToutLesStages;
exports.getStagesEmployeur = getStagesEmployeur;
exports.ajouterEmployeurStage = ajouterEmployeurStage;
exports.ajouterStage = ajouterStage;
exports.updateStage = updateStage;