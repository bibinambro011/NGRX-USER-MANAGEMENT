const multer = require("multer");
const fs = require("fs");

// Define the allowed MIME types for image files

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  
    cb(null, "image/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

module.exports = upload
