const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    paymentId: Sequelize.STRING,
    orderId: Sequelize.STRING,
    status: Sequelize.STRING
})

module.exports = Order;