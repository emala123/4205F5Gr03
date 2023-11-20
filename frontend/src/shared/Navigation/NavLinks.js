import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Accueil
        </NavLink>
      </li>
      {auth.etudiantConnecter && (
        <li>
          <NavLink to={"/modifierProfilEtudiant"}>Modifier Profil</NavLink>
        </li>
      )}
      {auth.etudiantConnecter && (
        <li>
          <NavLink to={"/stages"}>Stages</NavLink>
        </li>
      )}
      {auth.employeurConnecter && (
        <li>
          <NavLink to={"/modifierProfilEmployeur"}>Modifier Profil</NavLink>
        </li>
      )}
      {auth.employeurConnecter && (
        <li>
          <NavLink to={`/ajouterStage`}>Ajouter Stages</NavLink>
        </li>
      )}
      {auth.employeurConnecter && (
        <li>
          <NavLink to={`/${auth.userId}/mesStages`}>Mes Stages</NavLink>
        </li>
      )}
      
      {auth.etudiantConnecter && (
        <li>
          <button onClick={auth.logoutetudiant}>Déconnexion</button>
        </li>
      )}
      {auth.employeurConnecter && (
        <li>
          <button onClick={auth.logoutemployeur}>Déconnexion</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
