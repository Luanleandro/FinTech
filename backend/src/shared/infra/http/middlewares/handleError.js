export const handleError = (error, req, res, next) => {
  switch (error.name) {
    case 'BusinessError':
      return res.status(error.statusCode).json({ message: error.message });
    case 'InvalidDataError':
      return res.status(error.statusCode).json({ message: error.message });
    case 'NotFoundError':
      return res.status(error.statusCode).json({ message: error.message });
    case 'ForbiddenError':
      return res.status(error.statusCode).json({ message: error.message });
    case 'ValidationError':
      return res.status(400).json({ message: error.message });
    case 'UnauthorizedError':
      return res.status(error.statusCode).json({ message: error.message });
    default:
      return res.status(500).json({ message: error.message });
  }
};
