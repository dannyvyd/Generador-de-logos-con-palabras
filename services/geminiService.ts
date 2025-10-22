
import { GoogleGenAI } from "@google/genai";

export const generateLogoImage = async (brandName: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `Create a sophisticated and minimalist logo for a luxury fashion brand named '${brandName}'. 
  The design should be purely typographic, exuding a sense of high status and modern elegance. 
  Use a clean, sans-serif or a subtle serif font. 
  The color palette must be monochrome (black text on a white or light gray background, or white text on a black or dark charcoal background). 
  The final image should be a high-resolution, centered composition, suitable for a premium clothing label. 
  Emulate the style of top-tier fashion houses like Saint Laurent, Celine, or Tom Ford.`;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("Image generation failed, no images returned.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate image. Please check the console for more details.");
  }
};
