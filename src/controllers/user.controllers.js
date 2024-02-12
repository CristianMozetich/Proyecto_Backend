import { userModel } from "../models/user.models.js";
import { productModel } from "../models/products.models.js";
import { cloudinary } from "../utils/cloudinary.js";

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

        const imageBuffer = req.file.buffer.toString('base64'); // Convertir el buffer a base64
        const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${imageBuffer}`);
        const imageUrl = result.secure_url;

        const userId = req.params.uid; // Obtén el ID del usuario de la URL
        const user = await userModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    documents: {
                        filename: req.file.originalname,
                        path: imageUrl
                    }
                }
            },
            {new: true}
            );
            console.log(userId)
            console.log('File information', req.file)

            if(!user){
                return res.status(400).send({ message: 'Error al cargar la imagen'})
            }

        return res.status(200).send({ message: 'Imagen cargada exitosamente'})

    }catch (error){
        console.error(error);
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

        const imageBuffer = req.file.buffer.toString('base64'); // Convertir el buffer a base64
        const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${imageBuffer}`);
        const imageUrl = result.secure_url;

        if(!req.file){
            return res.status(400).send({ message: 'Error al cargar la imagen del producto' })
        }
            // Aquí deberías tener información sobre el producto asociado a la imagen
        const productId = req.params.uid;

        // Actualiza el documento del producto con la información de la imagen
        const product = await productModel.findByIdAndUpdate(
        productId,
        {
            $push: {
            thumbnails: {
                filename: req.file.originalname,
                path: imageUrl,
            },
            },
        },
        { new: true }
        );

        console.log('Product ID:', productId);
        console.log('File Information:', req.file);

        if (!product) {
            return res.status(404).send({ message: 'Producto no encontrado' });
          }

        return res.status(200).send({ message: 'Imagen del producto cargada exitosamente' })

    }catch{
        return res.status(500).send({ message: 'Error al intentar subir imagen del producto' })
    }
}

