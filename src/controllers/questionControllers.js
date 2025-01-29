import Question from "../models/questionSchema.js";
import User from "../models/user.js";
import { updateEmail } from "../utils/updateEmail.js";

export const addQuestion = async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.userID });

        if (user.role === "user") {
            return res.status(403).json({
                status: "fail",
                message: "You do not have permission to add a new question"
            });
        }

        const question = await Question.create({
            ...req.body,
            createdBy: req.userID
        });

        


        const users = await User.find();

        const bccEmails = users.map(user => user.email);

        await updateEmail(
            bccEmails.join(','),
            question, 
        );

        res.status(200).json({
            status: "success",
            message: "New Question Added",
            data: question
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: `Server Error: ${error.message}`
        });
    }
};

export const getAllQuestions = async (req, res) => {
    try {
        // Fetch all questions
        const questions = await Question.find();

        const questionWithUsers = await Promise.all(questions.map(async (question) => {
            const user = await User.findOne({ _id: question.createdBy });
            return {
                ...question._doc, 
                createdByUser: user?.fullName 
            };
        }));

        res.status(200).json({
            status: "success",
            data: questionWithUsers,
            message: "Successfully retrieved all questions"
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: `Server Error: ${error.message}`
        });
    }
};

export const getSingleQuestion = async (req, res) => {
    try {
        const { id } = req.params; 
        console.log("🚀 ~ getSingleQuestion ~ id:", id);

        // Fetch the question by its ID
        const question = await Question.findOne({ _id: id });

        if (!question) {
            return res.status(404).json({
                status: "fail",
                message: "Question not found"
            });
        }

        // Fetch the user who created the question
        const userID = question.createdBy;
        console.log("🚀 ~ getSingleQuestion ~ userID:", userID);

        const user = await User.findOne({ _id: userID });
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }

        // Respond with question and user details
        res.status(200).json({
            status: "success",
            data: { ...question._doc, createdByUser: user?.fullName },
            message: "Successfully retrieved question"
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: `Server Error: ${error.message}`
        });
    }
};
;

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;  // Get the question ID from request parameters
  console.log("🚀 ~ deleteQuestion ~ id:", id)
  const username = req.body.userData.username

  try {

    const questions = Question.findOne(id);

    if(questions.createdby == username || username ==  "sabatalimalik"){
        const questiondel = await Question.findByIdAndDelete(id);
        
    if (!questiondel) {
        return res.status(404).json({ message: 'Question not found' });
      }  // Find and delete the question by ID

      return res.status(200).json({ message: 'Question deleted successfully' });

    }else{
        return res.status(404).json({ message: 'Sorry Your not have permision to delete this' });
    }



  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};


