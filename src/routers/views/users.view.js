import { Router } from "express";
import gestorDeUsuarios from "../../data/fs/UserManager.js";

const viewUsers = Router()

viewUsers.get("/register",async (req, res, next) => {
    try {
        return res.render("userRegister")
    } catch (error) {
        console.log(error)
        return next(error)
    }
})
viewUsers.get("/chat",async(req,res,next)=>{
    try {
        return res.render("chat")
    } catch (error) {
        return next(error)
    }
   
})

viewUsers.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params
        const user = await gestorDeUsuarios.readOne(uid)
        return res.render("userDate", { user })
    } catch (error) {
        console.log(error)
        return next(error)
    }

})


export default viewUsers;