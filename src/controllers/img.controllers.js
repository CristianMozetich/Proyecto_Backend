import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getImageById = (req, res) => {
  const { filename } = req.params;
  console.log(`Intento de acceder a la imagen: ${filename}`);

  // Ajusta la ruta para ir fuera de la carpeta src
  const imagePath = join(__dirname, '/upload/products', filename);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    console.log(`La imagen no fue encontrada en la ruta: ${imagePath}`);
    res.status(404).json({ error: 'Image not found' });
  }
};

export default getImageById;



