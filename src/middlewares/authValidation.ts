import { NextFunction, Request, Response } from 'express';
import { JwtUtils } from '../library/jwtUtils';
import { UserRepository } from '../repositories/userRepository';

export class AuthMiddleware {
  /**
   * Middleware for authentication and authorization.
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The next middleware function.
   */
  public static async authValidation(req: Request, res: Response, next: NextFunction): Promise<void> {
    const accessToken = req.headers.authorization;
    const verifiedToken = await JwtUtils.verifyJWTToken(accessToken);

    if (verifiedToken.error) {
      const errorMessage =
        {
          'jwt must be provided': 'Access token deve ser fornecido',
          'invalid signature': 'Access token inválido',
          'jwt expired': 'Access token expirado'
        }[verifiedToken.error.message] || 'Não autorizado';

      res.status(401).json({ message: errorMessage });
      return;
    }

    const userId = verifiedToken.id;

    try {
      const user = await UserRepository.findUserById(userId);

      if (user.accessToken !== accessToken.split(' ')[1]) {
        res.status(401).json({ message: 'Access token inválido' });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}
