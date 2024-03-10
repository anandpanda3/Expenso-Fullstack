const sequelize = require('../utils/db')
const Sequelize = require('sequelize')

const Users = sequelize.define('usersdb', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    photoUrl:{
        type: Sequelize.STRING,
    },
    isPremiumUser: Sequelize.STRING,
    total_expense: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    total_income:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    remaining_balance:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
})

module.exports = Users