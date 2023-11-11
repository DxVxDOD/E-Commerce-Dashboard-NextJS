"use client";

import { ComponentPropsWithoutRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Store } from ".prisma/client";
import { useAppDispatch } from "@/redux/hooks";
import { onOpen } from "@/redux/features/modalSlice";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { store } from "@/redux/store";

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.store_id,
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          role={"combobox"}
          aria-expanded={open}
          aria-label={"Select a store"}
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className={"mr-2 h-4 w-4"} />
          {currentStore?.label}
          <ChevronsUpDown className={"ml-auto h-4 w-4 shrink-0 opacity-50"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-[200px] p-0"}>
        <Command>
          <CommandList>
            <CommandInput placeholder={"Search store...."} />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading={"Stores"}>
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className={"text-sm"}
                >
                  <StoreIcon />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  dispatch(onOpen(store));
                }}
              >
                <PlusCircle className={"mr-2 h-5 w-5"} />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
