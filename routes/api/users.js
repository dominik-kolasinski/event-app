const express = require('express')
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../models/User')

const router = express.Router()

// @route POST api/users
// @desc Test route
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Proper email address is required').isEmail(),
    check('password')
      .exists()
      .withMessage('Password should not be empty')
      .isLength({ min: 8 })
      .withMessage('Password should have minimum eight characters')
      .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/)
      .withMessage('Password should not have at least one letter, one number and one special character')
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({ msg: 'User with this email already exists!' })
      }

      user = new User({
        name,
        email,
        password
      })

      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 180000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error!')
    }
  }
)

module.exports = router
