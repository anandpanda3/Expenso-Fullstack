const Users = require('../models/users')
const { randomUUID } = require('crypto')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const sequelize=require('../utils/db')


function isValidString(string) {
  if (string == undefined || string === 0) {
    return true
  } else {
    return false
  }
}

exports.postSignup = async (req, res) => {
  const transaction = await sequelize.transaction()

  try {

    const { name, email, password } = req.body

    if (name == undefined || name.length === 0 || email == undefined || email.length === 0 || password == undefined || password.length === 0) {
      return res.status(500).json({ err: 'Something is missing!' })
    }

    const saltRounds = 10;
    await bcrypt.hash(password, saltRounds, async (err, hash) => {
      console.log(hash)
      const data = await Users.create({
        id: randomUUID(),
        name: name,
        email: email,
        password: hash
      },{ transaction: transaction })

      await transaction.commit()
      res.status(200).json({ success: true, user: 'Successfully created user!' })


    });


  } catch (err) {
    await transaction.rollback()
    console.log(err)
    res.status(500).json({ success: false, message: err })

  }
}

const generateToken=(id,email)=>{
  return jwt.sign({userId:id,userEmail:email},process.env.TOKEN_SECRET)
}
exports.postLogin = async (req, res) => {

  try {
    const { email, password } = req.body
    const user = await Users.findOne({ where: { email: email } })

    if (user && password != null) {
      const userPassword = user.password
      const userEmail=user.email
      const userId=user.id
      const data={
        userEmail,
        userId

      }

      bcrypt.compare(password, userPassword, (err, result) => {
        if (err) {
          throw new Error('Something went wrong.')
        }
        if (user && result == true) {
          return res.status(200).json({ data: generateToken(userId,userEmail)})

        } else {
          return res.status(401).json('Password donot match!')

        }
      })
    } else {
      return res.status(404).json('User not found!')

    }


  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: err })
  }
}