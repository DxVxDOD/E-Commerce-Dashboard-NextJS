import Modal from "@/components/ui/Modal";
import { onClose, selectModals } from "@/redux/features/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { wrapInObject } from "@/lib/promiseWrap";
import { Store } from ".prisma/client";

const StoreModal = () => {
  const modal = useAppSelector((state) => selectModals(state));
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { data: dataPost, error: errorPost } = await wrapInObject<Store>(
      axios.post("/api/stores", values),
    );

    if (dataPost) {
      window.location.assign(`/${dataPost?.id}`);
      setLoading(false);
    }

    console.log(errorPost);
  };

  return (
    <Modal
      title={"Create Store"}
      description={"Add a new store to manage products and categories"}
      isOpen={modal.isOpen}
      onClose={() => dispatch(onClose(modal))}
    >
      <div>
        <div className={"p-4"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={"E-commerce"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name={"name"}
                control={form.control}
              />
              <div
                className={"pt-6 flex justify-end gap-2 items-center w-full"}
              >
                <Button
                  disabled={loading}
                  variant={"outline"}
                  onClick={() => dispatch(onClose(modal))}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type={"submit"}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
