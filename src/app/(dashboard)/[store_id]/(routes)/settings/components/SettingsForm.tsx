"use client";

import { Store } from ".prisma/client";
import { FC, useState } from "react";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { wrapInObject } from "@/lib/promiseWrap";
import AlertModals from "@/components/modals/AlertModals";
import ApiAlert from "@/components/ui/ApiAlert";
import { useOrigin } from "@/hooks/useOrigin";

type SettingsFormProps = {
  initialData: Store;
};

const formSchema = z.object({
  name: z.string().min(1),
});

type TSettingsFormValue = z.infer<typeof formSchema>;
const SettingsForm: FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const origin = useOrigin();

  const form = useForm<TSettingsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: TSettingsFormValue) => {
    setLoading(true);

    const { data: patchData, error: patchError } = await wrapInObject(
      axios.patch(`/api/stores/${params.store_id}`, data),
    );
    router.refresh();
    // update user for success

    console.log(patchData);

    if (patchError) {
      console.log(patchError);
      //   update user about error
    }

    setLoading(false);
  };

  const onDelete = async () => {
    setLoading(true);
    const { data: deleteData, error: deleteError } = await wrapInObject(
      axios.delete(`/api/stores/${params.store_id}`),
    );
    router.refresh();
    router.push("/");
    // notify user about deletion of store

    if (deleteData) {
      console.log(deleteError);
      //   update user about deletion error
    }

    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <AlertModals
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className={"flex items-center justify-between"}>
        <Heading title={"Settings"} description={"Manage store preferences"} />
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash className={"h-4 w-4"} />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"space-y-8 w-full"}
        >
          <div className={"grid grid-cols-3 gap-8"}>
            <FormField
              name={"name"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={"Store name"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className={"ml-auto"} type={"submit"}>
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title={"NEXT_PUBLIC_API_URL"}
        description={`${origin}/api/${params.store_id}`}
        variant={"public"}
      />
    </>
  );
};

export default SettingsForm;
