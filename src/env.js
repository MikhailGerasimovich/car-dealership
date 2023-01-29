import dotenv from 'dotenv';

dotenv.config();

export const env = {
  application: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  },
  dataBase: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    userName: process.env.MYSQL_USER_NAME || 'root',
    password: process.env.MYSQL_PASSWORD || '957483',
    dbName: process.env.MYSQL_DB_NAME || 'car_dealership_db',
    dialect: process.env.MYSQL_DIALECT || 'mysql',
  },
  roles: {
    adminRole: process.env.ADMIN_ROLE || 'ADMIN',
    managerRole: process.env.MANAGER_ROLE || 'MANAGER',
    userRole: process.env.USER_ROLE || 'USER',
  },
  login: {
    secret: process.env.SECRET_KEY || 'SECRET_KEY',
  },
  admin: {
    password: process.env.ADMIN_PASSWORD || 'admin',
  },
};
