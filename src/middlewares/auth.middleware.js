const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      message: HTTPSTATUSCODE[401],
      data: null,
    });
  }

  const splits = authorization.split(" ");
  if (splits.length !== 2 || splits[0] !== "Bearer") {
    return res.status(400).json({
      message: HTTPSTATUSCODE[400],
      data: null,
    });
  }

  const jwtString = splits[1];
  console.log('Token verificado:', jwtString);

  try {
    var token = jwt.verify(jwtString, req.app.get("secretKey"));
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token expired',
        data: null,
      });
    }

    return next(err);
  }

  const authority = {
    id: token.id,
    name: token.name,
  };
  req.authority = authority;
  next();
};

module.exports = {
  isAuth,
};
