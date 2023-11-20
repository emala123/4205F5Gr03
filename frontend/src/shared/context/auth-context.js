import { createContext } from 'react';

export const AuthContext = createContext({
  etudiantConnecter: false,
  employeurConnecter: false,
  userId: null,
  loginetudiant: () => {},
  loginemployeur: () => {},
  logoutetudiant: () => {},
  logoutemployeur: () => {}
});
