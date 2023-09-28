import mongoose from "mongoose";
import express from 'express'
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import messagesRouter from "./routes/messages.routes.js";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from 'url'
import { productModel } from "./models/products.models.js";
import 'dotenv/config'
//import { cartModel } from "./models/cart.models.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import userRouter from "./routes/users.routes.js";
import sessionRouter from "./routes/sessions.routes.js";
import passport from "passport";
import initializePassport from "./config/passport.js";


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = 8090


//CONEXION A LA BASE DE DATOS
mongoose.connect(process.env.MONGO_URL)
.then(async ()=>{
    
    console.log("BDD CONECTADA")

    //const resultados = await productModel.paginate(  { page: 1, sort: '' }, { query: '123', limit: 2 } )

    //console.log(resultados)

    /*const resultados = await cartModel.findOne({_id: '65034e62a405b34e7a9d6a8c'})

    console.log(JSON.stringify(resultados))*/

    
} )
.catch(()=> console.log("Error conexión"))


//CONEXION A BASE DE DATOS
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlparser: true, // establezco que la conexion sea mediante URL
            useUnifiedTopology: true, //manejo de clusters de manera dinamica 
        },
        ttl: 60
    }),
    secret: process.env.SESSION_SECRET,
    resave: false, //fuerzo a que se intente guardar a pesar de no tener modificacion en los datos
    saveUninitialized: false //fuerzo a guardar la sesion a pesar de no tener ningun dato

}))

//MIDDLEWARE PASSPORT
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//ROUTES
app.use(express.json())

app.use('/api/products', productRouter )

app.use('/api/carts', cartRouter )

app.use('/api/messages', messagesRouter)

app.use('/api/users', userRouter)

app.use('/api/sessions', sessionRouter)





//HANDLEBARS
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req,res)=>{
    try{
         res.render('login', {
            js: "form.js",
    })
    } catch{
        console.error("Error al buscar productos:", error);
        res.status(500).send("Error interno del servidor");
    }
    

})




app.listen( PORT, ()=> {
    console.log(`server conect on port ${PORT} `)
})






