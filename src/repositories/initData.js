import bcrypt from 'bcryptjs';
import { db } from '../db/db.js';
import { env } from '../env.js';

class InitData {
  async initRoles(roleNames) {
    for (const i in roleNames) {
      const role = await db.Role.findOne({ where: { name: roleNames[i] } });
      if (!role) {
        await db.Role.create({ name: roleNames[i] });
      }
    }
  }

  async initAdmin() {
    const isAdmin = await db.User.findOne({
      include: {
        association: 'role',
        where: {
          name: 'ADMIN',
        },
      },
    });
    if (!isAdmin) {
      const admin = await db.User.create({ login: 'admin', password: bcrypt.hashSync(env.admin.password, 7) });
      const role = await db.Role.findOne({ where: { name: 'ADMIN' } });
      await admin.setRole(role);
    }
  }
}

export const initData = new InitData();
