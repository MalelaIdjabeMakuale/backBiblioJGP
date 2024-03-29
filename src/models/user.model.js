const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    image: String,
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    read: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = model('User', userSchema);
