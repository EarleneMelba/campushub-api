const sequelize = require('../config/db');
const User = require('./User');
const Institution = require('./Institution');
const Branch = require('./Branch');

// Associations live here, in one place
Institution.hasMany(Branch, { foreignKey: 'institution_id' });
Branch.belongsTo(Institution, { foreignKey: 'institution_id' });

module.exports = { sequelize, User, Institution, Branch };  