import {create} from "zustand";

interface utiliserBoutiqueModelBoutique {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const utiliserBoutiqueModel = create<utiliserBoutiqueModelBoutique>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));