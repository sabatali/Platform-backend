import getGeminiResponse from "../utils/geminiApi.js";


export const assingmentPrompt = async (req, res) => {

    try {

        const {
            subjectName,
            topic,
            topic_details, // Changed field to camelCase
            length,
            languageStyle, // Changed field to camelCase
            academicLevel, // Changed field to camelCase
            focusArea, // Changed field to camelCase
            structure,
            researchDepth, // Changed field to camelCase
            useOfReferences, // Changed field to camelCase
            citationStyle, // Changed field to camelCase
            tone, // Changed field to camelCase
            visualElements, // Changed field to camelCase
            pointOfView, // Changed field to camelCase
            plagiarismSensitivity, // Changed field to camelCase
            criticalThinking, // Changed field to camelCase
            typeOfSources, // Changed field to camelCase
            assignmentType, // Changed field to camelCase
            regionalFocus // Changed field to camelCase
        } = req.body;
        
        const prompt = `Create an assignment for the subject ${subjectName} focused on the topic ${topic}. 
        The assignment should include detailed exploration of ${topic_details}. The length should be ${length}, 
        written in ${languageStyle} appropriate for a ${academicLevel} audience. 
        The assignment should primarily focus on ${focusArea}, with a structure consisting of ${structure}. 
        Provide ${researchDepth} research, incorporating ${useOfReferences} references formatted in ${citationStyle} style. 
        The tone of the assignment should be ${tone}, and include ${visualElements}. It should be written from a ${pointOfView} perspective, 
        with ${plagiarismSensitivity} attention to originality. The level of critical thinking required should be ${criticalThinking},
        and sources should be ${typeOfSources}. The assignment type is ${assignmentType}, with a regional focus on ${regionalFocus}.`;
        
        const assingmentAI = await getGeminiResponse(prompt);

        res.status(200).json({
            status: "success",
            message: "New Assingment Prompt Generated",
            data: assingmentAI,
            prompt: prompt
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: `Server Error: ${error.message}`
        });
    }

}


export const assingment = async (req, res) => {

    try {
        const {prompt} = req.body
        const assingmentAI = await getGeminiResponse(prompt);


        res.status(200).json({
            status: "success",
            message: "New Assingment Generated",
            prompt : prompt,
            data: assingmentAI
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: `Server Error: ${error.message}`
        });
    }

}