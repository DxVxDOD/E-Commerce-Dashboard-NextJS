import { auth } from "@clerk/nextjs";
import { wrapInObject } from "@/lib/promiseWrap";
import { NextResponse } from "next/server";
import { Store } from ".prisma/client";
import prismaDb from "@/lib/prismadb";
import { Billboard } from "@prisma/client";

export const GET = async (req: Request, { params }: { params: { billboard_id: string } }) => {
  if (!params.billboard_id) new NextResponse('Billboard ID is required', { status: 400 })

  const { data: billboardData, error: billboardError } = await wrapInObject(prismaDb.billboard.findUnique({
    where: {
      id: params.billboard_id
    }
  }));

  if (billboardError) {
    console.log('BILLBOARD_ID_ERROR')
    return new NextResponse('Internal error', { status: 500 });
  }

  return NextResponse.json(billboardData as Billboard)
}

export const PATCH = async (
  req: Request,
  { params }: { params: {store_id: string,  billboard_id: string } },
) => {
  const userId = auth().userId!;

  if (!userId) new NextResponse("Unauthenticated", { status: 401 });

  const { data: reqData, error: reqError } =
    await wrapInObject<Billboard>(req.json());
  const label = reqData?.label;
  const imageUrl = reqData?.imageUrl;

  if (!label) new NextResponse("Label is required", { status: 400 });

  if (!imageUrl) new NextResponse("Image URL is required", { status: 400 });

  if (!params.billboard_id)
    new NextResponse("Billboard ID is required", { status: 400 });

  if (reqError) {
    console.log("STORE_PATCH", reqError);
    return new NextResponse("Internal error", { status: 500 });
  }

  const { data: storeByUserData, error: storeByUserError } = await wrapInObject<Store>(prismaDb.store.findFirst({
    where: {
      id: params.store_id,
      userId
    }
  }));

  if(storeByUserError) return new NextResponse('Unauthorized', {status: 403})


  const { data: billboardData, error: billboardError } = await wrapInObject<Billboard>(
    prismaDb.billboard.updateMany({
      where: {
        id: params.billboard_id,
      },
      data: {
        label,
        imageUrl
      },
    }),
  );

  if (billboardError) new NextResponse("BILLBOARD_ID_PATCH");

  return NextResponse.json(billboardData);
};

export const DELETE = async (
  _req: Request,
  { params }: { params: { store_id: string, billboard_id: string } },
) => {
  const userId = auth().userId!;

  if (!userId) new NextResponse("Unauthenticated", { status: 401 });

  if (!params.billboard_id)
    new NextResponse("store_id is required", { status: 400 });

  const { data: storeByUserData, error: storeByUserError } = await wrapInObject<Store>(prismaDb.store.findFirst({
    where: {
      id: params.store_id,
      userId
    }
  }));

  if(storeByUserError) return new NextResponse('Unauthorized', {status: 403})

  const { data: billboardDeleteData, error: billboardDeleteError } = await wrapInObject<Billboard>(
    prismaDb.store.deleteMany({
      where: {
        id: params.billboard_id,
        userId,
      },
    }),
  );

  if (billboardDeleteError) {
    console.log('[BILLBOARD_ID_DELETE]')
    new NextResponse("Internal error", { status: 500 });
  }

  return NextResponse.json(billboardDeleteData)
};