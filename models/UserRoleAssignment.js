const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserRoleAssignment = sequelize.define('UserRoleAssignment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'user_role_assignments',
    timestamps: true,
});

module.exports = UserRoleAssignment;