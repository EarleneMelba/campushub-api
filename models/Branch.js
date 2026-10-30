const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Branch = sequelize.define('Branch', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    address_line1: { type: DataTypesa.STRING },
    address_line2: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    postal_code: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'ACTIVE' },
}, {
    tableName: 'branches',
    timestamps: true,
});

module.exports = Branch;