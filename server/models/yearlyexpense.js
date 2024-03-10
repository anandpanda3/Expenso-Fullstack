const Sequelize=require('sequelize')
const sequelize=require('../utils/db')


const YearlyExpense=sequelize.define('yearlyexpense',{
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    month:{
        type:Sequelize.STRING,
         allowNull:false
    },
    expense:{
        type:Sequelize.INTEGER,
        allowNull:false

    }
})

module.exports=YearlyExpense