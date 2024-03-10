const Razorpay = require('razorpay')
const { randomUUID } = require('crypto')
const Order = require('../models/order')
const sequelize = require('../utils/db')

exports.purchasePremium = async (req, res, next) => {
  const transaction = await sequelize.transaction()

  try {

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })

    const amount = 2500
    razorpay.orders.create({ amount: amount, currency: 'INR' }, async (err, order) => {
      if (err) {
        console.log(err)
        throw new Error(JSON.stringify(err))
      }

      await req.user.createOrder({ id: randomUUID(), orderId: order.id, status: 'PENDING' }, { transaction: transaction })
      await transaction.commit()
      return res.status(200).json({ order, key_id: razorpay.key_id })
    })

  } catch (err) {
    await transaction.rollback()
    console.log(err)
    res.status(403).json({ success: false, error: err })
  }

}

exports.updateTransaction = async (req, res) => {
  const transaction = await sequelize.transaction()

  try {
    const { orderId, paymentId, status } = req.body

    if (orderId && status == 'failed') {
      const paymentDetail = await Order.findOne({ where: { orderId: orderId } })
      await paymentDetail.update({ status: 'FAILED' }, { transaction: transaction })
      transaction.commit()
      return res.status(500).json({ success: false, error: 'Transaction Fail' })
    }
    const paymentDetail = await Order.findOne({ where: { orderId: orderId } })

    const promise1 = paymentDetail.update({ paymentId: paymentId, status: 'SUCCESSFUL' }, { transaction: transaction })

    const promise2 = req.user.update({ isPremiumUser: true }, { transaction: transaction })
    await Promise.all([promise1, promise2])
    await transaction.commit()
    return res.status(200).json({ success: true, message: 'Transcation Successful' })
  } catch (err) {
    await transaction.rollback()
    console.log(err)
    res.status(500).json({ success: false, err })
  }

}

exports.checkPremium = (req, res) => {
  try {
    const user = req.user
    if (user.isPremiumUser == '1') {
      return res.status(200).json({ success: true, isPremium: true })

    } else {
      return res.status(200).json({ success: true, isPremium: false })

    }

  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, err })

  }

}