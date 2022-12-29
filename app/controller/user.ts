import { Controller } from "egg";

export default class UserController extends Controller {
  public async getById() {
    const { ctx } = this;
    const { id } = ctx.params;
    const user = await this.ctx.model.User.findById(id);
    ctx.body = user;
    ctx.status = 200;
  }

  public async list() {
    const { ctx } = this;
    const users = await this.ctx.model.User.getAll();
    ctx.body = users;
    ctx.status = 200;
  }

  public async create() {
    const { ctx } = this;
    const { name, age } = ctx.request.body;
    const result = await this.ctx.model.User.add(name, age);
    ctx.status = result ? 200 : 400;
  }

  public async edit() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { name, age } = ctx.request.body;
    const result = await this.ctx.model.User.edit(id, name, age);
    ctx.status = result ? 200 : 400;
  }

  public async delete() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await this.ctx.model.User.delete(id);
    ctx.status = result ? 200 : 400;
  }
}
