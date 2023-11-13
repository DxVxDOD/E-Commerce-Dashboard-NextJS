import { wrapInObject } from "@/lib/promiseWrap";
import prismaDb from "@/lib/prismadb";
import { Billboard } from "@prisma/client";

const BillboardPage = async ({params}: {params: {billboard_id: string}}) => {

  const { data: billboardData, error: billboardError } = await wrapInObject<Billboard>(prismaDb.billboard.findUnique({
    where: {
      id: params.billboard_id
    }
  }));

  if (billboardError) console.log('PrismaDb billboard error', billboardError)

  return (
    <div className={'flex flex-col'}>
      <div className={'flex-1 space-y-4 p-8 pt-6'} >

      </div>
    </div>
  )
}

export default BillboardPage