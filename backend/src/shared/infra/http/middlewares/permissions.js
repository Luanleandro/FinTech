import { ForbiddenError } from '@shared/errors/ForbiddenError';

export function permissions(permissionRoutes) {
  return async (req, res, next) => {
    try {
      const roleId = req.roleId;
      const permission = permissionRoutes.includes(roleId);

      if (!permission) {
        throw new ForbiddenError(
          'Você não tem permissão para realizar esse acesso',
        );
      }
      return next();
    } catch (error) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  };
}
