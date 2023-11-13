"use client";

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
import { useOrigin } from "@/hooks/useOrigin";
import { toast } from "react-hot-toast";
import { Billboard } from "@prisma/client";

type BillboardFormProps = {
  initialData: Billboard | null;
};

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1)
});

type TBillboardFormValue = z.infer<typeof formSchema>;
const SettingsForm: FC<BillboardFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const origin = useOrigin();

  const form = useForm<TBillboardFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      imageUrl: '',
      label: ''
    },
  });

  const title = initialData ? 'Edit billboard' : 'Create billboard'
  const description = initialData ? 'Edit billboard.' : 'Add a new billboard.'
  const toastMessage = initialData ? 'Billboard updated' : 'Billboard created'
  const action = initialData ? 'Save changes' : 'Create'

  const onSubmit = async (data: TBillboardFormValue) => {
    setLoading(true);

    const { data: patchData, error: patchError } = await wrapInObject(
      axios.patch(`/api/stores/${params.store_id}`, data),
    );
    router.refresh();
    toast.success('Store successfully created!')

    console.log(patchData);

    if (patchError) {
      console.log(patchError);
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
    toast.success('Store successfully deleted!');

    if (deleteData) {
      console.log(deleteError);
      toast.error(deleteError)
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
        <Heading title={title} description={description} />
        {initialData &&
          <Button
          variant={"destructive"}
          size={"sm"}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash className={"h-4 w-4"} />
        </Button>}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"space-y-8 w-full"}
        >
          <div className={"grid grid-cols-3 gap-8"}>
            <FormField
              name={"label"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={"Billboard label"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className={"ml-auto"} type={"submit"}>
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default SettingsForm;
