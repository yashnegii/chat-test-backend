import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        // required: true,
        default: ""
    },
    sender: {
        type: String,
        // required: true,
        default: ""
    },
    receiver: {
        type: String,
        // required: true,
        default: ""
    },
    roomId: {
        type: String,
        // required: true,
        default: ""
    },
})


const Message = mongoose.model("Message", messageSchema);
export default Message;