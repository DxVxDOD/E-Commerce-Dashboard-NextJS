'use client'

import Modal from "@/components/ui/Modal";

export default function RootLayout() {
  return (
   <div className={'text-xl'} >
     <Modal title={'test'} description={'test'} isOpen onClose={() => {}}>
         Children
     </Modal>
   </div>
  )
}
