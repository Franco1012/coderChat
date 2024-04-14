import { Router } from "express"
import gestorDeProductos from "../../data/fs/ProductManager.js"
const viewProducts = Router()


viewProducts.get("/real",async(req,res,next)=>{
    try {
        return res.render("realProducts")
    } catch (error) {
        console.log(error)
        return next(error)
    }
})
viewProducts.get("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params
        const product = await gestorDeProductos.readOne(pid)
        return res.render("detail", { product })
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

export default viewProducts