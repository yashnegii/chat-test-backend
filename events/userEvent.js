import { signupPostHandler } from "../controllers/authController.js"

export function userEvents(io, socket){
    // socket.on("userCreated",async ({email, password})=>{
    //     try {
    //         let data = await signupPostHandler({email, password})
    //         console.log("user created", data)
    //         socket.emit("userAdded", data)
    //     } catch (error) {
    //         console.log("error in user event", error)
    //         socket.emit("userAdded", error)
    //     }
        
    // })
}