import fs from "fs"

//modulo crypto para generar códigos aleatorios
import crypto from "crypto";

//ruta donde se va a guardar el archivo
const path = `./src/data/fs/files/products.json`

class ProductManager {
    constructor() {
        this.path = path;
        this.init();
    }

    init() {
        try {
            // Verificar si el archivo existe
            if (!fs.existsSync(this.path)) {
                const stringData = JSON.stringify([], null, 2);
                fs.writeFileSync(this.path, stringData);
                console.log("Se creó el archivo");
            } else {
                console.log("El archivo ya existe");
            }
        } catch (err) {
            console.error("Error al inicializar:", err);
        }
    }

    async create(data) {

        //se desestructura el objeto
        const { title, photo, category, price, stock } = data

        try {
            if (title) {
                const product = {
                    id: crypto.randomBytes(12).toString("hex"),
                    title: title,
                    photo: photo || "default.jpg",
                    category: category || "uncategorized",
                    price: price || 1,
                    stock: stock || 1
                }
                //se lee el contenido del archivo ubicado en la ruta path y lo guarda en la variable products
                let products = await fs.promises.readFile(this.path, "utf8")
                //se convierte el contenido del archivo ,que es una cadena json , en un objeto
                products = JSON.parse(products)
                //se agrega el producto creado al array de objetos
                products.push(product)
                //se convierte el array de objetos en una cadena json
                products = JSON.stringify(products, null, 2)
                //se sobrescribe el contenido del archivo
                await fs.promises.writeFile(this.path, products)
                console.log(`producto creado`)
                return product


            } else {
                const error = new Error("NOT CREATE")
                error.statusCode = 404
                throw error
            }

        }
        //se captura la excepción y se maneja el error
        catch (error) {
            throw error
        }

    }
    async read(category = "") {
        try {
            let products = await fs.promises.readFile(this.path, "utf-8")
            products = JSON.parse(products)
            if (category !== '') {
                products = products.filter(product => product.category === category);
            }

            return products

        }
        catch (error) {
            console.log(error)
            throw error
        }
    }
    async readOne(pid) {
        try {

            let products = await this.read()

            //se utiliza el método find para encontrar el producto cuyo id coincide con el id que se pasa por parámetro en el método readOne
            let one = products.find((product) => product.id === pid)

            console.log(one)
            return one
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }
    async destroy(pid) {
        try {

            let products = await this.read()

            let one = products.find((product) => product.id === pid)
            //verificamos que exista el producto a eliminar
            if (one) {
                //filtramos los productos cuyo id No coincidan con el id que se pasa como parámetro del método destroy
                let filtered = products.filter((product) => product.id !== pid)
                filtered = JSON.stringify(filtered, null, 2)
                await fs.promises.writeFile(this.path, filtered)
                console.log(`producto eliminado`)
                return one
            } else {
                const error = new Error("NOT FOUND")
                error.statusCode = 404
                throw error
            }
        }
        catch (error) {
            throw error

        }
    }
    async update(pid, data) {
        try {

            let products = await this.read()
            let product = products.find(p => p.id === pid)
            console.log("product", product)

            if (product) {
                for (let prop in data) {
                    product[prop] = data[prop]
                }

                products = JSON.stringify(products, null, 2)
                await fs.promises.writeFile(this.path, products)
                console.log("producto actualizado")
                return product

            } else {
                const error = new Error("NOT FOUND")
                error.statusCode = 404
                throw error
            }

        } catch (error) {
            throw error

        }
    }
}

/*async function test() {
    try {
        const gestorDeProductos = new ProductManager();
        await gestorDeProductos.create({
            title: `zapatilla`,
            photo: `img.jpg`,
            category: `calzado`,
            price: 75000,
            stock: 500
        })
 
        await gestorDeProductos.create({
            title: `remera`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 15000,
            stock: 200
        })
        await gestorDeProductos.create({
            title: `pantalón`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 30000,
            stock: 500
        })
        await gestorDeProductos.create({
            title: `bufanda`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 12000,
            stock: 150
        })
        await gestorDeProductos.create({
            title: `camisa`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 45000,
            stock: 300
        })
        await gestorDeProductos.create({
            title: `botas`,
            photo: `img.jpg`,
            category: `calzado`,
            price: 95000,
            stock: 300
        })
        await gestorDeProductos.create({
            title: `pollera`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 25000,
            stock: 200
        })
        await gestorDeProductos.create({
            title: `short`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 45000,
            stock: 100
        })
        await gestorDeProductos.create({
            title: `gorra`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 15000,
            stock: 900
        })
        await gestorDeProductos.create({
            title: `cinto`,
            photo: `img.jpg`,
            category: `ropa`,
            price: 25000,
            stock: 150
        })
        await gestorDeProductos.read()
        await gestorDeProductos.readOne("f75bd2bb1e94cb5bc1236ea7")
        await gestorDeProductos.destroy("69d1c0656c923a545631ad2d")
 
    }
    catch (error) {
        console.log(error)
    }
}
test()*/
const gestorDeProductos = new ProductManager()
export default gestorDeProductos



