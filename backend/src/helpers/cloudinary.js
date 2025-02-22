const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage(); // Store file in memory

async function imageUploadUtil(fileBuffer, mimeType) {
  try {
    if (!fileBuffer || !mimeType) {
      throw new Error("Invalid file data");
    }

    // Convert Buffer to Base64
    const base64String = `data:${mimeType};base64,${fileBuffer.toString("base64")}`;

    console.log("Uploading Image to Cloudinary...");

    const result = await cloudinary.uploader.upload(base64String, {
      resource_type: "auto",
    });

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
