import local from 'passport-local' // importo la estrategia
import passport from 'passport' // importo el modulo
import { validatePassword, createHash } from '../utils/bcrypt.js'
import { userModel } from '../models/user.models.js'

//DEFINO LA ESTRATEGIA A UTILIZAR 
const localStrategy = local.Strategy

const initializePassport = ()=>{
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
                return done(null, done)

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