const {model, Schema} = require ('mongoose');

const userSchema = new Schema ({
    username: String, 
    name: String,
    email: String, 
    password: String,
    image: String,
})

module.exports = model ('user', userSchema);