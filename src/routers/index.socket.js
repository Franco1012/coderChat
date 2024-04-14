import gestorDeProductos from "../data/fs/ProductManager.js"
import { socketServer } from "../../server.js"
let messages=[]
export default async (socket) => {
    console.log("client id: ", socket.id)
    socket.emit("products", await gestorDeProductos.read())
    socket.on("add", async (data) => {
        console.log(data)
        await gestorDeProductos.create(data)
        socket.emit("products", await gestorDeProductos.read())
    })
    socket.on("nickname",async nick=>{
        messages.push(nick+" is online")
        socketServer.emit("all messages",messages)
    })
    socket.on("message",message=>{
        messages.push(message)
        socketServer.emit("all messages",messages)
    })
}