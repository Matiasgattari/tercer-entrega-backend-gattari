import express from 'express';
import { ProductManager } from './ProductManager.js';

const productManager = new ProductManager('./productos.txt');
const app = express();
const PORT = 8080;

//lineas de configuracion para que lea json 
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


// console.log("getproducts: ", await productManager.getProducts());

app.get('/', (req, res) => {
    res.send(`<h1>Servidor en puerto ${PORT} </h1>`)
})

app.get('/products', async (req, res) => {
    try {
        const poductosLeidos = await productManager.getProducts()

        //obtengo parametro limit de las querys
        const limite = req.query.limit;
        let productosXPagina;

        //si se brinda limite corto en el limite deseado.
        if (limite) {
            productosXPagina = poductosLeidos.slice(0, limite)
            res.send(productosXPagina)
        }

        res.json(poductosLeidos)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})

app.get('/products/:pid', async (req, res) => {

    try {
        const idProducto = req.params.pid
        const poductosLeidos = await productManager.getProducts()
    
    
        if (idProducto) {
    
            const productosString = typeof (poductosLeidos)
    
            const objeto = Object.values(poductosLeidos)
            const objetoTipo = typeof (poductosLeidos)
    
            let filtrado = objeto.find((prod) => prod.id === idProducto)
    
            if (filtrado) {
    
                res.send(filtrado)
            } else {
                throw new Error("no existe el id")
            }
    
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


})



/*

//le paso un nombre de archivo y la carpeta en la que esta, y el programa lo lee en formato texto
app.get('/products', (req, res) => {
    res.sendFile('productos.txt', {
        root: './'
    })
})
*/

const server = app.listen(PORT)