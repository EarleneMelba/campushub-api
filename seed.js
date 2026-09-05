const bcrypt = require('bcrypt');
const sequelize = require('./config/db');
const User = require('./models/User');

async function createTestUser() {
  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  const user = await User.create({
    first_name: 'Test',
    last_name: 'Admin',
    email: 'earlenemelba02@gmail.com',
    password: hashedPassword,
    role: 'admin',
  });

  console.log('✅ Test user created:', user.toJSON());
  process.exit();
}

createTestUser();