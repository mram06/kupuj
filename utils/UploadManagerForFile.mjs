import multer from "multer";
import path from "path";
import { uid } from "uid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, uid() + ext);
  },
});

const upload = multer({ storage });

export default upload;
