const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { invalidateToken } = require('../middlewares/securityMiddleware.js')
const User = require('../models/userModels')
require('dotenv').config()

const generateJwt = (username) => {
    return jwt.sign({username}, process.env.JWT_SECRET, {
        expiresIn: "1h",
    })
}

const register = async (req, res) => {
    const { username, password } = req.body

    const exists = await User.findOne({ username: username })

    if (exists) return res.status(400).json({ message: "User already exists." })
    const hashedPassword = bcrypt.hash(password, 10)

    try {
        User.create({ username: username, password: hashedPassword })
        res.status(200).json({ token: generateJwt(username) })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    const exists = await User.findOne({ username: username })
    if (!exists) return res.status(400).json({ message: "Invalid credentials" })
    const matching = await bcrypt.compare(password, exists.password)
    if (!matching) return res.status(400).json({ message: "Invalid credentials" })
    res.status(200).json({ token: generateJwt(username) })
}

const logout = async (req, res) =>{
    const authHeader = req.authHeader['authorization']
    const token = authHeader.split(" ")[1]
    if(!token) return res.status(400).json({message: "you need to be logged in before you can logout bru"})
    invalidateToken(token)
    res.status(200).json({message: "Logged out successfully."})
}

module.exports = {register, login, logout}