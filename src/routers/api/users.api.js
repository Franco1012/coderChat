import { Router } from "express"
import gestorDeUsuarios from "../../app/fs/UserManager.js"
const usersRouter = Router()


usersRouter.get("/",read)
usersRouter.get("/:uid",readOne)
usersRouter.post("/", create)
usersRouter.put("/:uid", update)
usersRouter.delete("/:uid", destroy)

async function read(req, res, next) {
    try {
        const { role } = req.query
        const users = await gestorDeUsuarios.read(role);
        if (users) {
            return res.status(200).json({
                response: users,
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
        const { uid } = req.params

        const user = await gestorDeUsuarios.readOne(uid)

        if (user) {

            return res.status(200).json({
                response: user,
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
        const user = await gestorDeUsuarios.create(data)
        return res.json({
            statusCode: 201,
            message: "User created: " + user.id,

        })

    } catch (error) {
        console.log(error)
        return next(error)
    }
}

async function update(req, res, next) {
    try {
        const { uid } = req.params
        const data = req.body
        const user = await gestorDeUsuarios.update(uid, data)

        return res.json({
            statusCode: 200,
            message: "UPDATE ID: " + user.id,

        })
    } catch (error) {
        console.log(error)
        return next(error)
    }
}
async function destroy(req, res, next) {
    try {
        const { uid } = req.params
        const user = await gestorDeUsuarios.destroy(uid)
        return res.json({
            statusCode: 200,
            message: "DELETE ID: " + user.id,

        })
    } catch (error) {
        console.log(error)
        return next(error)
    }

}


export default usersRouter