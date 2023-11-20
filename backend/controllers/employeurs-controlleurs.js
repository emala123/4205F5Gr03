const HttpErreur = require("../models/http-erreur");

const Employeur = require("../models/employeur");
const Stage = require("../models/stage");
const { default: mongoose } = require("mongoose");

const inscription = async (requete, reponse, next) => {
    
    const { nomEtreprise, adresse, prenom, nom, telephone, posteTelephone, courriel, motDePasse} = requete.body;

    let employeurExiste;`
    `
    try {
        employeurExiste = await Employeur.findOne({ courriel: courriel });
      } catch {
        return next(new HttpErreur("Échec vérification employeur existe", 500));
      }

      if (employeurExiste) {
        return next(
          new HttpErreur("Employeur existe déjà, veuillez vos connecter", 422)
        );
    }

    let nouvelEmployeur = new Employeur({
        nomEtreprise,
        adresse,
        prenom,
        nom,
        telephone,
        posteTelephone,
        courriel,
        motDePasse,
        stages: [],
      });

      try{
        await nouvelEmployeur.save();
      } catch (err) {
        console.log(err);
        return next(new HttpErreur("Erreur lors de l'ajout de l'employeur", 422));
      }
      reponse
    .status(201)
    .json({ employeur: nouvelEmployeur.toObject({ getter: true }) });
}

const connexion = async (requete, reponse, next) => {
    const { courriel, motDePasse } = requete.body;

    let employeurExiste;

    try {
        employeurExiste = await Employeur.findOne({ courriel: courriel });
      } catch {
        return next(new HttpErreur("Échec vérification employeur existe", 500));
      }

      if (!employeurExiste || employeurExiste.motDePasse !== motDePasse) {
        return next(new HttpErreur("Courriel ou mot de passe incorrect", 401));
      }

      reponse.json({
        message: "connexion réussie!",
        employeur: employeurExiste.toObject({ getters: true }),
      });
}

const updateEmployeur = async (requete, reponse, next) => {
    const { nomEtreprise, adresse, prenom, nom, telephone, posteTelephone } = requete.body;
    const employeurId = requete.params.employeurId;

    let employeur;

    try {
        employeur = await Employeur.findById(employeurId);
        employeur.nomEtreprise = nomEtreprise;
        employeur.adresse = adresse;
        employeur.prenom = prenom;
        employeur.nom = nom;
        employeur.telephone = telephone;
        employeur.posteTelephone = posteTelephone;
        await employeur.save();
      } catch {
        return next(
          new HttpErreur("Erreur lors de la mise à jour d'un employeur", 500)
        );
      }

      reponse.status(200).json({ employeur: employeur.toObject({ getters: true }) });
}

exports.inscription = inscription;
exports.connexion = connexion;
exports.updateEmployeur = updateEmployeur;