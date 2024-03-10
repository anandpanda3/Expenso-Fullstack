const Sequelize=require('sequelize')
const sequelize=require('../utils/db')

const Expense=sequelize.define('expensedb',{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false, 
    }
})

module.exports=Expense;