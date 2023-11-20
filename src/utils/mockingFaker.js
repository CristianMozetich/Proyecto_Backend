import { faker } from "@faker-js/faker"
import express from 'express'

const app = express()


const modelProduct = async () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.binary(),
        category: faker.commerce.productAdjective(),
        status: faker.datatype.boolean(),
        code: faker.location.countryCode(),
        thumbnails: faker.image.avatar(),
    }
}

export const createRandomProducts = async (cantProducts) => {
    const products = []

    for(let i = 0; i < cantProducts; i++) {
        const product = await modelProduct();
        products.push(product);

    }

    return products
}

//console.log(createRandomProducts(100))


// Endpoint para generar productos aleatorios, el mismo lo trasladé a un controlador con manejo de errores y a una route.
/*
app.get('/mockingproducts', (req, res) => {
    const products = createRandomProducts(100);
    res.json(products);
});
*/

// Diccionario de errores comunes
const erroresComunes = {
    'missing_field': 'Falta un campo obligatorio en la solicitud.',
    'invalid_data': 'Los datos proporcionados son inválidos.',
    'product_not_found': 'El producto no se encontró en la base de datos.',
    // Agregar más errores según sea necesario
};



