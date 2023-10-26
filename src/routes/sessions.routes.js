import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";
import { generateToken } from '../utils/jwt.js'

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), async (req,res)=>{
  try{
    if(!req.user){
        return res.status(401).send({mensaje: "Invalidate User"})
    }

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email

    }

    const token = generateToken(req.user)

    res.status(200).send({ token })
  }catch(error){
    res.status(500).send({mensaje: `error al iniciar sesion ${error} `})
  }
})

sessionRouter.post('/register', passport.authenticate('register'), async(req, res)=>{
    try{
        if(!req.user){
            res.status(400).send({mensaje: 'Usuario existente'})
        }
 
        res.status(200).send({mesaje: 'usuario creado'})
    }catch(error){
        res.status(500).send({mensaje: `Error al registrar usuario ${error} `})
    }
})


//RUTAS DE ESTRATEGIAS DE GITHUB
sessionRouter.get('/githubCallback', passport.authenticate('github', {scope: ['user: email']}), async (req,res)=>{
    res.status(200).send({mensaje: 'usuario registrado'})
} )

sessionRouter.get('/githubCallback', passport.authenticate('github'), async (req,res)=>{
    req.session.user = req.user
    res.status(200).send({mensaje: 'Usuario logueado'})
} )


//LOGOUT
sessionRouter.get('/logout', (req,res)=>{
    if(req.session.login){
        req.session.destroy()
    }
    res.clearCookie('jwtCookie')
    res.status(200).send({resultado: 'Usuario deslogueado'})
})





sessionRouter.get('/testJWT', passport.authenticate('jwt',{session: false}), (req,res) => {
    console.log(req)
    res.send(req.user)
})

sessionRouter.get('/current', passportError('jwt'), authorization('admin'), (req, res) => {
    res.send(req.user) 
})

export default sessionRouter