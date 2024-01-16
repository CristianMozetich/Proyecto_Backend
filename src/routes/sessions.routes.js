import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";
import { login, register, logout, deleteInactiveSessions } from "../controllers/sessions.controllers.js";

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), login)

sessionRouter.post('/register', passport.authenticate('register'), register)

//LOGOUT
sessionRouter.get('/logout', logout)

//INACTIVESESSION
sessionRouter.delete('/deleteSession', deleteInactiveSessions)


sessionRouter.get('/testJWT', passport.authenticate('jwt',{session: false}), (req,res) => {
    console.log(req)
    res.send(req.user)
})

sessionRouter.get('/current', passportError('jwt'), authorization('admin', 'user'), (req, res) => {
    res.send(req.user) 
})



//RUTAS DE ESTRATEGIAS DE GITHUB
sessionRouter.get('/githubCallback', passport.authenticate('github', {scope: ['user: email']}), async (req,res)=>{
    res.status(200).send({mensaje: 'usuario registrado'})
} )

sessionRouter.get('/githubCallback', passport.authenticate('github'), async (req,res)=>{
    req.session.user = req.user
    res.status(200).send({mensaje: 'Usuario logueado'})
} )

export default sessionRouter