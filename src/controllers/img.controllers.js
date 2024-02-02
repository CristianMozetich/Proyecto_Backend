import path from 'path';
import fs from 'fs';

// Obtén la ruta del directorio del módulo actual
const __filename = import.meta.url.substring("file:///".length);
const __dirname = path.dirname(__filename);

const getImageById = (req, res) => {
  const { filename } = req.params;
  console.log(`Intento de acceder a la imagen: ${filename}`);
  const imagePath = path.join(__dirname, '../upload/products', filename);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    console.log(`La imagen no fue encontrada en la ruta: ${imagePath}`);
    res.status(404).json({ error: 'Image not found' });
  }
};


export default getImageById;


