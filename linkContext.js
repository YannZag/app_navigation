//Contexte du lien d'archive trouvé lors de la requête, contenant le lien et la date de l'archive en format string

import { createContext } from "react";

const linkContext = createContext({
    resultlink:[""],
    setResultlink:()=>{}
});

export default linkContext;