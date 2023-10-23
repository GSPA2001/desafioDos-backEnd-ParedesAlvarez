import fs from 'fs';

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    addProduct(product) {
        const products = this.getProducts();
        product.id = this.generateUniqueId(products);
        products.push(product);
        this.saveProducts(products);
        return product;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // si no existe el archivo, devolvemos un arreglo vacío
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        const product = products.find((p) => p.id === id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    updateProduct(id, updatedProduct) {
        const products = this.getProducts();
        const productIndex = products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        this.saveProducts(products);
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const updatedProducts = products.filter((p) => p.id !== id);
        if (products.length === updatedProducts.length) {
            throw new Error('Producto no encontrado');
        }
        this.saveProducts(updatedProducts);
    }

    generateUniqueId(products) {
        const ids = products.map((p) => p.id);
        let newId = 1;
        while (ids.includes(newId)) {
            newId++;
        }
        return newId;
    }

    saveProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
}

export default ProductManager;