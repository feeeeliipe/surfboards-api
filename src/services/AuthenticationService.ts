import jwt from "jsonwebtoken";
import UserModel from "../domain/models/UserModel";
import bcrypt from "bcrypt";

export class AuthenticationValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default class AuthenticationService {
  constructor() {}

  async authenticate(userData: { username: string; password: string }) {
    const { username, password } = userData;
    const user: any = await UserModel.findOne({ username });
    if (!user) {
      throw new AuthenticationValidationError("Usuário não existe!");
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    if (!isCorrectPassword) {
      throw new AuthenticationValidationError("A senha do usuário é inválida");
    }

    const token = jwt.sign(
      { id: { email: user.username, id: user._id } },
      process.env.JWT_SECRET || "",
      {
        expiresIn: 1400,
      }
    );

    return token;
  }

  async isValidJwtToken(token: string): Promise<boolean> {
    try {
      const secret = `${process.env.JWT_SECRET}`;
      const result = await jwt.verify(token, secret);
      return true;
    } catch (error) {
      throw new AuthenticationValidationError(
        `Not a valid JWT Token. Details: ${error.message}`
      );
    }
  }
}
