import path from 'path';
import fs from 'fs';

// Obtén la ruta del directorio del módulo actual
const __filename = import.meta.url.substring("file:///".length);
const __dirname = path.dirname(__filename);

const getImageById = (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../../upload/products', filename);

  // Verifica si la imagen existe
  if (fs.existsSync(imagePath)) {
    // Envía la imagen como respuesta
    res.sendFile(imagePath);
  } else {
    // Si la imagen no existe, responde con un error 404
    res.status(404).json({ error: 'Image not found' });
  }
};

export default getImageById;


