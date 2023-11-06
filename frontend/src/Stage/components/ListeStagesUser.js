import React, { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { Link } from "react-router-dom";
<<<<<<< HEAD
import './Liste.css';
=======
>>>>>>> 5553f963b8ecd0f61c165e500b03e38039d61a5a
 
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
<<<<<<< HEAD
                    <div className='StageUserItem' key={stage.id}>
=======
                    <div key={stage.id}>
>>>>>>> 5553f963b8ecd0f61c165e500b03e38039d61a5a
                        <StageUserItem
                            id={stage.id}
                            nom={stage.nom}
                            courriel={stage.courriel}
                            telephone={stage.telephone}
                            adresse={stage.adresse}
                            description={stage.description}
                            remuneration={stage.remuneration}
                        />
<<<<<<< HEAD
                        <Link  className='Link-Button' to={`/modifierStage/${auth.userId}/${stage.id}`}>Modifier ce stage</Link>
                        <br/>
                        <Link className='Link-Button' to={`/affichageCandidats/${stage.id}`}>Afficher les postulations</Link>
=======
                        <Link to={`/modifierStage/${auth.userId}/${stage.id}`}>Modifier ce stage</Link>
>>>>>>> 5553f963b8ecd0f61c165e500b03e38039d61a5a
                    </div>
                ))}
            </ul>
        </p>
    );
};
 
export default ListeStagesUser; 