import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";

const ModifierEtudiant = () => {
    const auth = useContext(AuthContext);
    const {error, sendRequest, clearError } = useHttpClient();

    const [saisiePrenomEtudiant, setSaisiePrenomEtudiant] = useState("");
    const [saisieNomEtudiant, setSaisieNomEtudiant] = useState("");
    const [saisieAdresse, setSaisieAdresse] = useState("");
    const [saisieTelephone, setSaisieTelephone] = useState("");

    const etudiantId = auth.userId;

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

        const etudiantModif = async (event) => {
            event.preventDefault();
            try{
                const reponseData = await sendRequest(
                    `http://localhost:5000/`+`etudiants/modifier/${etudiantId}`,
                    'PATCH',
                    JSON.stringify({
                        prenom: saisiePrenomEtudiant,
                        nom: saisieNomEtudiant,
                        adresse: saisieAdresse,
                        telephone: saisieTelephone
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                console.log(reponseData.etudiant);
                alert("Votre profil à bien été modifié!");
                setSaisiePrenomEtudiant("");
                setSaisieNomEtudiant("");
                setSaisieAdresse("");
                setSaisieTelephone("");
            }catch (erreur) {
                console.log(erreur);
            }

            if (saisiePrenomEtudiant === "") {
                alert(
                  "Veuillez entrer le nom de l'étudiant que vous voulez ajouter"
                );
                return;
              } else if (saisieNomEtudiant === "") {
                alert("Veuillez entrer le nom de l'étudiant que vous voulez ajouter");
                return;
              } else if (saisieAdresse === "") {
                alert("Veuillez entrer l'adresse de l'étudiant ");
                return;
              } else if (saisieTelephone === "") {
                alert("Veuillez entrer un numero de telephone ");
                return;
              }
        };

        function saisiePrenomEtudiantHandler(event) {
            setSaisiePrenomEtudiant(event.target.value);
        }
        
        function saisieNomEtudiantHandler(event) {
            setSaisieNomEtudiant(event.target.value);
        }

        function saisieAdresseHandler(event) {
            setSaisieAdresse(event.target.value);
        }
        
        function saisieTelephoneHandler(event) {
          setSaisieTelephone(event.target.value);
        }

        return (
            <div className='modifier'>
                <h1>Bienvenue à la modification de votre profil</h1>
                <form onSubmit={etudiantModif}>
                    <label for="prenomEtudiant">Prénom Étudiant: </label>
                    <input
                        type="text"
                        value={saisiePrenomEtudiant}
                        onChange={saisiePrenomEtudiantHandler}
                        placeholder="Penom de l'étudiant"
                    />
                    <br></br>
                    <label for="nomEtudiant">Nom etudiant: </label>
                    <input
                        type="text"
                        value={saisieNomEtudiant}
                        onChange={saisieNomEtudiantHandler}
                        placeholder="Nom de l'étudiant"
                    />
                    <br></br>
                    <label for="adresse">Adresse: </label>
                    <input
                        type="text"
                        value={saisieAdresse}
                        onChange={saisieAdresseHandler}
                        placeholder="Adresse de l'étudiant"
                    />
                    <br></br>
                    <label for="adresse">Téléphone : </label>
                    <input
                        type="tel"
                        value={saisieTelephone}
                        onChange={saisieTelephoneHandler}
                        placeholder="Telephone"
                    />
                    <br/>
                    <button type="sumbit">Modifier votre profil</button>
                </form>
            </div>
        );
};

export default ModifierEtudiant;