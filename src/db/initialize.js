import { db, createAssociations } from './db.js';
import { env } from '../env.js';
import { initData } from '../repositories/initData.js';

class InitializeDB {
  async initialize(app) {
    try {
      app.set('sequelize', db.sequelize);
      app.set('models', db);
      await createAssociations();
      await db.sequelize.sync(); //синхорнизирует модели sequelize с таблицами бд
      await initData.initRoles(env.roles);
      await initData.initAdmin();
      console.log('Sequelize sync successful...');
    } catch (error) {
      console.log('ERROR: Sequelize sync', error);
    }
  }
}

export const initializeDB = new InitializeDB();

// параметр в sync(){force: true} - если в бд таблицы не соответствуют моделям sequelize то они будут пересозданы
// {alter: true, force: true}
