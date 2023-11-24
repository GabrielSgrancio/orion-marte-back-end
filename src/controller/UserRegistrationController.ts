import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { User } from '../entity/Users';
import { DeepPartial } from 'typeorm';

/**
 * Controller for allowing new users to be saved to the database.
 */
export class UserRegistrationController {
  /**
   * @swagger
   * /v1/user-registration:
   *   post:
   *     summary: Allows for the creation of a new User
   *     tags: [Users]
   *     description: User email and password
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: algumemail@servidor.com
   *               password:
   *                 type: string
   *                 example: senha#67@Maluca!
   *     responses:
   *       201:
   *         description: JSON with user data creates new user successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 User:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: number
   *                     email:
   *                       type: string
   *                     password:
   *                       type: string
   *       500:
   *         description: Error when trying to post a new User
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  public static async userRegistration(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const newUser: DeepPartial<User> = {
        email,
        password
      };

      const createdUser: User = await UserRepository.createUser(newUser);

      res.status(201).json(createdUser.email);
    } catch {
      res.status(500).json({ error: 'Não foi possível salvar o usuário' });
    }
  }
}