import { FC } from "react";
import { wrapInObject } from "@/lib/promiseWrap";
import prismaDb from "@/lib/prismadb";
import { TStore } from "@/types/store";

type DashboardPageProps = {
  params: { storeId: string }
}

const DashboardPage: FC<DashboardPageProps> = async ({params}) => {

  const {data: storeData, error: storeError} = await wrapInObject<TStore>(prismaDb.store.findFirst({
    where: {
      id: params.storeId
    }
  }))

  if (storeError) console.log(storeError)

  return (
    <>
    Active store: {storeData?.name}
    </>
  )
}

export default DashboardPage