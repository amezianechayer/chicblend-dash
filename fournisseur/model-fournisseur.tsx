"use client";

import { ModeleBoutique } from "@/components/modeles/modele-boutique";
import { useEffect, useState } from "react";

export const ModelFournisseur = () => {
    const [estMonter, setEstMonter] = useState(false);
    /* éviter la hydration error si le serveur a un model ouvert et que le coté client non ça cause l'erreur*/
    useEffect(() => {
        setEstMonter(true);
    }, []);

    if (!estMonter) {
        return null;
    }

    return (
        <>
        <ModeleBoutique />
        </>
    );
};