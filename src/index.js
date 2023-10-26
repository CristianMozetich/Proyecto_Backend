import mongoose from "mongoose";
import express from 'express'
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from 'url'
import 'dotenv/config'
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import initializePassport from "./config/passport.js";
import cookieParser from "cookie-parser";
import router from "./routes/index.routes.js";
import cors from 'cors'


const whiteList = ['http://localhost:5173/']


const corsOptions = {
    origin: function(origin, callback){
        if(whiteList.indexOf(origin) != 1 || !origin){
            callback(null, true)
        } else{
            callback(new Error("Acceso denegado"))
        }  
    }
}



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = 8090


app.use(cookieParser()) // Utilizar CookieParser para obtener los datos de la Cookie con JWT



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

//MIDDLEWARE CORS
app.use(cors(corsOptions))


//ROUTES
app.use(express.json())
app.use('/', router)






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






