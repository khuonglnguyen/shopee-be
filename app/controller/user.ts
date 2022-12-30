import { Controller } from "egg";

export default class UserController extends Controller {
  public async index() {
    const { ctx } = this;
    const { pageIndex, pageSize } = ctx.request.query;
    const users = await this.ctx.model.User.getAll(Number(pageIndex ?? 1), Number(pageSize ?? 10));
    ctx.body = {
      errorCode: users ? 0 : 1,
      Message: users ? "Success" : "Fail",
      data: users
    };
    ctx.status = users ? 200 : 400;
  }

  public async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    const user = await this.ctx.model.User.findById(id);
    ctx.body = user;
    ctx.status = 200;
  }

  public async create() {
    const { ctx } = this;
    const { name, age } = ctx.request.body;
    const result = await this.ctx.model.User.add(name, age);
    ctx.status = result ? 201 : 400;
  }

  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { name, age } = ctx.request.body;
    const user = await this.ctx.model.User.edit(id, name, age);
    ctx.status = user ? 200 : 400;
  }

  public async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await this.ctx.model.User.delete(id);
    ctx.status = result ? 200 : 400;
  }
}
