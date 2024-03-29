import { Controller } from "egg";
/**
 * @Controller V1/User
 */
export default class UserController extends Controller {
   /**
   * @router get /api/v1/users Get List User
   * @summary Get List User
   * @description Get List User
   * @request query integer pageIndex
   * @request query integer pageSize
   * @response 200 indexJsonBody
   */
  public async index() {
    const { ctx } = this;
    const { pageIndex, pageSize } = ctx.request.query;
    let data = await this.ctx.model.User.getAll(Number(pageIndex ?? 1), Number(pageSize ?? 10));
    data = { list: data.rows, total: data.count, pageIndex, pageSize }
    ctx.helper.response.success({ ctx, data });
  }

  /**
   * @router get /api/v1/users/{id} Get By Id
   * @summary Get By Id
   * @description Get By Id
   * @request path string id
   * @response 200 indexJsonBody
   */
  public async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    const data = await this.ctx.model.User.findById(Number(id));
    ctx.helper.response.success({ ctx, data });
  }

  /**
   * @router post /api/v1/users/ Create
   * @summary Create
   * @description Create
   * @request body indexCreateUserJsonBody
   * @response 200 indexCreateUserJsonBody
   */
  public async create() {
    const { ctx } = this;
    const { name, age } = ctx.request.body;
    const data = await this.ctx.model.User.add(name, age);
    ctx.helper.response.success({ ctx, data });
  }

  /**
   * @router patch /api/v1/users/{id} Update
   * @summary Update
   * @description Update
   * @request path string id
   * @request body indexCreateUserJsonBody
   * @response 200 indexCreateUserJsonBody
   */
  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { name, age } = ctx.request.body;
    const data = await this.ctx.model.User.edit(Number(id), name, age);
    ctx.helper.response.success({ ctx, data });
  }

  /**
   * @router delete /api/v1/users/{id} Delete
   * @summary Delete
   * @description Delete
   * @request path string id
   * @response 200 indexJsonBody
   */
  public async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await this.ctx.model.User.delete(Number(id));
    ctx.helper.response.success({ ctx, result });
  }
}
