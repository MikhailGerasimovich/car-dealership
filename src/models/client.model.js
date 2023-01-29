import { Model, DataTypes } from 'sequelize';

export function getClientModel(sequelize) {
  class Client extends Model {}

  Client.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'client',
      name: {
        singular: 'client',
        plural: 'clients',
      },
    },
  );

  Client.associate = (db) => {
    Client.belongsTo(db.User, {
      as: 'user',
    });

    Client.hasMany(db.Sale, {
      as: 'sale',
      foreignKey: {
        type: DataTypes.INTEGER,
        allowNull: true,
        name: 'clientId',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  };

  return Client;
}
