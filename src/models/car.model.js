import { Model, DataTypes } from 'sequelize';

export function getCarModel(sequelize) {
  class Car extends Model {}

  Car.init(
    {
      price: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isSold: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isSelected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'car',
      name: {
        singular: 'car',
        plural: 'cars',
      },
    },
  );

  Car.associate = (db) => {
    Car.belongsTo(db.Color, {
      as: 'color',
    });

    Car.belongsTo(db.Brand, {
      as: 'brand',
    });

    Car.hasOne(db.Sale, {
      as: 'sale',
      foreignKey: {
        type: DataTypes.INTEGER,
        allowNull: true,
        name: 'carId',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return Car;
}
