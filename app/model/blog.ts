module.exports = (app) => {
  const { STRING, INTEGER, DATE, Op } = app.Sequelize;

  const Blog = app.model.define("blog", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(255),
    thumbnail: STRING(255),
    content: STRING(),
    deletedAt: DATE,
    createdBy: { type: INTEGER, references: "users", referencesKey: "id" },
  });

  Blog.add = async function (
    title: string,
    thumbnail: string,
    content: string,
    createdBy: number
  ) {
    return await this.create({
      title: title,
      thumbnail: thumbnail,
      content: content,
      createdBy: createdBy,
    }).then(function (result) {
      if (result) {
        return true;
      } else {
        return false;
      }
    });
  };

  Blog.findById = async function (id) {
    return await this.findOne({
      attributes: [
        "id",
        "title",
        "content",
        "thumbnail",
        "createdBy",
        "createdAt",
        "updatedAt",
      ],
      where: {
        id: id,
        deletedAt: {
          [Op.eq]: null
        }
      },
    });
  };

  Blog.edit = async function (
    id: number,
    title: string,
    thumbnail: string,
    content: string
  ) {
    return await this.update(
      {
        ...(title && {title: title}),
        ...(thumbnail && {thumbnail: thumbnail}),
        ...(content && {content: content}),
        updated_at: Date.now(),
      },
      { where: { id: id } }
    );
    // .success(function () {
    //   return true;
    // })
    // .error(function (err) {
    //   console.log(err);
    //   return false;
    // });
  };

  Blog.getAll = async function (pageIndex: number, pageSize: number) {
    try {
      return await this.findAndCountAll({
        offset: pageIndex,
        limit: pageSize,
      });
    } catch (error) {
      return {
        status: false,
        error: error,
      };
    }
  };

  Blog.delete = async function (
    id: number
  ) {
    return await this.update(
      {
        deletedAt: Date.now(),
      },
      { where: { id: id } }
    );
    // .success(function () {
    //   return true;
    // })
    // .error(function (err) {
    //   console.log(err);
    //   return false;
    // });
  };

  // don't use arraw function
  // User.prototype.logSignin = async function() {
  //   return await this.update({ last_sign_in_at: new Date() });
  // }

  return Blog;
};
