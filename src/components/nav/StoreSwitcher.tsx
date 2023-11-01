'use client'

import { ComponentPropsWithoutRef, useState } from "react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Store } from ".prisma/client";
import { useAppSelector } from "@/redux/hooks";
import { selectModals } from "@/redux/features/modalSlice";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Store as StoreIcon } from "lucide-react";

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[]
}

const StoreSwitcher = ({className, items = []}: StoreSwitcherProps) => {
  const [open, setOpen] = useState(false);

  const modal = useAppSelector(state => selectModals(state));
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map(item => ({
    label: item.name,
    value: item.id
  }));

  const currentStore = formattedItems.find(item => item.value === params.storeId);

  const onStoreSelect = (store: { value: string, label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild >
        <Button>
          <StoreIcon/>
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}

export default StoreSwitcher