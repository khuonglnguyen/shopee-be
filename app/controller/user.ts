import { Controller } from "egg";

export default class UserController extends Controller {
  public async index() {
    const { ctx } = this;
    const { pageIndex, pageSize } = ctx.request.query;
    let data = await this.ctx.model.User.getAll(Number(pageIndex ?? 1), Number(pageSize ?? 10));
    data = { list: data.rows, total: data.count, pageIndex, pageSize }
    ctx.helper.response.success({ ctx, data });
  }

  public async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    const data = await this.ctx.model.User.findById(id);
    ctx.helper.response.success({ ctx, data });
  }

  public async create() {
    const { ctx } = this;
    const { name, age } = ctx.request.body;
    const data = await this.ctx.model.User.add(name, age);
    ctx.helper.response.success({ ctx, data });
  }

  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { name, age } = ctx.request.body;
    const data = await this.ctx.model.User.edit(id, name, age);
    ctx.helper.response.success({ ctx, data });
  }

  public async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await this.ctx.model.User.delete(id);
    ctx.helper.response.success({ ctx, result });
  }
}
