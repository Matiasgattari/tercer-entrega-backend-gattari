import {
    randomUUID
} from 'crypto'
import fs from 'fs/promises'

//constructor para creacion de productos nuevos
export class Product {
    constructor({title, description, price, thumbnail, code, stock}) {
      this.id = randomUUID();
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
}



export class ProductManager {

    constructor(path) {
        this.products;
        this.path = path;
    }


    async readProducts() {
        const data = await fs.readFile(this.path, "utf-8");
        this.products = JSON.parse(data);
      }
    
    async getProducts() {
        await this.readProducts();
        return this.products;
      }


 
    async addProduct(title, description, price, thumbnail, stock, code) {

        try {
            const productFind = this.products.find((product) => product.title === title)
            if (productFind) {
                console.log('Ya existe un producto con ese titulo');
            }
    
            if (title !== undefined && description !== undefined && price !== undefined && thumbnail !== undefined && stock !== undefined && code !== undefined) {
                const product = {
                    id: randomUUID(),
                    title : title,
                    description : description,
                    price : price,
                    thumbnail : thumbnail,
                    code : code,
                    stock : stock
                }
    
                this.products.push(product)
                const jsonProducts = JSON.stringify(this.products, null, 2)
                await fs.writeFile(this.path, jsonProducts)
    
            } 
            
        } catch (error) {
            throw new Error ("Los campos no pueden estar vacios")
        }
       
    }

    async getProductById(id) {
      
          const jsonProducts = await fs.readFile(this.path, 'utf-8')
          this.products = JSON.parse(jsonProducts)
  
          const productFind = this.products.find((product) => product.id === id)
          if (productFind === undefined) {
              throw new Error("producto no encontrado o ID invalido")
          } else {
  
              return productFind
          }
      
    }

async updateProduct(id, prodModificado) {
    
        const jsonProducts = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(jsonProducts)
    
        const product = this.products.find((prod) => prod.id === id);
        const indice = this.products.findIndex(p => p.id === id)
    
        if (!product) {
          throw new Error("El id no existe");
        }
        
        const nuevoProducto = new Product({ ...product, ...prodModificado, id:product.id})
        this.products[indice] = nuevoProducto
        
        const jsonProductsModif = JSON.stringify(this.products, null, 2)
        await fs.writeFile(this.path, jsonProductsModif)
        console.log("El producto se actualizo con exito");
   
  }



    async deleteProduct(id) {
        const jsonProducts = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(jsonProducts)

        const productFindIndex = this.products.findIndex((product) => product.id === id)

        if (productFindIndex === -1) {
            throw new Error("Product Not found");
        } else {
            this.products.splice(productFindIndex, 1)
            console.log('Product deleted');

            const jsonProducts = JSON.stringify(this.products, null, 2)
            await fs.writeFile(this.path, jsonProducts)
        }

    }
}

// const productManager = new ProductManager('./productos.txt');

// const prod1 = productManager.addProduct("Camisa", "Camisa de algodon", 2222, "https://google.com.ar", 5, );
// const prod2 = productManager.addProduct("tv2", "descripcion prod 2", 2500, "url imagen", 45);
// const prod3 = productManager.addProduct("tv3", "descripcion prod 3", 3500, "url imagen", 45);
// const prod4 = productManager.addProduct("tv4", "descripcion prod 3", 3500, "url imagen", 45);
// const prod5 = productManager.addProduct("tv5", "descripcion prod 3", 3500, "url imagen", 45);

// productManager.deleteProduct('6c80a977-dfa6-489a-a8a6-51d6861c26fd')

// console.log('console log de get products',await productManager.getProducts());

// console.log("producto filtrado por ID", productManager.getProductById('6c80a977-dfa6-489a-a8a6-51d6861c26fd'));



