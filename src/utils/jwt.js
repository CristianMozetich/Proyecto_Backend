import "dotenv/config"
import jwt from 'jsonwebtoken'

export const generateToken = ( user ) => {
    /*

    1° parametro : Objeto asociadoal al token (Usuario)
    2° parametro : Clave privada para el sifrado
    3° parametro : Tiempo de expiracion

    */

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {expiresIn: '12h'})
    console.log(token)

    return token
}

generateToken({"_id":"651333512b0a266d50da8b22","first_name":"Natalia","last_name":"Escañuela","age":"60","email":"natalia@gmail.com","password":"$2b$15$XiGqMbsInz5.8zPQ8sHEv.IJ5qSxbA3fBbLCZl0tByUxsJVsUlLO6","rol":"user"})