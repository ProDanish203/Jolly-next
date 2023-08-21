import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    text: {type: String, required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    parentId: String,
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
})

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

export default Post;