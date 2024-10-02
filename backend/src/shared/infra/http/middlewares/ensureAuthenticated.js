import { UnauthorizedError } from '@shared/errors/UnauthorizedError';
import jwt from 'jsonwebtoken';

export async function ensureAuthenticated(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('Token JWT Inválido!!');
    }

    const [, token] = authHeader.split(' ');
    jwt.verify(token, process.env.SECRET_PASSWORD, (error, decoded) => {
      if (error) {
        throw new UnauthorizedError('Token JWT inválido!!');
      }

      req.userId = decoded.userId;
      req.roleId = decoded.roleId;
      return next();
    });
  } catch (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }
}
