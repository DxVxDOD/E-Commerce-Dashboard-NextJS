import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import prismaDb from "@/lib/prismadb";
import {wrapInObject} from "@/lib/promiseWrap";

export const POST = async (req: Request) => {
    const { userId } = auth();

    const { data: reqData, error: reqError } = await wrapInObject(req.json());

    if(reqError) {
        console.log('[STORE_POST]', reqError);
        return new NextResponse('Internal error', {status: 500});
    }

    if(!userId) {
        return new NextResponse('Unauthorized', {status: 401});
    }

    const { name } = reqData;

    if (!name) {
        return new NextResponse('Name is required', {status: 400});
    }

    const store = await prismaDb.store.create({
        data: {
            name,
            userId,
        }
    });
    return NextResponse.json(store);
}