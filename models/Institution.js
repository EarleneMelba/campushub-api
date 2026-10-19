const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Institution = sequelize.define('Institution', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'institutions',
    timestamps: true,
});

module.exports = Institution;