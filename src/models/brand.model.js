import { Model, DataTypes } from 'sequelize';

export function getBrandModel(sequelize) {
  class Brand extends Model {}

  Brand.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'brand',
      name: {
        singular: 'brand',
        plural: 'brands',
      },
    },
  );

  Brand.associate = (db) => {
    Brand.hasMany(db.Car, {
      as: 'car',
      foreignKey: {
        foreignKey: {
          type: DataTypes.INTEGER,
          allowNull: true,
          name: 'brandId',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
    });
  };

  return Brand;
}
