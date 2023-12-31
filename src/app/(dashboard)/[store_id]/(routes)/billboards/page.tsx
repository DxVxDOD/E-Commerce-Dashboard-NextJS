import { BillboardClient } from "@/app/(dashboard)/[store_id]/(routes)/billboards/components/Client";

const BillboardPage = () => {
  return (
    <div className={'flex flex-col'} >
      <div className={'flex-1 space-y-4 p-8 pt-6'} >
        <BillboardClient/>
      </div>
    </div>
  )
}

export default BillboardPage