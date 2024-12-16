import multer from "multer"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'/tmp')
    },
    filename: function (req, file, cb) {
        
        cb(null, Date.now()+file.originalname)
    }
})


const upload=multer({storage})

const multerUpload={
    upload
}

export default multerUpload


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(process.cwd(), '/tmp'))
//     },
//     filename: function (req, file, cb) {
        
//         cb(null, Date.now()+file.originalname)
//     }
// })
