import { roleRepository } from '../repositories/role.repository.js';

class RoleService {
  async readByName(name) {
    return await roleRepository.readByName(name);
  }

  async addRoleToUser(user, role) {
    await roleRepository.addRoleToUser(user, role);
  }
}

export const roleService = new RoleService();
