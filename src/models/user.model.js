import { Model, DataTypes } from 'sequelize';

export function getUserModel(sequelize) {
  class User extends Model {}

  User.init(
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'user',
      name: {
        simple: 'user',
        plural: 'users',
      },
    },
  );

  User.associate = (db) => {
    User.belongsToMany(db.Role, {
      through: 'user_role', //так же эту табличку можно создавать самому а в through указывать не строку а модель таблицы для соединения
      as: 'role',
    });

    User.hasOne(db.Client, {
      as: 'client',
      foreignKey: {
        type: DataTypes.INTEGER,
        allowNull: true,
        name: 'userId',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    User.hasOne(db.Employee, {
      as: 'employee',
      foreignKey: {
        type: DataTypes.INTEGER,
        allowNull: true,
        name: 'userId',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return User;
}
