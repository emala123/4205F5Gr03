import React, { useState, useContext, useEffect } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import {Link} from "react-router-dom";

const LoginEmployeur = () => {
    const auth = useContext(AuthContext);
    const [saisieCourrielEmployeur, setSaisieCourrielEmployeur] = useState("");
    const [saisieMdpEmployeur, setSaisieMdpEmployeur] = useState("");

    const { error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

  const connexionEmployeur = async(event) => {
    event.preventDefault();

    try{
      const reponseData = await sendRequest(
        `http://localhost:5000/`+"employeurs/connexion",
        "POST",
        JSON.stringify({
            courriel: saisieCourrielEmployeur,
            motDePasse: saisieMdpEmployeur,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(reponseData);
      auth.loginemployeur(reponseData.employeur.id);
      alert("Connexion Réussi!");
    }catch(erreur){
      console.log(erreur);
    }

    if(saisieCourrielEmployeur === ""){
      alert("Entrez un courriel valide!");
      return;
    }else if (saisieMdpEmployeur === ""){
      alert("Entrez un mot de passe valide!");
      return;
    }
  };

  function saisieCourrielEmployeurHandler(event) {
    setSaisieCourrielEmployeur(event.target.value);
  }

  function saisieMdpEmployeurHandler(event) {
    setSaisieMdpEmployeur(event.target.value);
  }

  return (
    <div className="inscription">
      <h1>Bienvenue - Connexion Employeur</h1>
      <h4><Link to="/">Connexion Etudiant</Link></h4>
      <form className="nouveau-stage-form" onSubmit={connexionEmployeur}>
      <input
        type="text"
        value={saisieCourrielEmployeur}
        onChange={saisieCourrielEmployeurHandler}
        placeholder="Courriel de l'employeur"
      />
      <br/>
      <input
        type="password"
        value={saisieMdpEmployeur}
        onChange={saisieMdpEmployeurHandler}
        placeholder="Mot de passe de l'employeur"
      />
      <br/>
      <button type="sumbit">Connexion</button>
      </form>
      <p>OU</p>
      <p><Link to="/inscrireEmployeur">Inscrire un employeur</Link></p>
    </div>
    
  );

};

export default LoginEmployeur;