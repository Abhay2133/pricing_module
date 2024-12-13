exports.successResponse = (data) => ({
  success: true,
  data,
});

exports.errorResponse = (error) => ({
  success: false,
  error,
});
