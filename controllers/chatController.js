import { io } from "../index.js";

export function chatPostHandler(request, response){
    io.emit("message", "hello from server")
    response.send("message sent")
}