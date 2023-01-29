import { Model, DataTypes } from 'sequelize';

export function getRoleModel(sequelize) {
  class Role extends Model {}

  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: 'USER',
      },
    },
    {
      sequelize,
      modelName: 'role',
      name: {
        simple: 'role',
        plural: 'roles',
      },
    },
  );

  Role.associate = (db) => {
    Role.belongsToMany(db.User, {
      through: 'user_role',
      as: 'user',
    });
  };

  return Role;
}
