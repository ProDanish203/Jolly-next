"use client"
import {
  Form,
  FormControl,
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
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadThing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";


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
  
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing("media")

  const pathname = usePathname();
  const router = useRouter();

  const  form = useForm({
    resolver: zodResolver(UserValdiation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || ""
    }
  });

  const handleFile = (e:ChangeEvent<HTMLInputElement>, change:(val:any) => void) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if(e.target.files && e.target.files.length > 0){
      const file = e.target.files[0];
      
      setFiles(Array.from(e.target.files))

      if(!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || '';

        change(imageDataUrl);
      }
      fileReader.readAsDataURL(file);
    }
  }

  const onSubmit = async (values: z.infer<typeof UserValdiation>) => {
    const blob = values.profile_photo;         

    const hasImageChanged = isBase64Image(blob) 
    if(hasImageChanged){
      const imgRes = await startUpload(files) 

      if(imgRes && imgRes[0].fileUrl){
        values.profile_photo = imgRes[0].fileUrl;
      } 
    }

    //Update user info
    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      path: pathname
    })

    if(pathname === '/profile/edit'){
      router.back();
    }else{
      router.push('/')
    }
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
              <Image src={field.value} height={45} priority width={45} alt="Profile Photo" className="object-cover rounded-full w-20 h-20"/>
              : <div className="rounded-full text-xl font-bold w-16 h-16 cursor-pointer bg-primary flex items-center justify-center text-text">
                I
              </div>
              }
              </FormLabel>
              <FormControl>
                <Input type="file" placeholder="Upload a photo" value={undefined} autoComplete="off"
                className="bg-transparent text-text hidden border-none"
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
          name="bio"
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
