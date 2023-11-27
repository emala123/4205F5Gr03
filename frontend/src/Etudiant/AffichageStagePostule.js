import React, { useEffect, useState, useContext } from 'react';
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";


const AffichageStagePostule = () => {
    const auth = useContext(AuthContext);
    const {error, sendRequest, clearError } = useHttpClient();

    const [tableauStageIdPostuler, setTableauStageIdPostuler] = useState([]);
    const [tableauStage, setTableauStage] = useState([]);

    const etudiantId = auth.userId;

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

    useEffect(() => {
        const recupererStageIdPostuler = async() => {
            try {
                const reponseData = await sendRequest(
                    `http://localhost:5000/` + `etudiants/recupererStagePostulerId/${etudiantId}`
                );
                setTableauStageIdPostuler(reponseData.stages)
                console.log("test: " + tableauStageIdPostuler)
            }catch (erreur) {
                console.log(erreur);
            }
        };
        recupererStageIdPostuler();
    }, [sendRequest, etudiantId]);

    useEffect(() => {
        const recupererStage = async () => {
            for(let i = 0; i < tableauStageIdPostuler.length; i++) {
                try{
                    const reponseData = await sendRequest(
                        `http://localhost:5000/` + `stages/recupererStage/${tableauStageIdPostuler[i]}`
                    );
                    setTableauStage(prevTableauStage => {
                        const updatedTableauStage = [...prevTableauStage, reponseData.stage];
                        console.log("test voir les stages: " + updatedTableauStage);
                        return updatedTableauStage;
                    });
                }catch (erreur) {
                    console.log(erreur)
                }
            }
        };
        recupererStage();
    }, [sendRequest, tableauStageIdPostuler]);

        return (
            <div>
                <p>allo</p>
            </div>
        );
};

export default AffichageStagePostule;