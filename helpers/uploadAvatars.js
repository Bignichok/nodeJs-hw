const path = require("path");
const multer = require("multer");

const { UPLOAD_DIR } = require("../constants");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const fileExtension = path.parse(file.originalname).ext;
        cb(null, Date.now() + fileExtension);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes("image")) {
            cb(null, true);
            return;
        }
        cb(null, false);
    },
});

module.exports = upload;
