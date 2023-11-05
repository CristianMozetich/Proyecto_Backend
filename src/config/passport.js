import local from 'passport-local' // importo la estrategia
import 'dotenv/config'
import passport from 'passport' // importo el modulo
import { validatePassword, createHash } from '../utils/bcrypt.js'
import { userModel } from '../models/user.models.js'
import GitHubStrategy from 'passport-github2'
import jwt from 'passport-jwt'

//DEFINO LA ESTRATEGIA A UTILIZAR 
const localStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt //extraer de las cookies el token


const initializePassport = ()=>{

    const cookieExtractor = req =>{
        console.log(req.cookies)

        const token = req.cookies.jwtCookie ? req.cookies.jwtCookie : {}

        console.log("cookieExtractor", token)

        return token

    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), // El token va a venir desde cookieExtractor
        secretOrKey: process.env.JWT_SECRET

    }, (jwt_payload, done) => { // jwt_payload = info del token (en este caso info del cliente)
        
        console.log("JWT", jwt_payload);
        done(null, jwt_payload);
    }));
    

    passport.use('register', new localStrategy(
    {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) =>{
        //REGISTRO DE USUARIO

        const {first_name, last_name, email, age} = req.body

        try{
            const user = await userModel.findOne({email: email})

            if(user){
                //si existe el usuario
                return done(null, false)
            } else{
                //creo el usuario
                const passwordHash = createHash(password)
                const userCreated = await userModel.create({
                    first_name: first_name,
                    last_name: last_name,
                    age: age,
                    email: email,
                    password: passwordHash
                })

                return done(null, userCreated)
            }

        } catch (error){
            return done(error)
        }
    }
    ))

    passport.use('login', new localStrategy(
        {usernameField: 'email'}, async(username, password, done) =>{

        try{
            const user = await userModel.findOne({email: username})

            if(!user){
                return done(null, false)

            }

            if(validatePassword(password, user.password)){
                return done(null, user)
            }

            return done(null, false)

        }catch(error){
            return done(error)
        }
    }
    ))


    
    //GITHUB APP (ESTRATEGIA DE AUTENTICACION DE GITHUB CON PASSPORT)
    passport.use('github', new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET_CLIENT,
        callbackURL: process.env.CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try{
            console.log(accessToken)
            console.log(refreshToken)
            console.log(profile._json)
            const user = await userModel.findOne( {email: profile._json.email} )

            if(user){
                done(null, false)
            }else{
                const userCreated = await userModel.create({
                    first_name: profile._json.name,
                    last_name: '',
                    email_profile: profile._json.email,
                    age: 18, //Edad por defecto
                    password: createHash(profile._json.email + profile._name )
                })

                done(null, userCreated)
            }
        }catch(error){
            done(error)
        }
    }))




    //INICIALIZAR LA SESION DEL USUARIO
    passport.serializeUser((user, done)=>{
        done( null, user._id )
    })

    //ELIMINAR LA SESION DEL USUARIO
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport