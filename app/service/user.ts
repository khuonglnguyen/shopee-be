import { Service } from "egg";
import * as bcrypt from "bcryptjs";

/**
 * User Service
 */
export default class User extends Service {
  public async login(email: string, password: string) {
    const user = await this.ctx.model.User.findOne({
      where: { email },
    });
    if (!user) return {};

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { id, email, name } = user;
      // Get jwt configuration
      const {
        jwt: { secret },
      } = this.app.config;
      // Generate token
      const token = this.app.jwt.sign(
        {
          id,
          email,
          name
        },
        secret
      );
      return { email, name, token };
    }
  }
}
