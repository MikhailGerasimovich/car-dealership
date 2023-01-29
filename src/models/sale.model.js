import { Model, DataTypes } from 'sequelize';

export function getSaleModel(sequelize) {
  class Sale extends Model {}

  Sale.init(
    {
      saleDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      saleConfirm: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'sale',
      name: {
        singular: 'sale',
        plural: 'sales',
      },
    },
  );

  Sale.associate = (db) => {
    Sale.belongsTo(db.Car, {
      as: 'car',
    });

    Sale.belongsTo(db.Client, {
      as: 'client',
    });

    Sale.belongsTo(db.Employee, {
      as: 'employee',
    });
  };

  return Sale;
}
