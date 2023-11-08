'use client'

import { Store } from ".prisma/client";
import { FC, useState } from "react";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type SettingsFormProps = {
  initialData: Store
}

const formSchema = z.object({
  name: z.string().min(1)
})

type TSettingsFormValue = z.infer<typeof formSchema>
const SettingsForm: FC<SettingsFormProps> = ({initialData}) => {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false);

  const form = useForm<TSettingsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const onSubmit = (data: TSettingsFormValue) => {
    console.log(data)
  }

  return (
   <>
     <div className={'flex items-center justify-between'} >
       <Heading title={'Settings'} description={'Manage store preferences'} />
       <Button variant={'destructive'} size={"sm"} onClick={() => {}} >
         <Trash className={'h-4 w-4'} />
       </Button>
     </div>
     <Separator/>
     <Form {... form} >
     <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-8 w-full'}>
       <div className={'grid grid-cols-3 gap-8'} >
         <FormField
           name={'name'}
           control={form.control}
           render={({field}) => (
             <FormItem>
               <FormLabel>Name</FormLabel>
               <FormControl>
                 <Input disabled={loading} placeholder={'Store name'} {...field} />
               </FormControl>
               <FormMessage/>
             </FormItem>
           )}
         />
       </div>
       <Button disabled={loading} className={'ml-auto'} type={"submit"} >
         Save changes
       </Button>
     </form>
     </Form>
   </>
  )
}

export default SettingsForm