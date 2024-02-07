import path from 'path';
import fs from 'fs';

// Obtén la ruta del directorio del módulo actual
const __filename = import.meta.url.substring("file:///".length);
const __dirname = path.dirname(__filename);

const getImageById = (req, res) => {
  const { filename } = req.params;
  console.log(`Intento de acceder a la imagen: ${filename}`);
  const imagePath = path.join(process.cwd(), 'upload/products', filename);



  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    console.log(`La imagen no fue encontrada en la ruta: ${imagePath}`);
    res.status(404).json({ error: 'Image not found' });
  }
};

export const getImagePerfilById = (req, res) => {
  const { filename } = req.params;
  const imagePerfilPath = path.join(process.cwd(), 'upload/profiles', filename)

  try{
    if(fs.existsSync(imagePerfilPath)){
      res.sendFile(imagePerfilPath)
    } else {
      res.status(404).send({ error: 'Image Not Found' })
    }
  } catch (error){
    res.status(500).send({ message: 'Error al acceder a la imagen', error: error })
  }

}


export default getImageById;


