import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismaDb from "@/lib/prismadb";
import { wrapInObject } from "@/lib/promiseWrap";
import { Billboard } from "@prisma/client";
import { Store } from ".prisma/client";

export const POST = async (req: Request, { params }: { params: { store_id: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  const { data: reqData, error: reqError } =
    await wrapInObject<Billboard>(req.json());

  if (reqError) {
    console.log("[BILLBOARDS_POST]", reqError);
    return new NextResponse("Internal error", { status: 500 });
  }

  const label = reqData?.label;
  const imageUrl = reqData?.imageUrl;

  if (!label) {
    return new NextResponse("Label is required", { status: 400 });
  }
  if (!imageUrl) {
    return new NextResponse("Image URL is required", { status: 400 });
  }

  if (!params.store_id) {
    return new NextResponse("Store ID is required", { status: 400 });
  }

  const { data: storeByUserData, error: storeByUserError } = await wrapInObject<Store>(prismaDb.store.findFirst({
    where: {
      id: params.store_id,
      userId
    }
  }));

  if(storeByUserError) return new NextResponse('Unauthorized', {status: 403})

  const { data: billboardData, error: billboardError } = await wrapInObject<Billboard>(
    prismaDb.billboard.create({
      data: {
        label,
        imageUrl,
        store_id: params.store_id,
      },
    }),
  );

  if (billboardError) console.log(billboardError);
  return NextResponse.json(billboardData);
};

export const GET = async (req: Request, { params }: { params: { store_id: string } }) => {

  if (!params.store_id) {
    return new NextResponse("Store ID is required", { status: 400 });
  }

  const { data: billboardsData, error: billboardsError } = await wrapInObject(prismaDb.billboard.findMany({
    where: {
      store_id: params.store_id
    }
  }));

  if (billboardsError) {
    console.log('BILLBOARDS_GET', billboardsError)
    return new NextResponse('internal error', {status: 500})
  }

  return NextResponse.json(billboardsData as Billboard[])

}