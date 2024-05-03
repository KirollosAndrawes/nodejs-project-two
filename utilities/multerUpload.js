const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: function(request, file, cb) {
        console.log(file)
        cb(null, 'uploads');
    },
    filename: function(request, file, cb) {
        const fileName = `user-${Date.now()}.${file.mimetype.split('/')[1]}`;
        cb(null, fileName);
    }
})

const fileFilter = function(request, file, cb) {
    if(file.mimetype.split('/')[0] === "image") {
        return cb(null, true)
    } else {
        return cb( new Error("file must be an image"), false)
    }
}

const upload = multer({ storage: diskStorage, fileFilter})


module.exports = upload;