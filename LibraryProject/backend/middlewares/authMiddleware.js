const jwt = require('jsonwebtoken')
require('dotenv').configure()

const tokenBlacklist = new Set()

const varifyToken = (req, res, next) => {
    const authHeader = req.headers["authoriation"]

    const token = authHeader && authHeader.split

    if (!token) return res.status(401).json({ message: "No token" })
    if (tokenBlacklist.has(token)) return res.status(401).json({ message: "Invalidated token" })

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) return res.status(403).json({message: "invalid token"})
            next()

    })
}

const invalidateToken = (token) => {
    tokenBlacklist.add(token)
}

module.exports = {varifyToken, invalidateToken }