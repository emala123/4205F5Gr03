import React, { useEffect, useState, useContext } from 'react';
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";


const AffichageStagePostule = () => {
    const auth = useContext(AuthContext);
    const {error, sendRequest, clearError } = useHttpClient();

    const [tableauStageIdPostuler, setTableauStageIdPostuler] = useState([]);
    const [tableauStage, setTableauStage] = useState([]);
    const [selectedStage, setSelectedStage] = useState(null);

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
            }catch (erreur) {
                console.log(erreur);
            }
        };
        recupererStageIdPostuler();
    }, [sendRequest, etudiantId]);

    useEffect(() => {
        const recupererStage = async () => {
            const nouveauTableauStage = [];
            for(let i = 0; i < tableauStageIdPostuler.length; i++) {
                try{
                    const reponseData = await sendRequest(
                        `http://localhost:5000/` + `stages/recupererStage/${tableauStageIdPostuler[i].stage}`
                    );
                    nouveauTableauStage.push({
                        ...reponseData.stage,
                        datePostulation: tableauStageIdPostuler[i].datePostulation,
                        reponse: tableauStageIdPostuler[i].reponse
                    });
                    /*setTableauStage(prevTableauStage => {
                        const updatedTableauStage = [...prevTableauStage, reponseData.stage];
                        console.log("test voir les stages: " + updatedTableauStage);
                        return updatedTableauStage;
                    });*/

                }catch (erreur) {
                    console.log(erreur)
                }
            }
            setTableauStage(nouveauTableauStage);
        };
        recupererStage();
    }, [sendRequest, tableauStageIdPostuler]);

    const handleMouseEnter = (stageId) => {
        setSelectedStage(stageId);
    };

    const handleMouseLeave = () => {
        setSelectedStage(null);
    };

        return (
            <div>
                {tableauStageIdPostuler.length === 0 ? (
                <div>
                    <h2>Aucun stage postulé</h2>
                </div>
            ): (
                <ul className='listeStage'>
                {tableauStage.map(stagePostuler => (
                    <li
                        key={stagePostuler.id}
                        onMouseEnter={() => handleMouseEnter(stagePostuler.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {stagePostuler.nom}
                            {selectedStage === stagePostuler.id && (
                                <div>
                                    Adresse: {stagePostuler.adresse}<br />
                                    Description: {stagePostuler.description}<br />
                                    Date de la postulation: {stagePostuler.datePostulation}<br />
                                    Statut: {stagePostuler.reponse}
                                </div>
                            )}
                    </li>
                ))}
                </ul>
            )}
            </div>
        );
};

export default AffichageStagePostule;