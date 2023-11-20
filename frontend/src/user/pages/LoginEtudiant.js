import React, { useState, useContext, useEffect} from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import {Link} from "react-router-dom";

const LoginEtudiant = () => {
    const auth = useContext(AuthContext);
    const [saisieCourrielEtudiant, setSaisieCourrielEtudiant] = useState("");
    const [saisieMdpEtudiant, setSaisieMdpEtudiant] = useState("");
    const { error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
      if(error){
        alert(error);
        clearError();
      }
    }, [error, clearError]);

  const connexionEtudiant = async(event) => {
    event.preventDefault();

    try{
      const reponseData = await sendRequest(
        `http://localhost:5000/`+"etudiants/connexion",
        "POST",
        JSON.stringify({
            courriel: saisieCourrielEtudiant,
            motDePasse: saisieMdpEtudiant,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(reponseData);
      auth.loginetudiant(reponseData.etudiant.id);
      alert("Connexion Réussie!");
    }catch(erreur){
      console.log(erreur);
    }

    if(saisieCourrielEtudiant === ""){
      alert("Entrez un courriel valide!");
      return;
    }else if (saisieMdpEtudiant === ""){
      alert("Entrez un mot de passe valide!");
      return;
    }
  };

  function saisieCourrielEtudiantHandler(event) {
    setSaisieCourrielEtudiant(event.target.value);
  }

  function saisieMdpEtudiantHandler(event) {
    setSaisieMdpEtudiant(event.target.value);
  }

  return (
    <div className="inscription">
      <h1>Bienvenue - Connexion Étudiant</h1>
      <h4><Link to="/loginEmployeur">Connexion Employeur</Link></h4>
      <form className="nouveau-stage-form" onSubmit={connexionEtudiant}>
      <input
        type="text"
        value={saisieCourrielEtudiant}
        onChange={saisieCourrielEtudiantHandler}
        placeholder="Courriel de l'étudiant"
      />
      <br/>
      <input
        type="password"
        value={saisieMdpEtudiant}
        onChange={saisieMdpEtudiantHandler}
        placeholder="Mot de passe de l'étudiant"
      />
      <br/>
      <button type="sumbit">Connexion</button>
      </form>
      <p>OU</p>
      <p><Link to="/inscrireEtudiant">Inscrire un étudiant</Link></p>
      </div>
    
  );

};

export default LoginEtudiant;