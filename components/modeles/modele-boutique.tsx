"use client";

import { utiliserBoutiqueModel } from "@/brancher/util-model-boutique";
import { Model } from "@/components/ui/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(1),  /* au moins un caractère suffit pour nommer la boutique */
});

export const ModeleBoutique = () => {
    /* controler si la boutique est ouverte ou fermée */
    const modelBoutique = utiliserBoutiqueModel();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        // TODO: Creer la boutique
    }
    return (
    <Model 
        titre="Creer une boutique"
        description="Ajouter une nouvelle boutique pour gerer les produits et les categories "
        etOuvert= {modelBoutique.isOpen}
        etFermer={modelBoutique.onClose}
    
        >
        <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input placeholder="Chic-Blend" {...field} />
                                </FormControl>
                            </FormItem>
                        )} 
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button variant="outline" onClick={modelBoutique.onClose}>Fermer</Button>
                            <Button type="submit">Continuer</Button>
                        </div>
                    </form>
                </Form>

            </div>
        </div>

    </Model>
    );
};