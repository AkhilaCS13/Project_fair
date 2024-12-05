const multer = require('multer')

//The disk storage engine gives you full control on storing files to disk.

const storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null , './uploads')
    },
    filename:(req,file,callback)=>{
        //Returns the number of milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time (UTC).
        //original name - predefined gives the name of the image
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null , filename)
    }
})

//filefilter 1)function 2)condition 3) new error 

const fileFilter = (req, file, callback)=>{
    //true condition
    if(file.mimetype=='image/png' || file.mimetype=='image/jpg' || file.mimetype=='image/jpeg' ){
        callback(null, true)
    }
    else{
        callback(null, false)
        return callback(new Error('Only png , jpg , jpeg files are allowed'))
    }
}

//multer configuration

const multerconfig = multer({
    // storage:storage,
    storage,
    fileFilter
})

//export

module.exports = multerconfig