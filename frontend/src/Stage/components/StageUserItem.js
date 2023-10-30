import React, { useState, useEffect, useContext } from 'react';
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from '../../shared/context/auth-context';
import { Link } from "react-router-dom";

const StageUserItem = props => {
    
    const {error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

    async function supprimerStage(stageId) {
        
        try {
            const reponseData = await sendRequest(
              `http://localhost:5000/stages/supprimerStage/${auth.userId}/${stageId}`,
                "DELETE",
                JSON.stringify({

                }),
                {
                  "Content-Type": "application/json",
                }
            );
            console.log(reponseData);
            alert("Votre stage à bien été supprimé!");
        }catch (err) {
          console.log(err);
        }
    
    }
    

    return(
        <React.Fragment>
            <li>
                <div>
                    <h2>{props.nom}</h2>
                    <p>{props.description}</p>
                    <p>{props.courriel}<br/>{props.telephone}<br/>{props.adresse}<br/>{props.remuneration}</p>
                    <Link to={`/ajouterStage`}> <button onClick={() => supprimerStage(props.id)}>Supprimer ce stage : {props.nom}</button></Link>
                </div>
            </li>
        </React.Fragment>
    );
};

export default StageUserItem;