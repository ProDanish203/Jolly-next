import * as z from "zod";

export const PostValdiation = z.object({
    text: z.string().nonempty().min(3, {message: "Minimum 3 characters required"}).max(500, {message: "Charcter limit reached"}), 
    userId: z.string()
})


export const CommentValdiation = z.object({
    text: z.string().nonempty().min(3, {message: "Minimum 3 characters required"}).max(500, {message: "Charcter limit reached"}), 
    userId: z.string()
})
