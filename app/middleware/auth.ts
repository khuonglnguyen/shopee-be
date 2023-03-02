import { Context } from "egg";

// =============
// Authentication Module
// =============

export default (): any => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { jwt: { secret } } = ctx.app.config;

    const user = await ctx.service.user.getTokenInfo(
      ctx.app.jwt,
      ctx.headers,
      secret
    );

    if (!user) {
      ctx.helper.response.error({
        ctx,
        code: 401,
        message: "Login invalid!",
      });
    } else {
      await next();
    }
  };
};
