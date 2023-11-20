import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useParams, useHistory } from "react-router-dom";
import "./AffichageCandidats.css";

const AffichageCandidats = () => {
  const [etudiantsDetails, setEtudiantsDetails] = useState([]);
  const [tableauEtudiant, setTabEtudiants] = useState([]);
  const { error, sendRequest, clearError } = useHttpClient();

  const { stageId } = useParams();

  useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    const recupererStage = async () => {
      try {
        const reponseData = await sendRequest(
          `http://localhost:5000/` + `stages/recupererStage/${stageId}`
        );
        setTabEtudiants(reponseData.stage.etudiants);
      } catch (erreur) {
        console.log(erreur);
      }
    };
    recupererStage();
  }, [sendRequest, stageId]);

  useEffect(() => {
    const recupererEtudiantsDetails = async () => {
      const details = await Promise.all(
        tableauEtudiant.map(async (etudiantId) => {
          try {
            const reponseData = await sendRequest(
              `http://localhost:5000/etudiants/recupererEtudiant/${etudiantId}`
            );
            return reponseData.etudiant;
          } catch (erreur) {
            console.log(erreur);
            return null;
          }
        })
      );

      // Filtrer les détails null (erreurs) et mettre à jour l'état
      setEtudiantsDetails(details.filter((detail) => detail !== null));
    };

    recupererEtudiantsDetails();
  }, [sendRequest, tableauEtudiant]);

  console.log("étudiantsDetails:", etudiantsDetails);

  return (
    <div className="candidats-page">
        <h2>Voici les étudiants qui ont postuler pour ce stage:</h2>
        <ul>
        {etudiantsDetails.map((etudiant) => (
          <li key={etudiant._id}>
            <h3>Voici les coordonné du stagiaire: </h3>
            <p>Prenom et nom : {etudiant.prenom} {etudiant.nom}</p>
            <p>Courriel : {etudiant.courriel}</p>
            <p>Téléphone : {etudiant.telephone}</p>
            <p>Adresse : {etudiant.adresse}</p>
            <br/>
            {etudiant.postulations.map((datePostul) => {
                return datePostul.stage == stageId ? (
                    <p>Date de postulation: {datePostul.datePostulation}</p>
                ) : null;
            
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AffichageCandidats;
