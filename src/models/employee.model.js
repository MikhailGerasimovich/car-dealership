import { Model, DataTypes } from 'sequelize';

export function getEmployeeModel(sequelize) {
  class Employee extends Model {}

  Employee.init(
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
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      startWorkDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      salary: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      numberSoldCars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      confirmKey: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'employee',
      name: {
        singular: 'employee',
        plural: 'employees',
      },
    },
  );

  Employee.associate = (db) => {
    Employee.belongsTo(db.User, {
      as: 'user',
    });

    Employee.hasMany(db.Sale, {
      as: 'sale',
      foreignKey: {
        type: DataTypes.INTEGER,
        allowNull: true,
        name: 'employeeId',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  };

  return Employee;
}
