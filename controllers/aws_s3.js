const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { MAX_FILE_SIZE } = require("../constants");

// S3 BUCKET SETUP
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  region: process.env.AWS_REGION,
});

// MULTER MIDDLEWARE CONFIGURATION
const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname,
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
      });
    },
    key: function (req, file, cb) {
      try {
        const userId = req.userId;
        const nameParts = file.originalname.split(".");
        const fileExtension = nameParts[nameParts.length - 1];
        const mainFile = nameParts[0];
        req.file_name = mainFile;
        req.type = fileExtension;
        // console.log(userId, nameParts, fileExtension);
        cb(null, userId + "_" + mainFile + "." + fileExtension);
      } catch (error) {
        const err_msg = "S3 UPLOAD FILE RENAMING ERROR";
        console.log(err_msg);
        throw err_msg;
      }
    },
  }),
  limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = {
  s3,
  uploadS3,
};
