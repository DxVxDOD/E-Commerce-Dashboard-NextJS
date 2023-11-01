'use client'

import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {onOpen, selectModals} from "@/redux/features/modalSlice";

export default function RootLayout() {

    const modal = useAppSelector(state => selectModals(state));
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!modal.isOpen) dispatch(onOpen(modal));
    },[modal, onOpen])

    return (
   <div className={'text-xl'} >
       Root page
   </div>
  )
}
