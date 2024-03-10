exports.addIncome = async (req, res) => {
  try {

    const { income } = req.body
    const id = req.user.id
    await req.user.update({ total_income: income })
    res.status(200).json({ message: 'Added Income Successfully' })

  } catch (err) {
    console.log(err)
    return res.status(403).json({ err, success: false })

  }
}


exports.editUserIncome = async (req, res) => {
  try {
    const { income } = req.body
    const user = req.user
    const updatedBalance = Number(income) - user.total_expense
    await user.update({ total_income: income, remaining_balance: updatedBalance })
    const updatedData = {
      updatedBalance: user.remaining_balance,
      updatedIncome: user.total_income
    }

    res.status(200).json({ success: true, data: updatedData })

  } catch (err) {
    console.log(err)
    return res.status(403).json({ err, success: false })

  }
}