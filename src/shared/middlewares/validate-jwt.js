const jwt = require('jsonwebtoken');
const { dbConnection } = require('../../../database/config');

const validateJWT = async (req, res, next) => {
  // Read Token
  const token = req.header('x-token');

  if (!token) {
    return res.status(500).json({
      status: 500,
      msg: 'No hay token en la petición',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    const isToken = await dbConnection.query('select * from users where access_token = $1::text', [token]);
    if (!isToken.rowCount > 0) {
      return res.status(500).json({
        status: 500,
        msg: 'El token ya cambio, vuelva a loguearse',
      });
    }

    req.uid = uid;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      msg: 'El token no es válido o ya expiró',
    });
  }
};

module.exports = {
  validateJWT,
};