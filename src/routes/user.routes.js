const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Registro de usuario
router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 12);

        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Inicio de sesión de usuario
router.post('/login', async (req, res) => {
    try {
        // Comprobar si el usuario existe
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.json({ error: 'Error en usuario/contraseña' });
        }

        // Comparar contraseñas
        const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordMatch) {
            return res.json({ error: 'Error en usuario/contraseña' });
        }

        // Crear token JWT
        const token = createToken(user);
        res.json({ success: 'Login correcto', token: token });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Función para crear token JWT
function createToken(user) {
    const payload = {
        user_id: user._id,
        user_role: user.role,
        user_username: user.username
    };
    return jwt.sign(payload, 'en un lugar de la mancha');
}

module.exports = router;
