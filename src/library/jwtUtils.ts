import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
const verifyAsync = promisify(jwt.verify);

const secretKey = process.env.JWT_SECRET;

/**
 * Generates and verifies token for a given user
 */
export class JwtUtils {
  /**
   * generateJWTToken
   *
   * Generates jwt token, using 'jwt.sign' function. Static to allow to be called inside class itself.
   *
   * @param data instance of user to which the token will be assigned.
   * @param expiresIn Time taken until token expires.
   * @returns {Promise<string>} JWT token (string), returned from asynchronously from jwt api.
   */
  public static generateJWTToken(data: object, expiresIn: string): Promise<string> {
    return jwt.sign(data, secretKey, { expiresIn });
  }

  /**
   * verifyJWTToken
   *
   * Verifies a JWT token for authentication.
   *
   * @param token - The JWT token to be verified.
   * @returns An object representing the verified data or a JWT verification error.
   */
  public static verifyJWTToken(bearerToken: string): object | jwt.VerifyErrors {
    try {
      const token = bearerToken.split(' ')[1];
      return jwt.verify(token, secretKey);
    } catch (error) {
      return { error };
    }
  }

  /**
   * getUserIdFromToken
   *
   * Gets the user id from the JWT token
   *
   * @param token - The JWT token from which the id will be retrieved.
   * @returns Promise<number> - AThe id of the user.
   */
  public static async getUserIdFromToken(token: string): Promise<number | Error> {
    try {
      const decodedToken = await verifyAsync(token, secretKey);
      const userId = decodedToken.id;
      return userId;
    } catch (error) {
      return new Error('Erro decodificando o token');
    }
  }
}
