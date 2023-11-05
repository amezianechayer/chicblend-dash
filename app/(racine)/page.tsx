/* "use client" est utilisé pour déclarer une frontiere entre un module serveur et un module composant client */
"use client";

import { Model } from "@/components/ui/model";

const PageRacine = () => {
    return (
      <div className="p-4">
        <Model titre="test" description="test dash" etOuvert etFermer={() => {}}>
          children
        </Model>
      </div>
    );
  };

  export default PageRacine