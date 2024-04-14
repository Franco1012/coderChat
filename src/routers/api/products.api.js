import { Router } from "express"
import gestorDeProductos from "../../data/fs/ProductManager.js"

const productsRouter = Router()
productsRouter.get("/", read)
productsRouter.get("/:pid", readOne)
productsRouter.post("/", create)
productsRouter.put("/:pid", update)
productsRouter.delete("/:pid", destroy)

async function read(req, res, next) {
    try {
        const { category } = req.query
        const products = await gestorDeProductos.read(category);
        if (products) {
            return res.status(200).json({
                response: products,
                succes: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }


    } catch (error) {
        console.log(error)
        return next(error)
    }
}

async function readOne(req, res, next) {

    try {
        const { pid } = req.params

        const product = await gestorDeProductos.readOne(pid)

        if (product) {

            return res.status(200).json({
                response: product,
                succes: true
            })


        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error)
        return next(error)
    }

}

async function create(req, res, next) {
    try {
        const data = req.body
        const product = await gestorDeProductos.create(data)
        return res.json({
            statusCode: 201,
            message: "Product created: " + product.id,

        })

    } catch (error) {
        console.log(error)
        return next(error)
    }
}

async function update(req, res, next) {
    try {
        const { pid } = req.params
        const data = req.body
        const product = await gestorDeProductos.update(pid, data)

        return res.json({
            statusCode: 200,
            message: "UPDATE ID: " + product.id,

        })
    } catch (error) {
        console.log(error)
        return next(error)
    }
}
async function destroy(req, res, next) {
    try {
        const { pid } = req.params
        const product = await gestorDeProductos.destroy(pid)
        return res.json({
            statusCode: 200,
            message: "DELETE ID: " + product.id,

        })
    } catch (error) {
        console.log(error)
        return next(error)
    }

}


export default productsRouter


