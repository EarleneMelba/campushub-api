const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Institution = sequelize.define('Institution', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    mode: { type: DataTypes.STRING },
    website_url: { type: DataTypes.STRING },
    primary_email: { type: DataTypes.STRING, allowNull: false },
    support_email: { type: DataTypes.STRING },
    primary_phone_code: { type: DataTypes.STRING },
    primary_phone: { type: DataTypes.STRING },
    alternate_phone_code: { type: DataTypes.STRING },
    alternate_phone: { type: DataTypes.STRING },
    address_line1: { type: DataTypes.STRING },
    address_line2: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    postal_code: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'ACTIVE' },
}, {
    tableName: 'institutions',
    timestamps: true,
});

module.exports = Institution;