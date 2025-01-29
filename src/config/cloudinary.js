import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

console.log("🚀 ~ process.env.CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME)

// PORT=3000
// CLOUDINARY_CLOUD_NAME=drnmzsmjf
// CLOUDINARY_API_KEY=343354869665914
// CLOUDINARY_API_SECRET=D9koXJhNqTV4bQq71SnU4TYzliY


// Configure Cloudinary
cloudinary.config({
  cloud_name: "drnmzsmjf", // Your Cloudinary cloud name
  api_key: "343354869665914",      // Your Cloudinary API key
  api_secret: "D9koXJhNqTV4bQq71SnU4TYzliY", // Your Cloudinary API secret
});

export default cloudinary;
