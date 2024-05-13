"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Schema, z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { FaArrowDownLong } from "react-icons/fa6"
 

export const SettingCompAdmin = ({inputValue, label, data}:any) => {

    

    
    const FormSchema = z.object({
        input: z
        .string({
              required_error: "Please skriv noget, tak.",
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      })
     
      function onSubmit(data: z.infer<typeof FormSchema>) {


        const formData ={
            [inputValue]: data.input
        }

        form.setValue('input', '');


        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
            </pre>
          ),
        })
      }

    return (
        <>
            <div className="flex justify-center font-bold text-lg border rounded p-3 mb-3">
                <p>{label}</p>
            </div>
            <div>
                <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex justify-between mb-3">
                        <FormField
                        control={form.control}
                        name="input"
                        render={({ field }) => (
                            <FormItem className="w-4/5">
                            <FormControl>
                                <Input placeholder="Skriv en nye mulighed" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit"><FaArrowDownLong /></Button>
                    </form>
                </Form>
                </div>
            </div>
            <div className="flex p-3 border rounded mb-3 justify-between">
                {data.map((item:any) => (
                    <div key={item._id} className="flex justify-between w-full p-3 border rounded mb-3">
                        <p>{item.fiskeArter}</p>
                    </div>
                ))}
            </div>
        </>
    )
}