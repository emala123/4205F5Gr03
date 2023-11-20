import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

/*import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';*/
import LoginEtudiant from "./user/pages/LoginEtudiant";
import LoginEmployeur from "./user/pages/LoginEmployeur";
import InscrireEtudiant from "./user/pages/InscrireEtudiant";
import InscrireEmployeur from "./user/pages/InscrireEmployeur";
import AjouterStage from "./Stage/AjouterStages";
import ModifierStage from './Stage/ModifierStageEmployeur';
import StagesUser from "./Stage/StagesUser";
import Stages from "./Stage/Stages";
import ModifierEtudiant from "./Etudiant/ModifierEtudiant";
import ModifierEmployeur from './Employeur/ModifierEmployeur';
import AffichageCandidats from './Employeur/AffichageCandidats';
import MainNavigation from './shared/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [etudiantConnecter, setEtudiantConnecter] = useState(false);
  const [employeurConnecter, setEmployeurConnecter] = useState(false);
  const [userId, setUserId] = useState(false);

  const loginetudiant = useCallback((userId) => {
    setEtudiantConnecter(true);
    setUserId(userId);
  }, []);

  const loginemployeur = useCallback((userId) => {
    setEmployeurConnecter(true);
    setUserId(userId);
  }, []);

  const logoutetudiant = useCallback(() => {
    setEtudiantConnecter(false);
    setUserId(null);
  }, []);

  const logoutemployeur = useCallback(() => {
    setEmployeurConnecter(false);
    setUserId(null);
  }, []);

  let routes;

  if (etudiantConnecter) {
    routes = (
      <Switch>
        <Route path="/modifierProfilEtudiant" exact>
          <ModifierEtudiant />
        </Route>

        <Route path="/stages" exact>
          <Stages />
        </Route>

        <Redirect to="/modifierProfilEtudiant" />
      </Switch>
    );
  } else if (employeurConnecter) {
    routes = (
      <Switch>

        <Route path="/modifierProfilEmployeur" exact>
          <ModifierEmployeur />
        </Route>

        <Route path="/ajouterStage" exact>
          <AjouterStage />
        </Route>

        <Route path="/:userId/mesStages">
        <StagesUser />
        </Route>

        <Route path = "/modifierStage/:userId/:stageId">
          <ModifierStage />
        </Route>

        <Route path = "/affichageCandidats/:stageId">
          <AffichageCandidats />
        </Route>

        <Redirect to="/modifierProfilEmployeur" />
      </Switch>
    );
  }else{
    routes = (
      <Switch>
        <Route path="/" exact>
          <LoginEtudiant />
        </Route>

        <Route path="/inscrireEtudiant" exact>
          <InscrireEtudiant />
        </Route>

        <Route path="/loginEmployeur" exact>
          <LoginEmployeur />
        </Route>

        <Route path="/inscrireEmployeur" exact>
          <InscrireEmployeur />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ etudiantConnecter: etudiantConnecter, employeurConnecter:employeurConnecter, userId:userId, loginetudiant: loginetudiant, loginemployeur:loginemployeur, logoutetudiant: logoutetudiant, logoutemployeur:logoutemployeur }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
