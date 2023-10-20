import passport from "passport";

//Funcion general para retornar errores en las estrategias de passport

export const passportError = (strategy) =>{ //Voy a enviar local, github o jwt
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if(error){
                return next(error) // Que la funcion que me llame maneje como va a responder ante mi error
            }
            if(!user){
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }

            req.user = user
            next()
        }) (req, res, next) //Esto es porque me va a llamar un middleware a nivel de ruta 
    }
}

//Recibo un rol y establezco la capacidad del usuario
export const authorization = (rol) => {
    return async (req,res,next) => {
        if(!req.user){
            return res.status(401).send({error: 'user no autorizado'})
        }
        if(req.user.user.rol != rol){
            return res.status(403).send({error: 'Usuario no tiene los permisos necesarios '})
        }
        next()
    }

}