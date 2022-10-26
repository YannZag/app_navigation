//Contexte de l'utilisateur connecté, permettant de réutiliser son username facilement

import { createContext } from "react";

const userContext = createContext({
    userName:"",
    setUserName:()=>{}
});

export default userContext;