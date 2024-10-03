const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

console.log("Cloud Name:", process.env.CLOUD_NAME);
console.log("API Key:", process.env.CLOUD_API_KEY);
console.log("API Secret:", process.env.CLOUD_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

cloudinary.uploader.upload("./lol.png", function (error, result) {
  if (error) {
    console.error("Cloudinary upload error:", error);
  } else {
    console.log("Cloudinary upload successful:", result);
  }
});
