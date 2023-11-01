import { ReactNode } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { wrapInObject } from "@/lib/promiseWrap";
import prismaDb from "@/lib/prismadb";
import { TStore } from "@/types/store";

const SetupLayout = async ({ children }: { children: ReactNode }) => {

  const { userId } = auth()

  if (!userId) redirect('/sign-in');

  const {data: storeData, error: storeError} = await wrapInObject<TStore>(prismaDb.store.findFirst({
    where: {
      userId
    }
  }))

  if (storeError) console.log('error')

  if (storeData) redirect(`/${storeData.id}`);

  return (
    <>
      {children}
    </>
  )
}

export default SetupLayout