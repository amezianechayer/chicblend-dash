/* "use client" est utilisé pour déclarer une frontiere entre un module serveur et un module composant client */
"use client";

import { utiliserBoutiqueModel } from "@/brancher/util-model-boutique";
import { useEffect } from "react";

const PageRacine = () => {
   
  /*const modelBoutique = utiliserBoutiqueModel();  ne marchera pas bien dans useEffect()*/
  const onOpen = utiliserBoutiqueModel((state) => state.onOpen);
  const isOpen = utiliserBoutiqueModel((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

    return (
      <div className="p-4">
        page racine
      </div>
    );
  };

  export default PageRacine