import { Service } from "egg";

/**
 * User Service
 */
export default class Blog extends Service {
  public async add(
    title: string,
    thumbnail: string,
    content: string,
    createdBy: number
  ) {
    const result = await this.ctx.model.Blog.add(
      title,
      thumbnail,
      content,
      createdBy
    );
    return result;
  }

  public async get(id: number) {
    const result = await this.ctx.model.Blog.findById(id);
    return result;
  }

  public async getAll(pageIndex: number, pageSize: number) {
    const result = await this.ctx.model.Blog.getAll(pageIndex, pageSize);
    return result;
  }
}
