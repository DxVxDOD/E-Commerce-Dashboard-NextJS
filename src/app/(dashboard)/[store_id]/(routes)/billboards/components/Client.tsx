'use client'

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";

export const BillboardClient = () => {

  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className={'flex items-center justify-between'} >
        <Heading title={`Billboards`} description={'Manage billboards for your store'}/>
        <Button onClick={() => router.push(`/${params.store_id}/billboards/new`)} >
          <Plus className={'mr-2 h-4 w-4'} />
          Add New
        </Button>
      </div>
      <Separator/>
    </>
  )
}