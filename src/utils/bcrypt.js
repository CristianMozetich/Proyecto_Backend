import 'dotenv/config'
import bcrypt from 'bcrypt'



//Modulo para encriptar contraseña

export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)))
}

export const validatePassword = (passwordSend, passwordBDD) => bcrypt.compareSync(passwordSend, passwordBDD)


