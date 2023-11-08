import { FC } from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { wrapInObject } from "@/lib/promiseWrap";
import prismaDb from "@/lib/prismadb";
import SettingsForm from "@/app/(dashboard)/[store_id]/(routes)/settings/components/SettingsForm";
import { Store } from ".prisma/client";

type SettingsPageProps = {
  params: {
    store_id: string
  }
}

const Page: FC<SettingsPageProps> = async ({params}) => {

  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const { data: storeData, error: storeError } = await wrapInObject<Store>(prismaDb.store.findFirst({
    where: {
      id: params.store_id,
      userId
    }
  }));

  if (storeError) redirect('/');

  return (
    <div className={'flex-col'} >
      <div className={'flex-1 space-y-4 p-8 pt-6'} >
        <SettingsForm initialData={storeData!} />
      </div>
    </div>
  )
}

export default Page