import multer from "multer"

//CONFIGURACIÓN DE MULTER PARA EL ALMACENAMIENTO DE ARCHIVOS E IMAGENES
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let uploadPath = ''

        if(file.fieldname === 'profileImage'){
            uploadPath = 'upload/profile'
        } else if (file.fieldname === 'productImage'){
            uploadPath = 'upload/products'
        } else {
            uploadPath = 'upload/documents'
        }

        cb(null, uploadPath)
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
})

export const upload = multer({ storage: storage });