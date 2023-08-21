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
import { PostValdiation } from "@/lib/validations/post";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { createPost } from "@/lib/actions/post.actions";


export const NewPost = ({userId}:any) => {

  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(PostValdiation),
    defaultValues: {
      text: "",
      userId,
    }
  });

  const onSubmit = async (values: z.infer<typeof PostValdiation>) => {
    await createPost({
      text: values.text,
      author: userId,
      groupId: null,
      path: pathname
    })

    router.push('/');
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="flex flex-col justify-between gap-4">

          <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea rows={8} placeholder="Tell others something about you" {...field} autoComplete="off"
                className="bg-gray-900 text-text outline-none border border-gray-600 resize-none"
                {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit"
        className="py-3 mt-8 bg-primary text-text cursor-pointer hover:bg-primary hover:opacity-90"
        >Post</Button>
      </form>
    </Form>
    </>
  )
}
