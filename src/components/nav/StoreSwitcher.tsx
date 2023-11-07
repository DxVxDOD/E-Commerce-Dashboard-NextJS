'use client'

import { ComponentPropsWithoutRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Store } from ".prisma/client";
import { useAppSelector } from "@/redux/hooks";
import { selectModals } from "@/redux/features/modalSlice";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandInput, CommandList } from "@/components/ui/command";

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
        <Button
        variant={'outline'}
        size={"sm"}
        role={'combobox'}
        aria-expanded={open}
        aria-label={'Select a store'}
        className={cn('w-[200px] justify-between', className)}
        >
          <StoreIcon className={'mr-2 h-4 w-4'} />
          Current Store
          <ChevronsUpDown className={'ml-auto h-4 w-4 shrink-0 opacity-50'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={'w-[200px] p-0'} >
        <Command>
          <CommandList>
            <CommandInput placeholder={'Search store....'} />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher