"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";



const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
    initialData: Billboard | null;
}


export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin(); 


    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Modifier L'ffichage" : "Créer l'affichage"
    const description = initialData ? "Modifier L'ffichage" : "Ajouter un panneau"
    const toastMessage = initialData ? "Panneau mise à jour. " : "Panneau créer."
    const action = initialData ? "Sauvegarder les modification" : "Créer"



    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    });
    const onSubmit = async (data: BillboardFormValues) => {

        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success("Boutique mise à jour.");
        }catch (error) {
            toast.error("Something went wrong.");
        }finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
        setLoading(true)
        await axios.delete(`/api/stores/${params.storeId}`)
        router.refresh();
        router.push("/")
        toast.success("Boutique Supprimée.")
        }catch (error){
            toast.error("Assurez-vous d'abord d'avoir supprimé tous les produits et catégories.")
        }finally{
            setLoading(false)
            setOpen(false)
        }
    }

    return (
       <>
        <AlertModal 
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onDelete}
          loading={loading}
        />
        <div className="flex items-center justify-between">
            <Heading
              title={title}
              description={description}  
            
            />
            {initialData && (
            <Button 
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            
            >
            <Trash className="h-4 w-4"/>
            </Button>
            )}
        </div>
        <Separator />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid grid-cols-3 gap-8">
                    <FormField 
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Label du panneau" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    
                    />
                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                {action}
                </Button>
            </form>
        </Form>
        <Separator />
        <ApiAlert 
        title="TEST_TECHNIQUE_THE_BRADEY_API_URL" 
        description={`${origin}/api/${params.storeId}`} 
        variant="public"/>
        </>
    );
};