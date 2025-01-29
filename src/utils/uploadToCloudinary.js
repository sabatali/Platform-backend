import cloudinary from "../config/cloudinary.js";

/**
 * Uploads a file to Cloudinary.
 * @param {string} filePath - Path to the file to upload.
 * @param {string} folder - Folder in Cloudinary to upload the file.
 * @returns {Promise<object>} - The result of the upload operation.
 */
export const uploadToCloudinary = async (filePath, folder) => {
    try {
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        resource_type: "raw",
        access_control: [
          {
            access_type: 'anonymous'  // Corrected to 'anonymous'
          }
        ]
      });
      return uploadResult;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new Error("Failed to upload to Cloudinary");
    }
  };
/**
 * Deletes a file from Cloudinary.
 * @param {string} publicId - Public ID of the file to delete.
 * @returns {Promise<object>} - The result of the delete operation.
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    const deleteResult = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });
    return deleteResult;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw new Error("Failed to delete from Cloudinary");
  }
};

