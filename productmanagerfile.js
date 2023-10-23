import ProductManager from './productmanager.js';

const manager = new ProductManager('./products.json');

manager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
});

const products = manager.getProducts();
console.log(products);

const productById = manager.getProductById(1);
console.log(productById);

manager.updateProduct(1, { description: 'descripción actualizada' });
console.log(manager.getProducts());

//manager.deleteProduct(1);
console.log(manager.getProducts());