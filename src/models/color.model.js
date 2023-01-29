import { Model, DataTypes } from 'sequelize';

export function getColorModel(sequelize) {
  class Color extends Model {}

  Color.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'color',
      name: {
        singular: 'color',
        plural: 'colors',
      },
    },
  );

  Color.associate = (db) => {
    Color.hasMany(db.Car, {
      as: 'car',
      foreignKey: {
        foreignKey: {
          type: DataTypes.INTEGER,
          allowNull: true,
          name: 'colorId',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
    });
  };

  return Color;
}
