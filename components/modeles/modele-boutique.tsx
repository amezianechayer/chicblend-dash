"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { utiliserBoutiqueModel } from "@/brancher/util-model-boutique";
import { Model } from "@/components/ui/model";
import { Form, 
    FormControl,
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const formSchema = z.object({
    name: z.string().min(1),  /* au moins un caractère suffit pour nommer la boutique */
});

export const ModeleBoutique = () => {
    /* controler si la boutique est ouverte ou fermée */
    const modelBoutique = utiliserBoutiqueModel();

    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          setLoading(true)

          const response = await axios.post('/api/boutiques', values);
          /* une petite icone d'animation et de verification*/
          toast.success("Boutique Créee.");
        } catch(error) {
          toast.error("Quelque chose s'est mal passé.");  
        } finally {
          setLoading(false);
        }
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
                                    <Input disabled={loading} placeholder="Chic-Blend" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} 
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button 
                            disabled= {loading}
                            variant="outline" 
                            onClick={modelBoutique.onClose}>
                                Fermer</Button>
                            <Button disabled= {loading} type="submit">Continuer</Button>
                        </div>
                    </form>
                </Form>

            </div>
        </div>

    </Model>
    );
};