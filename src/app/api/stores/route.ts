import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismaDb from "@/lib/prismadb";
import { wrapInObject } from "@/lib/promiseWrap";
import { TStorePersonDetails } from "@/types/store";

export const POST = async (req: Request) => {
  const { userId } = auth();

  const { data: reqData, error: reqError } = await wrapInObject<TStorePersonDetails>(req.json());

  if (reqError) {
    console.log("[STORE_POST]", reqError);
    return new NextResponse("Internal error", { status: 500 });
  }

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const name = reqData?.name;

  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }

  const { data: storeData, error: storeError } = await wrapInObject(
    prismaDb.store.create({
      data: {
        name,
        userId,
      },
    }),
  );

  if (storeError) console.log(storeError);
  return NextResponse.json(storeData);
};
