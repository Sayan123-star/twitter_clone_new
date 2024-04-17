// Importing multer for image upload
const multer = require('multer');
// geting multer disk storage for storing  images in a directory with their field name and extension
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now()+'-'+Math.random(Math.random()*1e9);
        const fileExtension= file.originalname;
        cb(null,file.fieldname+'-'+uniqueSuffix+'.'+fileExtension)
    }
})
// uploading images thorugh multer with limits of 10MB
const upload = multer({
    storage:storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB in bytes
    },
  });

module.exports=upload