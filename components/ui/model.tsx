import { metadata } from '../../app/layout';
import { Dialog } from './dialog';
"use client";

interface ModelProps {
    titre: string;
    description: string;
    etOuvert: boolean;
    etFermer: () => void;
    children?: React.ReactNode;
};
/* extraction du Props */
export const Model: React.FC<ModelProps> = ({
    titre,
    description,
    etOuvert,
    etFermer,
    children
}) => {
    /* onChange qu'on doit ajouter a shadcn-ui dans le components dialog */
    const onChange = (open: boolean) => {
        if (!open) {
            etFermer();
        }
    };
    return (
        /* onChange recoit open boolean*/
        <Dialog open={etOuvert} onOpenChange={onChange}>

        </Dialog>
    )
}