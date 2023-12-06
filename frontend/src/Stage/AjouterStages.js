import React, {useContext, useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';

import "./AjouterStage.css";   

const AjouterStages = () => {
    const auth = useContext(AuthContext);
    const [saisieNomEntreprise, setSaisieNomEntreprise] = useState("");
    const [saisieCourriel, setSaisieCourriel] = useState("");
    const [saisieNum, setSaisieNum] = useState("");
    const [saisieAdresseEntreprise, setSaisieAdresseEntreprise] = useState("");
    const [saisieDescriptionStage, setSaisieDesriptionStage] = useState("");
    const [saisieRemuneration, setSaisieRemuneration] = useState("");

    const { error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

      const addStage = async(event) => {
        event.preventDefault();
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var number = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        const adress = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9\s,'-]+$/;





        if (saisieNomEntreprise === "") {
          alert("Veuillez entrer un nom");
          return;
        } else if (!saisieCourriel.match(validRegex)) {
          alert("Veuillez entrer un courriel");
          return;
        } else if (!saisieNum.match(number)) {
          alert("Veuillez entrer un numero de telephone");
          return;
        } else if (!saisieAdresseEntreprise.match(adress)) {
          alert("Veuillez entrer l'adresse de l'entreprise");
          return;
        }  else if (saisieDescriptionStage === "") {
          alert("Veuillez faire une description du stage");
          return;
        } else if (saisieRemuneration === "") {
          alert("Veuillez saisir une renumeration");
          return;
        }else{
          setSaisieNomEntreprise("");
          setSaisieCourriel("");
          setSaisieNum("");
          setSaisieAdresseEntreprise("");
          setSaisieDesriptionStage("");
          setSaisieRemuneration("");
        }

        try {
            const reponseData = await sendRequest(
              `http://localhost:5000/`+`stages/ajouterStage/${auth.userId}`,
                "POST",
                JSON.stringify({
                    nom: saisieNomEntreprise,
                    courriel: saisieCourriel,
                    telephone: saisieNum,
                    adresse: saisieAdresseEntreprise,
                    description: saisieDescriptionStage,
                    remuneration: saisieRemuneration,
                }),
                {
                    "Content-Type": "application/json",
                }

                
            );
            console.log(reponseData);
            alert("Le stage a bien été ajouté!");
        }catch (erreur) {
            console.log(erreur);
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
    function saisieDescriptionStageHandler(event) {
        setSaisieDesriptionStage(event.target.value);
    }
    function saisieRenumerationHandler(event) {
        setSaisieRemuneration(event.target.value);
    }

    return (
        <form className="ajouterStageForm" onSubmit={addStage}>
          <label for="nom">Nom de l'entreprise: </label>
          <br />
          <input
            type="text"
            value={saisieNomEntreprise}
            onChange={saisieNomEntrepriseHandler}
            placeholder="Nom de l'entreprise"
          />
          <br></br>
          <label for="courriel"> Courriel de la personne contact: </label>
          <input
            type="text"
            value={saisieCourriel}
            onChange={saisieCourrielHandler}
            placeholder="Courriel de la personne"
          />
          <br></br>
          <label for="numTelephone">
            {" "}
            Téléphone de la personne contact:{" "}
          </label>
          <input
            type="text"
            value={saisieNum}
            onChange={saisieNumHandler}
            placeholder="Numero de la personne"
          />
          <br></br>
          <label for="adresseEntreprise"> Adresse de l'entreprise: </label>
          <input
            type="text"
            value={saisieAdresseEntreprise}
            onChange={saisieAdresseEntrepriseHandler}
            placeholder="Adresse de l'entreprise"
          />
          <br></br>
          <label for="descriptionStage">Description du stage: </label>
          <br />
          <input
            type="text"
            value={saisieDescriptionStage}
            onChange={saisieDescriptionStageHandler}
            placeholder="Description du stage"
          />
          <br></br>
          <label for="renumeration">Rémunération :</label><br/>
          <input
            type="number"
            value={saisieRemuneration}
            onChange={saisieRenumerationHandler}
            placeholder="Rémunération"
          />
            
          <br></br>
          <button type="sumbit"> Ajouter un stage</button>
        </form>
      );
};

export default AjouterStages;