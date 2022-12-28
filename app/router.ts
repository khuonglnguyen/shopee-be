import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/user/:id', controller.user.getById);
  router.get('/user', controller.user.list);
  router.post('/user/create', controller.user.create);
  router.delete('/user/delete/:id', controller.user.delete);
};
