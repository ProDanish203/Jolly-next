"use client"
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValdiation } from "@/lib/validations/user";
import { Button } from "../ui/button";
import * as z from "zod";
import Image from "next/image";
import { ChangeEvent } from "react";
import { Textarea } from "../ui/textarea";

interface Props{
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    },
    btnTitle: string;
}

export const AccountProfile = ({user, btnTitle}: Props) => {
  
  const  form = useForm({
    resolver: zodResolver(UserValdiation),
    defaultValues: {
      profile_photo: "",
      name: "",
      username: "",
      bio: ""
    }
  });

  const handleFile = (e:ChangeEvent, change:(val:string) => void) => {
    e.preventDefault();
  }

  function onSubmit(values: z.infer<typeof UserValdiation>) {
    console.log(values)
  }
  
  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="flex flex-col justify-between gap-4">

        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex justify-start items-center gap-3">
              <FormLabel>{field.value ? 
              <Image src={field.value} height={35} priority width={35} alt="Profile Photo" className="object-contain"/>
              : <div className="rounded-full text-xl font-bold w-16 h-16 cursor-pointer bg-primary flex items-center justify-center text-text">
                I
              </div>
              }
              </FormLabel>
              <FormControl>
                <Input type="file" placeholder="Uplaod a photo" {...field} autoComplete="off"
                className="bg-transparent hidden text-text border-none"
                accept="image/*"
                onChange={(e) => handleFile(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="example123" {...field} autoComplete="off"
                className="bg-gray-200 text-bg outline-none"
                {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Example Name" {...field} autoComplete="off"
                className="bg-gray-200 text-bg outline-none"
                {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="Tell others something about you" {...field} autoComplete="off"
                className="bg-gray-200 text-bg outline-none"
                {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit"
        className="py-3 mt-8 bg-primary text-text cursor-pointer hover:bg-primary hover:opacity-90"
        >Submit</Button>
      </form>
    </Form>
    </>
  )
}
