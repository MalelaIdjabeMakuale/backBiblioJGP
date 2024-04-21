//Importar módulos necesarios
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

//Función para crear nuevo usuario. Hacer request, encripta la contraseña con bcrypt y chequea si el mail existe en la base datos. Después guarda el usuario en la base de datos y devuelve un respuesta.
const createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const saltRounds = 10;
    user.password = await bcrypt.hash(req.body.password, saltRounds);

    if (await User.findOne({ email: req.body.email })) {
      return res.status(409).json({
        status: 409,
        message: HTTPSTATUSCODE[409],
        data: null,
      });
    }

    const userDb = await user.save();

    return res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
//Autentificación de usuario. Encuentra el usuario por el email. Si el usuario y la contraseña coinciden genera un JWT, si no coincide devuelve un error.
const authenticate = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ email: req.body.email });
    if (userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = null;
      const token = jwt.sign(
        {
          id: userInfo._id,
          email: userInfo.email,
        },
        req.app.get("secretKey"),
        { expiresIn: "1d" }
      );
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { user: userInfo, token: token },
      });
    } else {
      return res.json({
        status: 400,
        message: HTTPSTATUSCODE[400],
        data: null,
      });
    }
  } catch (error) {
    return next(error);
  }
};
//Función para desloguearse. Invalida el token.
const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null,
    });
  } catch (error) {
    return next(error);
  }
};

//Función para rescatar todos los usuarios. Encuentra los usuarios en la base de datos y respone con un JSON con los datos de los mismos.
const getUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

//Busca el usuario por ID y muestra sus datos.
const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
        data: null,
      });
    }
    res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  authenticate,
  logout,
  getUser,
  getUserById,
};
