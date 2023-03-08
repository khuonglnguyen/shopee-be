import { Controller } from "egg";
import asyncBusboy from "async-busboy";

/**
 * @Controller V1/User
 */
export default class BlogController extends Controller {
  /**
   * @router get /api/v1/blog Get List Blog
   * @summary Get List Blog
   * @description Get List Blog
   * @request query integer pageIndex
   * @request query integer pageSize
   * @response 200 indexJsonBody
   */
  public async index() {
    const { ctx } = this;
    const { pageIndex, pageSize } = ctx.request.query;
    let data = await ctx.service.blog.getAll(
      Number(pageIndex ?? 1),
      Number(pageSize ?? 10)
    );
    data = { list: data.rows, total: data.count, pageIndex, pageSize };
    ctx.helper.response.success({ ctx, data });
  }

  /**
   * @router get /api/v1/users/{id} Get By Id
   * @summary Get By Id
   * @description Get By Id
   * @request header string Authorization
   * @request path string id
   * @response 200 indexJsonBody
   */
  public async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    const data = await ctx.service.blog.get(id);
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
    const {
      files,
      fields: { title, content, createdBy },
    } = await asyncBusboy(ctx.req);
    try {
      const result = await ctx.service.blog.add(
        title,
        files[0].filename,
        content,
        createdBy,
        files[0]
      );
      if (result) {
        ctx.helper.response.success({ ctx });
      }else{
        ctx.helper.response.error({ ctx });
      }
    } catch (error) {
      ctx.helper.response.error({ ctx, message: "Error: " + error });
    }
  }

  /**
   * @router patch /api/v1/users/{id} Update
   * @summary Update
   * @description Update
   * @request header string Authorization
   * @request path string id
   * @request body indexCreateUserJsonBody
   * @response 200 indexCreateUserJsonBody
   */
  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const {
      files,
      fields: { title, content },
    } = await asyncBusboy(ctx.req);
    try {
      const result = await ctx.service.blog.update(
        id,
        title,
        files[0]?.filename || undefined,
        content,
        files[0] || undefined
      );
      if (result) {
        ctx.helper.response.success({ ctx });
      }else{
        ctx.helper.response.error({ ctx });
      }
    } catch (error) {
      ctx.helper.response.error({ ctx, message: "Error: " + error });
    }
  }

  /**
   * @router delete /api/v1/users/{id} Delete
   * @summary Delete
   * @description Delete
   * @request header string Authorization
   * @request path string id
   * @response 200 indexJsonBody
   */
  public async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await this.ctx.model.Blog.delete(Number(id));
    ctx.helper.response.success({ ctx, result });
  }
}
