'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.render('index');
  }
  async news() {
    const { ctx } = this;
    ctx.body = 'news';
  }
}

module.exports = HomeController;
