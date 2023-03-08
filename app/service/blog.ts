import { Service } from "egg";
const util = require("util");
const fs = require("fs");
const stream = require("stream");
const pipeline = util.promisify(stream.pipeline);
const cloudinary = require("cloudinary").v2;

/**
 * User Service
 */
export default class Blog extends Service {
  public async add(
    title: string,
    thumbnail: string,
    content: string,
    createdBy: number,
    file: any
  ) {
    const path = `./images/${thumbnail}`;
    await pipeline(file, fs.createWriteStream(path));

    cloudinary.config(this.config.cloudinary);

    await cloudinary.uploader.upload(path, async (_, result) => {
      if (result) {
        // Remove image local
        await fs.unlinkSync(path);
        await this.ctx.model.Blog.add(title, thumbnail, content, createdBy);
        return true;
      } else {
        return false;
      }
    });
    return true;
  }

  public async update(
    id: number,
    title: string,
    thumbnail: string,
    content: string,
    file: any
  ) {
    if (file) {
      const path = `./images/${thumbnail}`;
      await pipeline(file, fs.createWriteStream(path));

      cloudinary.config(this.config.cloudinary);

      await cloudinary.uploader.upload(path, async (_, result) => {
        if (result) {
          // Remove image local
          await fs.unlinkSync(path);
          const resultUpdate = await this.ctx.model.Blog.edit(
            id,
            title,
            result.url,
            content
          );
          return resultUpdate;
        } else {
          return false;
        }
      });
    } else {
      const result = await this.ctx.model.Blog.edit(id, title, null, content);
      return result;
    }
    return true;
  }

  public async get(id: number) {
    const result = await this.ctx.model.Blog.findById(id);
    return result;
  }

  public async getAll(pageIndex: number, pageSize: number) {
    const result = await this.ctx.model.Blog.getAll(pageIndex, pageSize);
    return result;
  }

  public async delete(id: number) {
    const result = await this.ctx.model.Blog.delete(id);
    return result;
  }
}
