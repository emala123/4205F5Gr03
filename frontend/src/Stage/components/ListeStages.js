import React, { useState, useEffect, useContext } from 'react';

import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import profil from "../../Etudiant/ModifierEtudiant"

import './Liste.css'

const ListeStages = (props) => {
    const auth = useContext(AuthContext);
    const {error, sendRequest, clearError } = useHttpClient();
    const [selectedStage, setSelectedStage] = useState(null);

    const handleMouseEnter = (stageId) => {
        setSelectedStage(stageId);
    };

    const handleMouseLeave = () => {
        setSelectedStage(null);
    };

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

    async function postulerStage(stageId) {
        try {
            const reponseData = await sendRequest(
                `http://localhost:5000/etudiants/inscrireStage/${stageId}/${auth.userId}`,
                "POST",
                JSON.stringify({

                }),
                {
                  "Content-Type": "application/json",
                }
            );
            console.log(reponseData);
            alert("Votre demande à bien été envoyer!");
        }catch (err) {
          console.log(err);
        }
    }

    return (
        <div>
            {props.items.length === 0 ? (
                <div>
                    <h2>Aucun stage trouvé</h2>
                </div>
            ) : (
                <ul className='listeStage'>
                    {props.items.map(stage => (
                        <li
                            key={stage.id}
                            onMouseEnter={() => handleMouseEnter(stage.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {stage.nom}
                            {selectedStage === stage.id && (
                                <div>
                                    Courriel: {stage.courriel}<br />
                                    Téléphone: {stage.telephone}<br />
                                    Adresse: {stage.adresse}<br />
                                    Description: {stage.description}<br />
                                    Rémunération: {stage.remuneration}<br />
                                    <button onClick={() => postulerStage(stage.id)}>Postuler à {stage.nom}</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListeStages;
