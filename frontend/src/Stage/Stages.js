import React, { useState, useEffect } from "react";
import { useHttpClient } from '../shared/hooks/http-hook';

import ListeStages from "./components/ListeStages";

const Stages = () => {
    const {error, sendRequest, clearError } = useHttpClient();
    const [stages, setStages] = useState();

    useEffect(() => {
        if(error){
          alert(error);
          clearError();
        }
      }, [error, clearError]);

    useEffect(() => {
        const recupererStages = async () => {
            try{
                const reponseData = await sendRequest( `http://localhost:5000/`+"stages");
                setStages(reponseData.stages);
            }catch (erreur) {
                console.log(erreur);
            }
        };
        recupererStages();
    }, [sendRequest]);

    return(
        <React.Fragment>
            <h1>Voici tout les stages!</h1>
            {stages && <ListeStages items={stages} />};
        </React.Fragment>
    );
};

export default Stages;