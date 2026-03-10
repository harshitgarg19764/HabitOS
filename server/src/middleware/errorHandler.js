import { logger } from '#utils/logger.js';
import { ApiError } from '#utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
  req.errorId = req.id;
  
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    
    error = new ApiError({
      statusCode,
      message,
      isOperational: error.isOperational || false,
      stack: error.stack,
    });
  }

  const response = {
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  if (error.errors) {
    response.errors = error.errors;
  }

  logger.error(`ErrorId: ${req.id} | Status: ${error.statusCode} | Message: ${error.message}`);

  res.status(error.statusCode).json(response);
};

export const notFound = (req, res, next) => {
  const error = new ApiError({
    statusCode: 404,
    message: `Route ${req.originalUrl} not found`,
  });
  next(error);
};
