import React, { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { Link } from "react-router-dom";
 
import StageUserItem from './StageUserItem';
 
const ListeStagesUser = props => {
    const auth = useContext(AuthContext);
 
    if (props.items.length === 0) {
        return (
            <div>
                <h2>Cet utilisateur n'a pas de stage, créé un stage!</h2>
                <Link to="/ajouterStage">Ajouter un stage</Link>
            </div>
        );
    }
 
    return (
        <p>
            <ul className='Liste-Stages'>
                {props.items.map(stage => (
                    <div key={stage.id}>
                        <StageUserItem
                            id={stage.id}
                            nom={stage.nom}
                            courriel={stage.courriel}
                            telephone={stage.telephone}
                            adresse={stage.adresse}
                            description={stage.description}
                            remuneration={stage.remuneration}
                        />
                        <Link to={`/modifierStage/${auth.userId}/${stage.id}`}>Modifier ce stage</Link>
                    </div>
                ))}
            </ul>
        </p>
    );
};
 
export default ListeStagesUser; 