import { Router } from "express"
import { getUser, getUserById, putUserById, deleteUser, updateProfilePicture, updateDocuments, updateProductsImage } from "../controllers/user.controllers.js";
import crypto from 'crypto'
import { sendRecoveryMail } from "../config/nodemailer.js";
import { upload } from "../config/multer.js";
import getImageById from "../controllers/img.controllers.js";
import { getImagePerfilById } from "../controllers/img.controllers.js";


const userRouter = Router();
const recoveryLinks = {}


//revisar metodos de recuperación de contraseña
userRouter.post('/password-recovery', (req, res) => {
    const { email } = req.body;

    try {
        const token = crypto.randomBytes(20).toString('hex');
        recoveryLinks[token] = { email: email, timestamp: Date.now() };

        const recoveryLink = `http://localhost:8090/api/users/reset-password/${token}`;
        sendRecoveryMail(email, recoveryLink);

        res.status(200).send('Correo de recuperación enviado');
    } catch (error) {
        res.status(500).send(`Error al enviar al Mail ${error}`);
    }
});

userRouter.post('/reset-password/:token', (req, res) => {
    //Recuperar la contraseña
    const { token } = req.params
    const { newPassword, newPassword2 } = req.body

    try{
        const linkData = recoveryLinks[token]
            if(linkData && Date.now() - linkData.timestamp <= 3600000){
                console.log(newPassword, newPassword2)
                const { email } = linkData
                console.log(email)
                console.log(token)
                if(newPassword === newPassword2){
                //Modificar usuario con nueva contraseña
                delete recoveryLinks[token]

                res.status(200).send(`Contraseña modificada correctamente`)
                } else{
                res.status(400).send(`Las contraseñas deben ser identicas`)
                }
            }else{
            res.status(400).send(`Token invalido o expirado, pruebe nuevamente`)
        }
    } catch(error){
        res.status(500).send(`Error al modificar contraseña ${error}`)
    }
})

userRouter.get('/', getUser)

userRouter.get('/:id', getUserById)

userRouter.put('/:id', putUserById)

userRouter.delete('/:id', deleteUser)

userRouter.post('/:uid/documents',upload.array('documents'), updateDocuments);

userRouter.post('/:uid/profiles', upload.single('profileImage'), updateProfilePicture)

userRouter.post('/:uid/products', upload.single('productImage'), updateProductsImage)

userRouter.get('/images/:filename', getImageById);

userRouter.get('/imagesperfil/:filename', getImagePerfilById)

export default userRouter