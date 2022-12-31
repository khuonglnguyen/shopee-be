import { Context } from 'egg';

// =============
// Authentication Module
// =============

export default (): any => {
  return async (ctx: Context, next: () => Promise<any>) => {
    // Determine whether the current user
    console.log(ctx.user);
    if (!ctx.user || !ctx.user.sid || !ctx.user.id) {
      throw {
        status: 401,
        message: 'Login invalid!',
      };
    }
    // Is the user login valid?
    if (!ctx.isAuthenticated()) {
      throw {
        status: 401,
        message: 'Login invalid!',
      };
    }

    await next();
  };
};
