// // Promise Resolved
// const asyncHandler = (requestHandler) => {
//  return (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//   };
// };

// // Async await
const asyncHandler = (fuct) => async (req, res, next) => {
  try {
    return await fuct(req, res, next);
  } catch (error) {
    return res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export { asyncHandler };
