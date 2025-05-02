

export function chatEvents(io, socket) {
    socket.on("message",(data)=>{
        console.log("message from client", data)
        io.emit("broadcast", data)
    })
}
