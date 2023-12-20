import chai from 'chai'
import mongoose from 'mongoose'
import supertest from 'supertest'
import 'dotenv/config'
import { describe } from 'node:test'


const expect = chai.expect

const requester = supertest('http://localhost:8090')

await mongoose.connect(process.env.MONGO_URL)



//TEST USUARIOS

describe('TEST Users Sessions api/sessions', function() {
    let cookie = {}

    it("Ruta: api/sessions/register con método POST", async function() {
        this.timeout(5000); // Aumenta el timeout a 5000ms
        const newUser = {
            first_name: "cr77711",
            last_name: "ronaldo7711",
            age: 33,
            email: "ronaldo7711@gmail.com",
            password: "12341"
        };
    
        const response = await requester.post('/api/sessions/register').send(newUser);
    
        expect(response.status).to.equal(200);
    });
    

    it("Ruta: api/sessions/login con metodo POST", async function () {
        this.timeout(5000); // Increase timeout to 5000ms
        const User = {
            email: "natalia@gmail.com",
            password: "12345"
        }

        const response = await requester.post('/api/sessions/login').send(User)
        const cookieResult = response.body.token
        console.log(response.body)

        expect(cookieResult).to.be.ok

        cookie = {
            name: 'cookie',
            value: cookieResult
        }
        console.log(cookie)
        expect(cookie.name).to.be.ok.and.equal('cookie')
        expect(cookie.value).to.be.ok
    })

    it('Ruta: api/sessions/current con el metodo GET', async function () {
        this.timeout(5000); // Increase timeout to 5000ms
        const {_body, statusCode} = await requester.get('/api/sessions/current')
        .set('cookie', [`${cookie.name} = ${cookie.value}`])

        console.log(_body.payload)

        expect(statusCode).to.be.equal(200);

    })

  
    
})