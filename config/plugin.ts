import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  swaggerdoc: {
    enable: true, // 是否启用
    package: 'egg-swagger-doc' // 指定包名称
  }
};

export default plugin;
