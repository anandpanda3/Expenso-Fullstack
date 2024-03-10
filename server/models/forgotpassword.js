const Sequelize = require('sequelize')
const sequelize = require('../utils/db')



const ForgotPasswordRequests = sequelize.define('forgotpassword', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    userId:Sequelize.STRING,
    isactive: Sequelize.BOOLEAN
})

module.exports = ForgotPasswordRequests