import { Router } from "express";
import passport from "passport";

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

    res.status(200).send({ payload: req.user })
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


sessionRouter.get('/logout', (req,res)=>{
    if(req.session.login){
        req.session.destroy()
    }

    res.status(200).send({resultado: 'Usuario deslogueado'})
})

export default sessionRouter