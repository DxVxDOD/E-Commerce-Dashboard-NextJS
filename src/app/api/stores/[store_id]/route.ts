import { auth } from "@clerk/nextjs";
import { wrapInObject } from "@/lib/promiseWrap";
import { NextResponse } from "next/server";
import { TStorePersonDetails } from "@/types/store";
import { Store } from ".prisma/client";
import prismaDb from "@/lib/prismadb";

export const PATCH = async (
  req: Request,
  { params }: { params: { store_id: string } },
) => {
  const userId = auth().userId!;

  if (!userId) new NextResponse("Unauthenticated", { status: 401 });

  const { data: reqData, error: reqError } =
    await wrapInObject<TStorePersonDetails>(req.json());
  const name = reqData?.name;

  if (!name) new NextResponse("Name is required", { status: 400 });

  if (!params.store_id)
    new NextResponse("store_id is required", { status: 400 });

  if (reqError) {
    console.log("STORE_PATCH", reqError);
    return new NextResponse("Internal error", { status: 500 });
  }

  const { data: storeData, error: storeError } = await wrapInObject<Store>(
    prismaDb.store.updateMany({
      where: {
        id: params.store_id,
        userId,
      },
      data: {
        name,
      },
    }),
  );

  if (storeError) new NextResponse("DB error");

  return NextResponse.json(storeData);
};

export const DELETE = async (
  _req: Request,
  { params }: { params: { store_id: string } },
) => {
  const userId = auth().userId!;

  if (!userId) new NextResponse("Unauthenticated", { status: 401 });

  if (!params.store_id)
    new NextResponse("store_id is required", { status: 400 });

  const { data: storeData, error: storeError } = await wrapInObject<Store>(
    prismaDb.store.deleteMany({
      where: {
        id: params.store_id,
        userId,
      },
    }),
  );

  if (storeError) new NextResponse("DB error");

  return NextResponse.json(storeData);
};
