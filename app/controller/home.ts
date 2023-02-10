import { Controller } from 'egg';
/**
 * @Controller Home
 */
export default class HomeController extends Controller {
 /**
   * @router get / Home info
   * @summary Home info
   * @description Home info
   * @response 200 indexJsonBody
   */
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}
