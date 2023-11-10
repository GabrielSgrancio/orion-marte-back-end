import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { NodemailerService } from '../library/nodemailerUtils';

export class RecoveryController {
  /**
   * @swagger
   * /v1/recovery:
   *   post:
   *     summary: Request password recovery for a user.
   *     tags: [Recovery]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *     responses:
   *       204:
   *         description: Password recovery request successful
   */
  public static async recovery(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      return res.status(204).end();
    }

    await UserRepository.addPasswordRecoveryToken(user, user.id);

    NodemailerService.sendPasswordRecoveryEmail(user.email);

    return res.status(204).end();
  }
}
