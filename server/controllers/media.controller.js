import * as awsService from "../services/s3.service.js";
import * as responseHelper from "../utils/responseHelper.js";

export async function uploadMultipleFilesToAWS_S3(req, res) {
  try {
    const files = req.files;

    const results = await awsService.uploadBotPicToS3(files);
    if (results) return res.status(200).json({ success: "true", results });
    return res.status(400).send("it did not work :(");
  } catch (e) {
    res.status(400).send("Internal error");
  }
}

export async function uploadProfilePic(req, res) {
  try {
    const file = req.file;
    const result = await awsService.uploadProfilePicToS3(file);
    if (result) return res.status(201).json(responseHelper.success(result));
    return res.status(400).json(responseHelper.discontent("operation failed"));
  } catch (err) {
    res.status(500).json(responseHelper.error(err));
  }
}
