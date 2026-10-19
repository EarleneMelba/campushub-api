const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
// const Institution = require('./Institution');

const Branch = sequelize.define('Branch', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'branches',
    timestamps: true,
});

// Associations: one Institution has many Branches
// Institution.hasMany(Branch, { foreignKey: 'institution_id' });
// Branch.belongsTo(Institution, { foreignKey: 'institution_id' });

module.exports = Branch;
