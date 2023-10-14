import { v4 as uuidv4 } from "uuid";
import { config } from "../config/index.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const bucket = config.AWS_BUCKET;
const accessKey = config.AWS_ACCESS_KEY;
const secretKey = config.AWS_SECRET_KEY;
const region = config.AWS_REGION;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  region: region,
});

export async function uploadBotPicToS3(files) {
  try {
    const params = files.map((file) => ({
      Bucket: bucket,
      Key: `uploads/bot-profile-pic/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));

    return await Promise.all(
      params.map((param) => s3.send(new PutObjectCommand(param)))
    );
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function uploadProfilePicToS3(file) {
  const param = {
    Bucket: bucket,
    Key: `uploads/profile/${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return s3.send(new PutObjectCommand(param));
}
