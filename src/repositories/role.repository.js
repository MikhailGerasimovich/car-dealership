import { db } from '../db/db.js';

class RoleRepository {
  async readByName(name) {
    return await db.Role.findOne({ where: { name } });
  }

  async addRoleToUser(user, role) {
    await user.addRole(role);
  }
}

export const roleRepository = new RoleRepository();
