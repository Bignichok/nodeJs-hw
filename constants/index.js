const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const IMG_DIR = path.join(process.cwd(), "public", "images");

module.exports = {
    UPLOAD_DIR,
    IMG_DIR,
};
