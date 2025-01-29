import { unlink } from "fs/promises"; // Ensure promises-based unlink
import { UpdatePdf } from "../Utils/UpdatePdf.js";
import { createPdf } from "../Utils/createPdf.js";
import { downloadFile } from "../Utils/downloadPDF.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../Utils/uploadToCloudinary.js";
import Notes from "../models/NotesSchema.js";
import User from "../models/user.js";

export const CreateNewNotes = async (req, res) => {
    // Ensure the body contains the required fields
    const { course, topic, title, userID } = req.body;
    console.log("🚀 ~ CreateNewNotes ~ eq.body:", req.body)
    console.log("🚀 ~ CreateNewNotes ~ userID:", userID)


    const user = await User.findOne({ _id: userID });

    if (user.role === "user") {
        return res.status(403).json({
            status: "fail",
            message: "You do not have permission to add a new question"
        });
    }
    console.log("🚀 ~ CreateNewNotes ~  user.fullName:",  user.fullName)
  
    // Debugging logs
    console.log("🚀 ~ CreateNewNotes ~ Request Body:", req.body);
  
    if (!userID || !course || !topic || !title) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields: created_by, course, topic, or title.",
      });
    }
  
    try {
      // Call the PDF creation function
      const pdfFilePath = await createPdf({
        created_by : user.fullName,
        course,
        topic,
        title,
      });

      const uploadResult = await uploadToCloudinary(pdfFilePath, "notes");
      console.log("🚀 ~ UpdateNotes ~ uploadResult:", uploadResult)

      const notesRes = await Notes.create({
        title: title,
        file_path: uploadResult.secure_url,
        course:course,
        topic: topic,
        asset_id:uploadResult.asset_id,
        createdBy: userID
    });
      console.log("🚀 ~ CreateNewNotes ~ notesRes:", notesRes)

      await unlink(pdfFilePath)

  
      res.status(201).json({
        status: "success",
        message: "Successfully created new PDF",
      });
    } catch (error) {
      console.error("🚀 ~ CreateNewNotes ~ Error:", error);
      res.status(500).json({
        status: "failed",
        message: "Failed to create new PDF",
        error: error.message,
      });
    }
  };



  export const getAllNotes = async (req, res) => {
    try {
        // Fetch all questions
        const notes = await Notes.find();

        // const questionWithUsers = await Promise.all(questions.map(async (question) => {
        //     const user = await User.findOne({ _id: question.createdBy });
        //     return {
        //         ...question._doc, 
        //         createdByUser: user?.fullName 
        //     };
        // }));

        res.status(200).json({
            status: "success",
            data: notes,
            message: "Successfully retrieved all notes"
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: `Server Error: ${error.message}`
        });
    }
};
  


  export const UpdateNotes = async (req, res) => {
    console.log("🚀 ~ UpdateNotes ~ req.body:");
  
    // Mocking request body for demonstration
    const existingPdfPath = "https://res.cloudinary.com/drnmzsmjf/raw/upload/v1738141902/olhhddydxlfz2ngicyuh.pdf";
    const imagePath = "/Users/devpumas/Desktop/Project/assest/image.png";
    const topic = "New Updates";
    const note = "Important details";
    const addedBy = "Sabat Ali";
    const outputPdfPath = "./updated.pdf";
    const public_id = "notes/olhhddydxlfz2ngicyuh"; // Public ID of the existing file in Cloudinary
  
    try {
      // Step 1: Download the existing PDF from Cloudinary
      const downloadedFilePath = await downloadFile(existingPdfPath)
      // Step 2: Update the PDF
      const updatedPdfPath = await UpdatePdf({
        existingPdfPath: "downloaded_file.pdf",
        imagePath,
        topic,
        note,
        addedBy,
        outputPdfPath,
      });
      console.log("🚀 ~ UpdateNotes ~ Updated PDF created at:", updatedPdfPath);
  
      // Step 3: Upload the updated PDF to Cloudinary
      const uploadResult = await uploadToCloudinary(updatedPdfPath, "notes");
      console.log("🚀 ~ UpdateNotes ~ New PDF uploaded to Cloudinary:", uploadResult);
  
      // Step 4: Delete the old file from Cloudinary
      const deleteResult = await deleteFromCloudinary(public_id);
      console.log("🚀 ~ UpdateNotes ~ Old file deleted from Cloudinary:", deleteResult);
  
      // Step 5: Clean up local files
      unlink("downloaded_file.pdf"); // Delete the downloaded file
      unlink(updatedPdfPath);    // Delete the updated file
      console.log("🚀 ~ UpdateNotes ~ Local files deleted");
  
      res.status(201).json({
        status: "success",
        message: "Successfully updated the PDF",
        data: uploadResult,
      });
    } catch (error) {
      console.error("🚀 ~ UpdateNotes ~ Error:", error);
      res.status(400).json({
        status: "failed",
        message: "Failed to update the PDF",
      });
    }
  };