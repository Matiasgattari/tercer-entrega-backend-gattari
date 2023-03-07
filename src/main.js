import express from 'express';
import { ProductManager } from '../ProductManager.js';
import { Product } from '../ProductManager.js';

const productManager = new ProductManager('./productos.txt');
const app = express();
const PORT = 8080;

//lineas de configuracion para que lea json 
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// console.log("getproducts: ", await productManager.getProducts());

app.get('/', (req, res) => {
    res.send(`<h1>Servidor en puerto ${PORT} </h1>`)
})

app.get('/products',async (req, res) => {
    const poductosLeidos =await productManager.getProducts()
    
    res.json(poductosLeidos)
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