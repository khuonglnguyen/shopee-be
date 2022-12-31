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
};

export default plugin;
