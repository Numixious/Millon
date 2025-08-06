
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Scale, Interpretation } from '../types';
import { SCALE_DETAILS } from '../constants/scoring';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

function formatScoresForPrompt(rawScores: Record<Scale, number>, brScores: Record<Scale, number>): string {
  let formatted = '';
  for (const scale in brScores) {
    const scaleKey = scale as Scale;
    const scaleName = SCALE_DETAILS[scaleKey]?.name || scale;
    const brScoreValue = brScores[scaleKey];
    const rawScoreValue = rawScores[scaleKey];
    // Prioritize showing BR score as it's clinically more important
    formatted += `- ${scaleName} (${scaleKey}): BR = ${brScoreValue} (نمره خام = ${rawScoreValue})\n`;
  }
  return formatted;
}

export const generateInterpretation = async (rawScores: Record<Scale, number>, brScores: Record<Scale, number>): Promise<Interpretation> => {
  const scoresText = formatScoresForPrompt(rawScores, brScores);

  const prompt = `
    Based on the following Millon Clinical Multiaxial Inventory (MCMI-III) BR Scores, provide a comprehensive and professional personality analysis in Persian. Populate all fields in the requested JSON format. BR scores above 75 are clinically significant, and scores above 85 indicate a high likelihood of a disorder.
    
    The analysis must be structured, empathetic, and professional. Ensure each section is detailed and directly interprets the provided scores.

    Scores:
    ${scoresText}
    `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      profileSummary: {
        type: Type.STRING,
        description: 'A summary of the individual\'s prominent personality features based on the highest BR scores. (In Persian)'
      },
      validityIndices: {
        type: Type.STRING,
        description: 'A brief analysis of the X, Y, and Z scales to assess test validity. (In Persian)'
      },
      clinicalPatterns: {
        type: Type.STRING,
        description: 'In-depth analysis of personality patterns with high BR scores (especially >75). Mention strengths and potential challenges. (In Persian)'
      },
      severePathology: {
        type: Type.STRING,
        description: 'Detailed analysis if any S, C, P scale scores are high (>75). (In Persian)'
      },
      clinicalSyndromes: {
        type: Type.STRING,
        description: 'Review of clinical syndromes (A-R scales) and severe syndromes (SS, CC, PP) and their potential impact, especially if BR scores are high. (In Persian)'
      },
      diagnosticConsiderations: {
        type: Type.STRING,
        description: 'Cautiously mention potential diagnostic possibilities (per DSM), emphasizing this is not a definitive diagnosis and requires clinical interview. (In Persian)'
      },
      recommendations: {
        type: Type.STRING,
        description: 'Provide suggestions for personal growth, improving relationships, and, if necessary, seeking professional help. (In Persian)'
      }
    },
    required: ['profileSummary', 'validityIndices', 'clinicalPatterns', 'severePathology', 'clinicalSyndromes', 'diagnosticConsiderations', 'recommendations']
  };


  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        },
    });
    
    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("پاسخ خالی از API دریافت شد.");
    }
    
    return JSON.parse(jsonText) as Interpretation;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof SyntaxError) {
      console.error("Failed to parse JSON response from Gemini:", error);
      throw new Error("تحلیل دریافت شده از هوش مصنوعی معتبر نبود.");
    }
    throw new Error("ارتباط با سرویس تحلیل هوش مصنوعی برقرار نشد.");
  }
};
