const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");


// Registro de usuario
router.post("/register", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 12);

    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Inicio de sesión de usuario
router.post("/login", async (req, res) => {
  try {
    // Comprobar si el usuario existe
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.json({ error: "Error en usuario/contraseña" });
    }

    // Comparar contraseñas
    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordMatch) {
      return res.json({ error: "Error en usuario/contraseña" });
    }

    // Crear token JWT
    const token = createToken(user);
    res.json({ success: "Login correcto", token });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Añadir un libro a favoritos de usuario
router.put("/:userId/addToFavorites/:bookId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (user.favorites.includes(bookId)) {
      return res.status(400).json({ error: 'El libro ya está en la lista de favoritos' });
    }

    user.favorites.push(bookId);
    await user.save();

    res.json({ success: 'Libro agregado a favoritos correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar libro a favoritos del usuario' });
  }
});

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener un usuario por su ID
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario por ID' });
  }
});

// Función para crear token JWT
function createToken(user) {
  const payload = {
    user_id: user._id,
    user_username: user.username,
    user_name: user.name,
    user_email: user.email,
    user_image: user.image,
  };
  return jwt.sign(payload, "en un lugar de la mancha");
}

module.exports = router;
