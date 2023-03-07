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
    if (!user) return false;

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

  public async rigist(name: string, email: string,  age: number, password: string) {
    const hash = bcrypt.hashSync(password, this.config.bcrypt.saltRounds);
    const user = await this.ctx.model.User.add(name, email, age, hash);
    return user;
  }
  
  public async getTokenInfo(jwt, auth, secret) {
    // 判断请求头是否包含token
    if (
      auth.authorization &&
      auth.authorization.split(' ')[0] === 'Bearer'
    ) {
      const token = auth.authorization.split(' ')[1];
      let decode = '';
      if (token) {
        decode = jwt.verify(token, secret);
      }
      return decode;
    }
    return;
  }
}
