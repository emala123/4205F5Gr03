import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";

const ModifierEmployeur = () => {
    const auth = useContext(AuthContext);
    const {error, sendRequest, clearError } = useHttpClient();

    const [saisieNomEntreprise, setSaisieNomEntreprise] = useState("");
    const [saisieAdresse, setSaisieAdresse] = useState("");
    const [saisiePrenom, setSaisiePrenom] = useState("");
    const [saisieNom, setSaisieNom] = useState("");
    const [saisieTelephone, setSaisieTelephone] = useState("");
    const [saisiePostTelephone, setSaisiePostTelephone] = useState("");

    const employeurId = auth.userId;

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

        const employeurModif = async (event) => {
            event.preventDefault();
            try{
                const reponseData = await sendRequest(
                  `http://localhost:5000/`+`employeurs/modifier/${employeurId}`,
                    'PATCH',
                    JSON.stringify({
                        nomEtreprise: saisieNomEntreprise,
                        adresse: saisieAdresse,
                        prenom: saisiePrenom,
                        nom: saisieNom,
                        telephone: saisieTelephone,
                        posteTelephone: saisiePostTelephone
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                console.log(reponseData.etudiant);
                alert("Votre profil à bien été modifié!");
                setSaisieNomEntreprise("");
                setSaisieAdresse("");
                setSaisiePrenom("");
                setSaisieNom("")
                setSaisieTelephone("");
                setSaisiePostTelephone("");
            }catch (erreur) {
                console.log(erreur);
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

        return (
            <div className='modifier'>
                <h1>Bienvenue à la modification de votre profil</h1>
                <form onSubmit={employeurModif}>
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
                    <button type="sumbit">Modifier votre profil</button>
                </form>
            </div>
        );
};

export default ModifierEmployeur;