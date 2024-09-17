import getGeminiResponse from "../utils/geminiApi.js";


export const gemini = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    try {
        const aiResponse = await getGeminiResponse(prompt);
        return res.status(200).json({ response: aiResponse });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get AI response.' });
    }
};
