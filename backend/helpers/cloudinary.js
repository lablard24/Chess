const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Check if env variables are loading
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "Loaded ✅" : "Missing ❌",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "Loaded ✅" : "Missing ❌"
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
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