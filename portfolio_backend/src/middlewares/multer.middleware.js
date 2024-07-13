import multer from "multer";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';

// Convert the URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempDir = path.join(__dirname, '../../public/temp')

const ensureDirectoryExistance = (dir) => {
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive:true});
    }
};

ensureDirectoryExistance(tempDir)

const storage = multer.diskStorage({
    destination: function (req,file, cb){
        cb(null, tempDir)
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage,
})