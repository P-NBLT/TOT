import multer from "multer";

const storage = multer.memoryStorage();

//***************************************//
//                                       //
//            Error Middleware           //
//                                       //
//***************************************//

export function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (typeof err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ ...err.field });
    } else if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "Max file size exceeded. Max allowed 70KB/file" });
    }
  }
  next();
}

//***************************************//
//                                       //
//            File(s) Middleware         //
//                                       //
//***************************************//

// only use for development and seeding;
const uploadsMultipleBotsPicsConfig = multer({
  storage,
  limits: { fileSize: 50000 },
  fileFilter,
});

// development and production purpose.
export const uploadsMultipleBotsPics =
  uploadsMultipleBotsPicsConfig.array("files");

const uploadsProfilePicConfig = multer({
  storage,
  limits: { fileSize: 50000, files: 1 },
  fileFilter,
});

export const uploadsProfilePic = uploadsProfilePicConfig.single("profile");

//***************************************//
//                                       //
//           Functions Helper            //
//                                       //
//***************************************//

function fileFilter(req, file, cb) {
  const { mimetype, originalname } = file;
  const regex = /image\/(jpeg)|(png)|(webp)/;

  if (regex.test(mimetype)) {
    cb(null, true);
  } else {
    cb(
      new multer.MulterError("LIMIT_UNEXPECTED_FILE", {
        message: `Incorrect file format for: << ${originalname} >>. Format accepeted are: jpeg, png and webp`,
        status: 400,
        code: "LIMIT_UNEXPECTED_FILE",
      }),
      false
    );
  }
}
