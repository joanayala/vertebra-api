const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        // expiresIn: '12h',
        // expiresIn: 60,
        expiresIn: '1h',
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject('No se pudo generar el Token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
