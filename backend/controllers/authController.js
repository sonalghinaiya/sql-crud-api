import bcrypt from 'bcryptjs'
import db from '../config/db.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const sql = 'INSERT INTO users(name, email, password) VALUES (?, ?, ?)'

    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err
        })
      }

      res.status(201).json({
        success: true,
        message: 'User registered successfully'
      })
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const sql = 'SELECT * FROM users WHERE email=?'

    db.query(sql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err
        })
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User Not Found'
        })
      }

      const user = result[0]

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Invalid Credentials'
        })
      }

      const token = jwt.sign(
        {
          id: user.id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN
        }
      )

      res.status(200).json({
        success: true,
        token,
        user,
        message: 'User Login Successfully'
      })
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
