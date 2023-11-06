import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
){
    try{
        const {userId} = auth();
        const body = await req.json();

        const { name } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Le Nom est requit", { status: 400 });
        }

        const boutique = await prismadb.store.create({
            data: {
                name,
                userId,
            }
        });

        return NextResponse.json(boutique)

    } catch (error) {
        console.log('[BOUTIQUES_POST]', error);
        return new NextResponse("Internal error", {status: 500});
    }
}