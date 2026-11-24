import OpenAI from "openai";

export const client = new OpenAI({
  baseURL: "https://api.numes.ai/api/v1",
  apiKey: process.env.NUMES_API_KEY,
});

const response = await client.chat.completions.create({
  model: "deepseek-v4.1-flash-uncensored-fp8",
  messages: [
    {
      role: "user",
      content: "What is the meaning of life?",
    },
  ],
});

console.log(response.choices[0]?.message.content);