import { io } from "../index.js";
import messageSchema from "../models/messageSchema.js";
import user from "../models/userSchema.js";

export function chatPostHandler(data){
    return new Promise((resolve, reject)=>{
        messageSchema.create({
            message: data.message,
            sender: data.User,
            receiver: data.reciever,
            roomId: data.roomId
        }).then((message)=>{ 
            const roomId = [data.User, data.reciever].sort().join("_");
            // console.log("roomId from controller", roomId) 
            resolve({message,roomId})
        })
        .catch((err)=>{
            console.log("error", err)
            reject(err)
        })

    })   
}

export async function getUserHandler(request, response){
    const users = await user.find({});
    response.status(200).json({users: users, status: "ok"});

}