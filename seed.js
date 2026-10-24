const bcrypt = require('bcrypt');
const sequelize = require('./config/db');
const User = require('./models/User');
async function seedSuperAdmin() {
  const email = process.env.SUPERADMIN_EMAIL;
  const password = process.env.SUPERADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Set SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD in .env');
    process.exit(1);
  }

  await sequelize.sync();
  const hashed = await bcrypt.hash(password, 10);

  const [user, created] = await User.findOrCreate({
    where: { email: email.toLowerCase() },
    defaults: {
      first_name: 'Super',
      last_name: 'Admin',
      password: hashed,
      role: 'super_admin',
    },
  });

  console.log(created ? '✅ Super admin created' : 'ℹ️ Super admin already exists');
  process.exit();
}

seedSuperAdmin();