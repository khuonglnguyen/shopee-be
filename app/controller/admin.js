'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    console.log(this);
    const { ctx } = this;
    ctx.body = 'Admin home';
  }
}

module.exports = AdminController;
