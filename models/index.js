const sequelize = require('../config/db');
const User = require('./User');
const Institution = require('./Institution');
const Branch = require('./Branch');
const UserRoleAssignment = require('./UserRoleAssignment');

User.hasMany(UserRoleAssignment, { foreignKey: { name: 'user_id', allowNull: false } });
UserRoleAssignment.belongsTo(User, { foreignKey: { name: 'user_id', allowNull: false } });

Institution.hasMany(UserRoleAssignment, { foreignKey: 'institution_id' });
UserRoleAssignment.belongsTo(Institution, { foreignKey: 'institution_id' });

Branch.hasMany(UserRoleAssignment, { foreignKey: 'branch_id' });
UserRoleAssignment.belongsTo(Branch, { foreignKey: 'branch_id' });

module.exports = { sequelize, User, Institution, Branch, UserRoleAssignment };