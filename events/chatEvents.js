import {chatPostHandler} from "../controllers/chatController.js";
import messageSchema from "../models/messageSchema.js";

export function chatEvents(io, socket) {
    socket.on("message",async (data)=>{
        console.log("message", data)
        let response = await chatPostHandler(data)
        // console.log("response", response)
        socket.to(response.roomId).emit("messageforwarded", {response: response.message,roomId : response.roomId})
        // socket.emit("messageforwarded", data)
    })

    socket.on('joinRoom', ({roomId})=>{
        socket.join(roomId)
        console.log("joined room", roomId)
    })

    socket.on('getMessages', async ({  email, activeChat })=>{
        console.log("getting messages from server")
        const activeRoom = [email, activeChat].sort().join("_");
        const message = await messageSchema.find({roomId: activeRoom})
        console.log("message", message)
        // console.log("acitveRoom", [email, activeChat].sort().join("_"))
        // console.log("email", email)
        // console.log("activeChat", activeChat)

        // const messages = await messageSchema.find({roomId: acitveRoom})
        socket.emit("initalMessageGet", message)
    })
}
