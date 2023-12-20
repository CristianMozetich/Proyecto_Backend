import chai from 'chai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';    
import supertest from 'supertest';

const expect = chai.expect;
dotenv.config();

let token = null;
let test_cart_id = null;
let test_product_id = '65034c1122a574058dbe6f23';

const requester = supertest('http://localhost:8090')

await mongoose.connect(process.env.MONGO_URL)

describe('test CRUD de las rutas /api/carts', function () {
    
        before( () => {
            console.log('before the test')
        })
    
        describe('ruta api/carts metodo post', function () {
    
            it('iniciar sesion con post a traves de /sessions/login', async function() { // Increase timeout here 
                this.timeout(5000); // Increase timeout to 5000ms
                const user = {
                    email: 'natalia@gmail.com',
                    password: '12345'
                };
                const { statusCode, _body, ok} = await requester.post('/api/sessions/login').send(user);
                token = _body.token;
                expect(statusCode).to.be.equal(200);
                expect(token).to.be.ok;
            });

            //crear un cart mediante POST
            it('crear un cart mediante post ', async function() { // Increase timeout here
                this.timeout(5000); // Increase timeout to 5000ms
                const { statusCode, _body, ok} = await requester.post('/api/carts')
                console.log(_body)
                test_cart_id = _body.mensaje._id;
                expect(statusCode).to.be.equal(200);
                
            });

            //agregar un producto a un cart mediante POST
            it('agregar un producto a un cart mediante POST en /carts/:cid/products/:pid', async function() { // Increase timeout here
                this.timeout(5000); // Increase timeout to 5000ms
                const quantity = {
                    quantity: 1
                };
                const { statusCode, _body, ok} = await  requester.post(`/api/carts/${test_cart_id}/products/${test_product_id}`).send(quantity)
                console.log(_body)
                expect(statusCode).to.be.equal(200);
            });

            //eliminar cart mediante DELETE en /carts/:id
            it('eliminar cart mediante DELETE en /carts/:id', async function() { // Increase timeout here
                this.timeout(5000); // Increase timeout to 5000ms
                const { statusCode, _body, ok} = await requester.delete(`/api/carts/${test_cart_id}`)
                expect(statusCode).to.be.equal(200);

            });
        });
    });