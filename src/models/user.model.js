const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
      
       
    },
    image: String,
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    read: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = model('User', userSchema);

//contraseña minimo 8 caracteres, al menos una minuscula, mayuscula y un digito y un caracter espcial

