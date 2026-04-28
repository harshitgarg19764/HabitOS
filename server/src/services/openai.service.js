import OpenAI from 'openai';
import { ApiError } from '#utils/ApiError.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
});

export const getQuote = async (moodScore) => {
  if (process.env.AI_ENABLED === 'false' || !process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy-key') {
    return {
      quote: "Success is the sum of small efforts, repeated day in and day out.",
      author: "Robert Collier",
      theme: "baseline"
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a motivational quote generator. Return JSON in the format { quote, author, theme }.' },
        { role: 'user', content: `Generate a short quote for someone with a mood score of ${moodScore}/10.` }
      ],
      response_format: { type: 'json_object' }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    throw new ApiError({ statusCode: 500, message: 'AI generation failed' });
  }
};

export const getInsights = async (habitData) => {
  if (process.env.AI_ENABLED === 'false' || process.env.OPENAI_API_KEY === 'dummy-key') {
    return [{ title: "Consistency is Key", description: "You are doing great!", type: "positive", confidence: 0.9 }];
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a habit coach. Analyze the user\'s data and provide insights. Return JSON format: [{ title, description, type, confidence }].' },
        { role: 'user', content: JSON.stringify(habitData) }
      ],
      response_format: { type: 'json_object' }
    });
    
    const parsed = JSON.parse(response.choices[0].message.content);
    return Array.isArray(parsed) ? parsed : parsed.insights || [];
  } catch (error) {
    throw new ApiError({ statusCode: 500, message: 'AI generation failed' });
  }
};
