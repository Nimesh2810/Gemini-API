import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

let operation = await ai.models.generateVideos({
  model: "veo-3.0-generate-001",
  prompt: "Cat sitting on keyboard ",
  config: {
    aspectRatio: "9:16",
    negativePrompt: "cartoon, drawing, low quality"
  },
});

while (!operation.done) {
  console.log("Waiting for video generation to complete...")
  await new Promise((resolve) => setTimeout(resolve, 10000));
  operation = await ai.operations.getVideosOperation({
    operation: operation,
  });
}

ai.files.download({
    file: operation.response.generatedVideos[0].video,
    downloadPath: "parameters_example.mp4",
});
console.log(`Generated video saved to parameters_example.mp4`);