import { FC } from "react";
import { wrapInObject } from "@/lib/promiseWrap";
import prismaDb from "@/lib/prismadb";
import { Store } from ".prisma/client";

type DashboardPageProps = {
  params: { store_id: string };
};

const DashboardPage: FC<DashboardPageProps> = async ({ params }) => {
  const { data: storeData, error: storeError } = await wrapInObject<Store>(
    prismaDb.store.findFirst({
      where: {
        id: params.store_id,
      },
    }),
  );

  if (storeError) console.log(storeError);

  return <>Active store: {storeData?.name}</>;
};

export default DashboardPage;
