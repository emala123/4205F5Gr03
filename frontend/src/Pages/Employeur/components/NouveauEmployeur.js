
import React, { useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";

function NouveauEmployeur({ adressMethode }) {
  const [saisieNomEntreprise, setSaisieNomEntreprise] = useState("");
  const [saisieAdresse, setSaisieAdresse] = useState("");
  const [saisiePrenom, setSaisiePrenom] = useState("");
  const [saisieNom, setSaisieNom] = useState("");
  const [saisieTelephone, setSaisieTelephone] = useState("");
  const [saisiePostTelephone, setSaisiePostTelephone] = useState("");
  const [saisieCourriel, setSaisieCourriel] = useState("");
  const [saisieMotDePasse, setSaisieMotDePasse] = useState("");
  //const [saisieStage, setSaisieStage] = useState("");

  

  const { sendRequest } = useHttpClient();
  const ajouterEmployeur = async (event) => {
    event.preventDefault();

    try {
      const reponseData = await sendRequest(
        "http://localhost:5000/employeurs/inscription",
        "POST", 
        JSON.stringify({
            nomEtreprise: saisieNomEntreprise,
            adresse: saisieAdresse,
            prenom: saisiePrenom,
            nom: saisieNom,
            telephone: saisieTelephone,
            posteTelephone: saisiePostTelephone,
            courriel: saisieCourriel,
            motDePasse: saisieMotDePasse,
            //stages: saisieStage,

        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(reponseData);
    } catch (err) {
      console.log(err);
    }

    if (saisieNomEntreprise === "") {
      alert(
        "Veuillez entrer le nom de l'entreprise"
      );
      return;
    } else if (saisieAdresse === "") {
      alert("Veuillez entrer l'adresse");
      return;
    } else if (saisiePrenom === "") {
      alert("Veuillez entrer le prenom");
      return;
    } else if (saisieNom === "") {
        alert("Veuillez entrer le nom");
        return;
    } else if (saisieTelephone ==="") {
      alert("Veuillez entrer le nom");
      return;
      
    } else if (saisiePostTelephone === "") {
      alert("Veuillez entrer le poste du telephone ");
      return;
    } else if (saisieCourriel === "") {
      alert("Veuillez entrer un courriel valide ");
      return;
    } else if (saisieMotDePasse === "") {
        alert("Veuillez entrer un mot de passe valide ");
        return;

        //Le tableau de stage
   /* } else if (setSaisieStage === "") {
        alert("Veuillez entrer un mot de passe valide ");
        return;*/
      
    } else {
      const nouveauEmployeur = {
        nomEtreprise: saisieNomEntreprise,
            adresse: saisieAdresse,
            prenom: saisiePrenom,
            nom: saisieNom,
            telephone: saisieTelephone,
            posteTelephone: saisiePostTelephone,
            courriel: saisieCourriel,
            motDePasse: saisieMotDePasse,
      };
      adressMethode(nouveauEmployeur)
        .then(() => {
          alert("Un employeur a bien été créer");
          setSaisieNomEntreprise("");
          setSaisieAdresse("");
          setSaisiePrenom("");
          setSaisieNom("")
          setSaisieTelephone("");
          setSaisiePostTelephone("");
          setSaisieCourriel("");
          setSaisieMotDePasse("");

        })
        .catch(() => {
          alert("Une erreur est survenue lors de la création de l'employeur");
        });
    }
  };

  function saisieNomEntrepriseHandler(event) {
    setSaisieNomEntreprise(event.target.value);
  }

  function saisieAdresseHandler(event) {
    setSaisieAdresse(event.target.value);
  }

  function saisiePrenomHandler(event) {
    setSaisiePrenom(event.target.value);
  }

  function saisieNomHandler(event) {
    setSaisieNom(event.target.value);
  }

function saisieTelephoneHandler(event) {
  setSaisieTelephone(event.target.value);
}

function saisiePostTelephoneHandler(event) {
    setSaisiePostTelephone(event.target.value);
  }

  function saisieCourrielHandler(event) {
    setSaisieCourriel(event.target.value);
  }

  function saisieMotDePasseHandler(event) {
    setSaisieMotDePasse(event.target.value);
  }

  return (
    <form className="nouveau-stage-form" onSubmit={ajouterEmployeur}>
      <label for="prenomEmployeur">Nom entreprise: </label>
      <input
        type="text"
        value={saisieNomEntreprise}
        onChange={saisieNomEntrepriseHandler}
        placeholder="Nom de l'entreprise"
      />
      <br></br>
      <label for="Adresse">Adresse employeur: </label>
      <input
        type="text"
        value={saisieAdresse}
        onChange={saisieAdresseHandler}
        placeholder="Adresse de l'entreprise"
      />
      <br></br>
      <label for="prenomEmployeur">Prénom employeur: </label>
      <input
        type="text"
        value={saisiePrenom}
        onChange={saisiePrenomHandler}
        placeholder="Prenom de l'employeur"
      />
      <br></br>
      <label for="nomEmployeur">Nom employeur: </label>
      <input
        type="text"
        value={saisieNom}
        onChange={saisieNomHandler}
        placeholder="Nom de l'employeur"
      />
    <br></br>
    <label for="telephoneEmployeur">Téléphone employeur: </label>
    <input
        type="text"
        value={saisieTelephone}
        onChange={saisieTelephoneHandler}
        placeholder="Telephone de l'employeur"
      />
      <br></br>
      <label for="postTelephone">Post téléphone employeur: </label>
      <input
        type="text"
        value={saisiePostTelephone}
        onChange={saisiePostTelephoneHandler}
        placeholder="Poste du telephone de l'employeur"
      />
      <br></br>
      <label for="courrielEmployeur">Courriel employeur: </label>
      <input
        type="text"
        value={saisieCourriel}
        onChange={saisieCourrielHandler}
        placeholder="Courriel de l'employeur"
      />
      <br></br>
      <label for="mdpEmployeur">Mot de passe de employeur: </label>
      <input
        type="password"
        value={saisieMotDePasse}
        onChange={saisieMotDePasseHandler}
        placeholder="Mot de passe de  l'employeur"
      />
      <br></br>
      <button type="sumbit"> Créer un employeur</button>
    </form>
  );
}

export default NouveauEmployeur;
