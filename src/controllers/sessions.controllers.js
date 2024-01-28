import { generateToken } from "../utils/jwt.js";
import { sendInactiveUserEmail } from "../config/nodemailer.js";


export const login = async (req,res)=>{
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
}

export const register = async (req,res)=>{
    try{
        if(!req.user){
            res.status(400).send({mensaje: 'Usuario existente'})
        }
 
        res.status(200).send({mesaje: 'usuario creado'})
    }catch(error){
        res.status(500).send({mensaje: `Error al registrar usuario ${error} `})
    }
}

export const logout = async (req,res)=>{
    if(req.session.login){
        req.session.destroy()
    }
    res.clearCookie('jwtCookie')
    res.status(200).send({resultado: 'Usuario deslogueado'})
}

export const deleteInactiveSessions = async (req,res) => {
    try{
        const inactiveUsers = await userModel.find({
            last_connection: { $lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 )},
        })

        await Promise.all(inactiveUsers.map(async (user) => {
            if (user.email) {
                await new Promise((resolve) => {
                    req.session.destroy(user.email, (err) => {
                        if (err) {
                            console.error('Error destroying session:', err);
                        }
                        resolve();
                    });
                });
            }
        
            sendInactiveUserEmail(user.email);
        }));

        res.status(200).send({ respuesta: 'ok', message: 'Su sesión caducó'})
    }catch{
        res.status(500).send({ respuesta: 'Error', message: 'No pudimos cerrar la sesión'})
    }
}

