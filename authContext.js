//Contexte d'authentification permettant de vérifier si l'utilisateur est connecté

import { createContext } from "react";

const authContext = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {}
});

export default authContext;