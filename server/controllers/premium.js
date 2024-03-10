const Expense = require('../models/expense')
const Users = require('../models/users')
const sequelize = require('../utils/db')

exports.showLeaderboard = async (req, res) => {
   try {

      const leaderBoardData = await Users.findAll({
         attributes: ['id', 'name', 'total_expense'],
         order: [['total_expense', 'DESC']]

      })

      res.status(200).json({ succes: true, data: leaderBoardData })
   } catch (err) {
      console.log(err)
      res.status(500).json({ success: false, err })

   }


}