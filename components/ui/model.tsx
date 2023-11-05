"use client";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle
 } from '@/components/ui/dialog';


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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{titre}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}; 