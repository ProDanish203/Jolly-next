"use client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValdiation } from "@/lib/validations/post";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image"
import { addComment } from "@/lib/actions/post.actions";

interface Props{
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

export const AddComment = ({ threadId, currentUserImg, currentUserId }: Props) => {

  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CommentValdiation),
    defaultValues: {
      text: "",
      userId: currentUserId,
    }
  });

  const onSubmit = async (values: z.infer<typeof CommentValdiation>) => {
    await addComment({
      parentId: threadId,
      text: values.text,
      userId: currentUserId,
      path: pathname
    })

    form.reset();
  }

  return (
    <>
    <div className="px-4 py-7 bg-bgDark1 rounded-md relative flex flex-row items-center justify-start w-full gap-3">

      <div className="w-full">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="flex items-center gap-4 max-xs:flex-col"
      >

          <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex gap-4 w-full items-center">
              <FormLabel className="sm:w-12 sm:h-12 w-8 h-8 flex items-center relative object-contain ">
                <Image src={currentUserImg} alt={currentUserId} fill
                className="rounded-full"
                />
              </FormLabel>
              <FormControl className="flex-1 w-full">
                <Input type="text" placeholder="Add a reply" {...field} autoComplete="off"
                className="bg-gray-900 w-full text-text outline-none border border-gray-600 resize-none"
                {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit"
        className="py-3 max-xs:w-full bg-primary text-text cursor-pointer hover:bg-primary hover:opacity-90"
        >Add</Button>

      </form>
    </Form>
      </div>

    </div>
    </>
  )
}
