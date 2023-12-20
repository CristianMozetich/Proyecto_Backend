import chai from 'chai'
import mongoose from 'mongoose'
import supertest from 'supertest'
import 'dotenv/config'
import { describe } from 'node:test'


const expect = chai.expect

const requester = supertest('http://localhost:8090')

await mongoose.connect(process.env.MONGO_URL)

//TEST PRODUCTOS

describe('Test CRUD de productos en la ruta api/products', function() {
    
    it('Ruta: api/products metodo POST', async () => {
        const newProduct = {
            title: "Barilla",
            description: "pasta",
            price: 10,
            stock: 15,
            category: "pesto",
            status: true,
            code: "pesto",
            thumbnails: []
        }
        const { statusCode, _body, ok } = await requester.post('/api/products').send(newProduct)

        expect(statusCode).to.be.equal(201)
    }) 

    it('Ruta: api/products metodo GET', async () => {

        const { statusCode, _body, ok } = await requester.get('/api/products')

        expect(statusCode).to.be.equal(200)
    }) 

    it('Ruta: api/products metodo PUT', async () => {
        const id = '657f14b55eb502372ca83713'
        const updateProduct = {
            title: "gorra",
            description: "para el pelo",
            price: 10,
            stock: 15,
            category: "Ropa",
            status: true,
            code: "gorra",
            thumbnails: []
        }
        const { statusCode, _body, ok } = await requester.put(`/api/products/${id}`).send(updateProduct)

        expect(statusCode).to.be.equal(200)
    }) 

    it('Ruta: api/products metodo DELETE', async () => {

        const id = '657f145cb9a6756be0523b98'

        const { statusCode, _body, ok } = await requester.delete(`/api/products/${id}`)

        expect(statusCode).to.be.equal(200)
    }) 
})


