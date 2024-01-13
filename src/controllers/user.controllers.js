import { userModel } from "../models/user.models.js";

export const getUser = async (req,res)=>{
    const { page, limit } = req.params
    try {
        const usersData = await userModel.find(page, limit);

        const principalData = usersData.map(data => ({
            name: data.first_name,
            email: data.email,
            rol: data.rol
        }))
        res.status(200).send({respuesta: 'ok', mensaje: principalData})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
}

export const getUserById = async (req,res)=>{
    const {id} = req.params
    try {
        const user = await userModel.findById(id);
        if (user)
            res.status(200).send({respuesta: 'ok', mensaje: user})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'User not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
}

export const putUserById = async (req,res)=>{
    const {id} = req.params
    const {first_name, last_name, age, email, password} = req.body
    try {
        const user = await userModel.findByIdAndUpdate(id, {first_name, last_name, age, email, password});
        if (user)
            res.status(200).send({respuesta: 'ok', mensaje: user})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'User not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
}

export const deleteUser = async (req,res)=>{
    const {id} = req.params
    try {
        const user = await userModel.findByIdAndDelete(id);
        if (user)
            res.status(200).send({respuesta: 'ok', mensaje: user})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'User not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
}

export const updateProfilePicture = async (req,res) => {
    try{
        if(!req.file){
            return res.status(400).send({ message: 'Error al cargar la imagen'})
        }

        return res.status(200).send({ message: 'Imagen cargada exitosamente'})

    }catch{

        return res.status(500).json({ message: 'Hubo un error al subir la imagen de perfil' });
    }
}

export const updateDocuments = async (req,res) => {
    try{
        if(!req.file){
            return res.status(400).send({ message: 'Error al cargar archivo' });
        }
        return res.status(200).send({ message: 'Archivo cargado exitosamente' });
    } catch{
        return res.status(500).json({ message: 'Hubo un error al cargar los archivos' })
    }
}

export const updateProductsImage = async (req, res) => {
    try{
        if(!req.file){
            return res.status(400).send({ message: 'Error al cargar la imagen del producto' })
        }
        return res.status(200).send({ message: 'Imagen del producto cargada exitosamente' })

    }catch{
        return res.status(500).send({ message: 'Error al intentar subir imagen del producto' })
    }
}

