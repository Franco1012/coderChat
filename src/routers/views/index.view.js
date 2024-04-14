import {Router} from "express"
import gestorDeProductos from "../../data/fs/ProductManager.js"
import viewProducts from "./products.view.js"
import viewUsers from "./users.view.js"

const viewsRouter=Router()
viewsRouter.use("/products",viewProducts)
viewsRouter.use("/users",viewUsers)

viewsRouter.get("/", async (req, res, next) => {
  try {
      const products = await gestorDeProductos.read()
      return res.render("index", { products })
  } catch (error) {
      return next(error)
  }
})

export default viewsRouter