import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";

const ModifierStage = () => {
    const auth = useContext(AuthContext);
    const {error, sendRequest, clearError } = useHttpClient();

    const [saisieNomEntreprise, setSaisieNomEntreprise] = useState("");
    const [saisieCourriel, setSaisieCourriel] = useState("");
    const [saisieNum, setSaisieNum] = useState("");
    const [saisieAdresseEntreprise, setSaisieAdresseEntreprise] = useState("");
    const [saisieDescriptionStage, setSaisieDesriptionStage] = useState("");
    const [saisieRemuneration, setSaisieRemuneration] = useState("");

    const employeurId = auth.userId;
    const {stageId} = useParams();

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

        const employeurStageModif = async (event) => {
            event.preventDefault();
            try{
                const reponseData = await sendRequest(
                  `http://localhost:5000/`+`stages/modifierStage/${employeurId}/${stageId}`,
                    'PATCH',
                    JSON.stringify({
                      nom: saisieNomEntreprise,
                      courriel: saisieCourriel,
                      telephone: saisieNum,
                      adresse: saisieAdresseEntreprise,
                      description: saisieDescriptionStage,
                      remuneration: saisieRemuneration,
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                console.log(reponseData.etudiant);
                alert("Votre profil à bien été modifié!");
                setSaisieNomEntreprise("");
                setSaisieCourriel("");
                setSaisieNum("");
                setSaisieAdresseEntreprise("")
                setSaisieDesriptionStage("");
                setSaisieRemuneration("");
            }catch (erreur) {
                console.log(erreur);
            }

            if (saisieNomEntreprise === "") {
                alert(
                  "Veuillez entrer le nom de l'entreprise"
                );
                return;
              } else if (saisieCourriel === "") {
                alert("Veuillez entrer l'adresse courriel");
                return;
              } else if (saisieNum === "") {
                alert("Veuillez entrer le numero de telephone");
                return;
              } else if (saisieAdresseEntreprise === "") {
                  alert("Veuillez entrer une adresse");
                  return;
              } else if (saisieDescriptionStage ==="") {
                alert("Veuillez entrer une description");
                return;
                
              } else if (saisieRemuneration === "") {
                alert("Veuillez entrer une rémunération ");
                return;
              }
        };

        function saisieNomEntrepriseHandler(event) {
            setSaisieNomEntreprise(event.target.value);
          }
        
          function saisieCourrielHandler(event) {
            setSaisieCourriel(event.target.value);
          }
        
          function saisieNumHandler(event) {
            setSaisieNum(event.target.value);
          }
        
          function saisieAdresseEntrepriseHandler(event) {
            setSaisieAdresseEntreprise(event.target.value);
          }
        
        function saisieDescriptionHandler(event) {
          setSaisieDesriptionStage(event.target.value);
        }
        
        function saisieRemunerationHandler(event) {
          setSaisieRemuneration(event.target.value);
          }

        return (
            <div className='modifier'>
                <h1>Bienvenue à la modification de votre stage</h1>
                <form onSubmit={employeurStageModif}>
                    <label for="nom">Nom de l'entreprise: </label>
                    <input
                        type="text"
                        value={saisieNomEntreprise}
                        onChange={saisieNomEntrepriseHandler}
                        placeholder="Nom de l'entreprise"
                    />
                    <br></br>
                    <label for="courriel">Courriel: </label>
                    <input
                        type="text"
                        value={saisieCourriel}
                        onChange={saisieCourrielHandler}
                        placeholder="Courriel de la personne"
                    />
                    <br></br>
                    <label for="numTelephone">Numero de telephone: </label>
                    <input
                        type="text"
                        value={saisieNum}
                        onChange={saisieNumHandler}
                        placeholder="Numero de la personne"
                    />
                    <br></br>
                    <label for="adresseEntreprise">Adresse de l'entreprise: </label>
                    <input
                        type="text"
                        value={saisieAdresseEntreprise}
                        onChange={saisieAdresseEntrepriseHandler}
                        placeholder="Adresse de l'entreprise"
                    />
                    <br></br>
                    <label for="descriptionStage">Description du stage: </label>
                    <input
                        type="text"
                        value={saisieDescriptionStage}
                        onChange={saisieDescriptionHandler}
                        placeholder="Description du stage"
                    />
                    <br></br>
                    <label for="renumeration">Rémunération: </label>
                    <input
                        type="text"
                        value={saisieRemuneration}
                        onChange={saisieRemunerationHandler}
                        placeholder="Rémunération"
                    />
                    <br></br>
                    <button type="sumbit">Modifier votre stage</button>
                </form>
            </div>
        );
};

export default ModifierStage;