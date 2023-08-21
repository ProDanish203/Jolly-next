import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    image: String,
    bio: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Post"
        },
    ],
    onboarded:{
        type: Boolean,
        default: false
    },
    groups: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Group"
        },
    ],
},
{timestamps: true})

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;