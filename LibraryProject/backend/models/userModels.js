const mongoose = require('mongoose')

//define blueprints of user
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
})

//link it to the db
const User = mongoose.model('User', userSchema)

//export to use in the rest of app
module.exports = User