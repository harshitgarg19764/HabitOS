import { asyncHandler } from '#utils/asyncHandler.js';
import { ApiResponse } from '#utils/ApiResponse.js';
import * as openaiService from '#services/openai.service.js';

export const getInsights = asyncHandler(async (req, res) => {
  const insights = await openaiService.getInsights({ userActivityLevel: 'High' });
  res.json(ApiResponse.success(insights, 'Insights retrieved successfully'));
});

export const getQuote = asyncHandler(async (req, res) => {
  const { moodScore = 5 } = req.body;
  const quote = await openaiService.getQuote(moodScore);
  res.json(ApiResponse.success(quote, 'Quote retrieved successfully'));
});

export const getSuggestions = asyncHandler(async (req, res) => {
  const suggestions = [
    'Try meditation before breakfast to improve focus.',
    'Drink 500ml of water right after waking up.',
    'Read for 15 minutes before bed to wind down.',
    'Add a 5-minute stretching routine after your gym session.'
  ];
  res.json(ApiResponse.success(suggestions, 'Suggestions retrieved'));
});

export const getSummary = asyncHandler(async (req, res) => {
  const summary = "You've been incredibly consistent this week! Your morning routine is particularly strong, with a 90% completion rate for meditation and reading. Keep it up!";
  res.json(ApiResponse.success({ summary }, 'Summary retrieved'));
});

export const getPredictions = asyncHandler(async (req, res) => {
  const predictions = [
    { habitId: 'h1', name: 'Meditation', prediction: 0.95 },
    { habitId: 'h2', name: 'Water', prediction: 0.88 }
  ];
  res.json(ApiResponse.success(predictions, 'Predictions retrieved'));
});
