import React, { useState, useEffect, useContext } from 'react';
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from '../../shared/context/auth-context';
import { Link } from "react-router-dom";
import Modal from 'react-modal';

const StageUserItem = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const auth = useContext(AuthContext);

  const supprimerStageAvecValidation = async () => {
    try {
      await supprimerStage(props.id); // Utilisez props.id ici
      setModalIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (error) {
      // Afficher l'erreur d'une manière plus conviviale dans votre interface utilisateur
      console.log(error);
      clearError();
    }
  }, [error, clearError]);

  const supprimerStage = async (stageId) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/stages/supprimerStage/${auth.userId}/${stageId}`,
        "DELETE",
        JSON.stringify({}),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      // Mettez à jour votre interface utilisateur après la suppression
      alert("Votre stage a bien été supprimé!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <li>
        <div>
          <h2>{props.nom}</h2>
          <p>{props.description}</p>
          <p>{props.courriel}<br/>{props.telephone}<br/>{props.adresse}<br/>{props.remuneration}</p>
          {/* Utilisez une fonction fléchée pour éviter l'appel immédiat de la fonction */}
          <button onClick={() => setModalIsOpen(true)}>Supprimer ce stage : {props.nom}</button>
          <Link to={`/ajouterStage`}>
          </Link>
        </div>
      </li>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirmer la suppression"
      >
        <h2>Confirmer la suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer le stage "{props.nom}" ?</p>
        {/* Utilisez une fonction fléchée pour éviter l'appel immédiat de la fonction */}
        <Link to={`/ajouterStage`}><button onClick={() => supprimerStageAvecValidation()}>Oui, supprimer</button></Link>­­
        <button onClick={() => setModalIsOpen(false)}>Annuler</button>
      </Modal>
    </React.Fragment>
  );
};

export default StageUserItem;
